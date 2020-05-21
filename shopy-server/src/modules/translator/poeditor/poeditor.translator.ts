import axios from "axios";
import {TranslatorInterface} from "../translator.interface";
import {ConfigKeys} from "../../../config/config.keys";
import {DEFAULT_LANGUAGE} from "../../../constants/languages.constants";
import {ConfigService} from "../../../config/config.service";
import {ILogger} from "../../../logger/ILogger";
import {logger} from "../../../logger/loggerConst";

const TERMS_URL = "https://api.poeditor.com/v2/terms/list";
export class PoeditorTranslator implements TranslatorInterface
{
    private _terms?: {term: string, translation: {content: string}}[];
    private readonly _token!: string;
    private readonly _projectId!: string;
    private _language!: string;
    private readonly _logger: ILogger;

    constructor()
    {
        this._logger = logger;
        const configEnvironment = new ConfigService();
        this._token = configEnvironment.get(ConfigKeys.POEDITOR);
        this._language = DEFAULT_LANGUAGE;
        this._projectId =configEnvironment.get(ConfigKeys.POEDITOR_PROJECT);
        this.selectLanguage(this._language);
    }

    get(term: string): string
    {
        this._logger.log("Obteniendo un término de POeditor");
        try {
            return this._terms!.find((i)=>i.term===term)!.translation.content;
        }
        catch (e) {
            return "";
        }
    }

    private _buildData(): string
    {
        this._logger.log("Construyendo url para consulta a POeditor");
        return "api_token="+this._token+"&id="+this._projectId+"&language="+this._language;
    }

    async selectLanguage(language: string = DEFAULT_LANGUAGE): Promise<boolean>
    {
        this._logger.log("Seleccionando lenguaje");
        this._language = language;
        try
        {
            const data = this._buildData();
            this._logger.log("Consultando términos a POeditor");
            const terms = await axios.post(TERMS_URL, data, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            });
            this._terms = terms.data.result.terms;
            return true;
        }
        catch (e)
        {
            this._logger.error("Error con POeditor", e);
            return false;
        }
    }

    list():{ term: string, translation: {content: string}}[] {
        return this._terms;
    }
}