import { Address } from './Address';
import { ConfigKeys } from '@/constants/config.keys';
import { configEnvironment } from '@/utils/config-environment';

const Lob = require('lob')(configEnvironment.get(ConfigKeys.LOB_KEY));

export class LobRepository {
    public async verifyAddress(address: Address): Promise<any> {
        let response: any;
        try {
            await Lob.usVerifications.verify(
                {
                    primary_line: address.firstLine,
                    city: address.city,
                    state: address.state,
                    zip_code: address.postalCode
                },
                function(error: any, res: any) {
                    if (res.deliverability === 'undeliverable')
                        response = 'Invalid address . Impossible to update';
                    else response = true;
                }
            );
            return response;
        } catch (err) {
            // if ((!address!.firstLine!) || ((!address!.city! && !address!.state!) && (!address!.postalCode!)))
            response =
                'The address is incorrect. Make sure you have filled the Primary line, City and the State,or Primary line and the Zip Code at least';
            return response;
        }
    }
}

export const lobRepository = new LobRepository();
