import { Injectable } from '@nestjs/common';
import {ILogger} from "../../logger/ILogger";
import {TranslatorInterface} from "./translator.interface";
import {logger} from "../../logger/loggerConst";
import {PoeditorTranslator} from "./poeditor/poeditor.translator";

@Injectable()
export class TranslatorService {
    private readonly _logger: ILogger;
    private readonly _translator: TranslatorInterface;
    constructor()
    {
        this._logger = logger;
        this._translator = new PoeditorTranslator();
    }

    getList(): {}[]
    {
        this._logger.log("Solicitud de listado de términos");
        return this._translator.list();
    }

    async selectLanguage(language: string): Promise<boolean>
    {
        this._logger.log("Solicitud de cambio de idioma a "+language);
        return this._translator.selectLanguage(language);
    }
}
