import {Body, Controller, Get, Post} from '@nestjs/common';
import {TranslatorService} from "./translator.service";

@Controller('translator')
export class TranslatorController
{
    constructor(private readonly _translatorService: TranslatorService) {
    }

    @Get()
    async getListOfWords(): Promise<{}[]>
    {
        return this._translatorService.getList();
    }

    @Post()
    async changeLanguage(@Body() body: {language: string}): Promise<boolean>
    {
        return this._translatorService.selectLanguage(body.language);
    }
}
