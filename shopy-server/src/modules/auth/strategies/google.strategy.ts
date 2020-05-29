import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GOOGLE_CALLBACK_URL } from '../auth.constan';
import { ConfigService } from 'src/config/config.service';
import { ConfigKeys } from 'src/config/config.keys';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly _configService: ConfigService) {
    super({
      clientID: _configService.get(ConfigKeys.GOOGLE_CLIENT_ID),
      clientSecret: _configService.get(ConfigKeys.GOOGLE_SECRET),
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos, displayName } = profile

    const user = {
      email: emails[0].value,
      username: displayName,
      name: name.givenName,
      lastname: name.familyName,
      image: photos[0].value,
      accessToken
    }

    done(null, user);
  }
}