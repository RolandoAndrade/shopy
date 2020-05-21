import axios from "axios"
import {ConfigKeys} from "../../../config/config.keys";
import {TranslatorInterface} from "../translator.interface";
import {PoeditorTranslator} from "./poeditor.translator";
import {ENGLISH, SPANISH} from "../../../constants/languages.constants";
import {ConfigService} from "../../../config/config.service";

describe("Poeditor test", ()=>{
    let configEnvironment: ConfigService;
    beforeEach(()=>{
        configEnvironment = new ConfigService();
    })
    it("Must return the whole project", async ()=>{
        const r = await axios.post("https://api.poeditor.com/v2/projects/list",
            'api_token='+configEnvironment.get(ConfigKeys.POEDITOR)
        ,{
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        console.log(JSON.stringify(r.data.result));
        expect(r.status).toEqual(200);
        expect(r.data.response.code).toEqual("200");
    });

    it("Available languages", async ()=>{
            const r = await axios.post("https://api.poeditor.com/v2/languages/available",
                'api_token='+configEnvironment.get(ConfigKeys.POEDITOR)
                ,{
                    headers: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    }
                });
            console.log(JSON.stringify(r.data));
            expect(r.status).toEqual(200);
            expect(r.data.response.code).toEqual("200");
    });


    it("List _terms", async ()=>{
        const r = await axios.post("https://api.poeditor.com/v2/terms/list",
            'api_token='+configEnvironment.get(ConfigKeys.POEDITOR)+'&id='+configEnvironment.get(ConfigKeys.POEDITOR_PROJECT)+'&language=en'
            ,{
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            });
        console.log(r.data.result.terms);
        expect(r.status).toEqual(200);
        expect(r.data.response.code).toEqual("200");
    });
});

describe("Translator test", ()=>{
    let service: TranslatorInterface;
    beforeEach(()=>{
        service = new PoeditorTranslator();
    });
    it("Change the language", async ()=>{
        const r: boolean = await service.selectLanguage(ENGLISH)
        expect(r).toEqual(true);
    });
    it("Get word for title", async ()=>{
        const r: boolean = await service.selectLanguage(ENGLISH);
        const p: string = service.get("title");
        expect(p).toEqual("Welcome to Shopy");
    });
    it("List words", async ()=>{
        const r: boolean = await service.selectLanguage(SPANISH);
        const p: any[] = service.list();
        console.log(p);
        expect(p.length).toBeGreaterThan(0);
    });
});