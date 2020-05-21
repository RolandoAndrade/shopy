import {TranslatorInterface} from "@/interfaces/translator.interface";
import {DEFAULT_LANGUAGE, ENGLISH} from "@/constants/language.constants";
import axios from "axios";
import {EnvironmentConstants} from "@/constants/environmentConstants";

const URL = EnvironmentConstants.HOST+"translator";

export class TranslatorService implements TranslatorInterface
{
    _terms: {term: string, translation: {content: string}}[] = [];
    private _isStarted = false;

    constructor()
    {
    }
    get(term: string): string
    {
        try {
            return this._terms!.find((i)=>i.term===term)!.translation.content;
        }
        catch (e) {
            return "";
        }
    }

    async selectLanguage(language: string): Promise<boolean>
    {
        try
        {
            const response = (await axios.post(URL, {language})).data;
            if(response)
            {
                this._terms = (await axios.get(URL)).data;
            }
            return response;
        }
        catch (e)
        {
            return false;
        }
    }

    async init(): Promise<void>
    {
        if(!this._isStarted)
        {
            this._isStarted = true;
            await this.selectLanguage(DEFAULT_LANGUAGE);
        }
    }
}