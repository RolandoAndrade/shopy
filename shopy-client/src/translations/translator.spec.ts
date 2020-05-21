import {TranslatorInterface} from "@/interfaces/translator.interface";
import {TranslatorService} from "@/translations/translator";
import {SPANISH} from "@/constants/language.constants";

describe('Translator test', () => {
    let service: TranslatorInterface;

    beforeEach(()=>
    {
        service = new TranslatorService();
    });

   it("Must change the language", async ()=>{
       const r = await service.selectLanguage(SPANISH);
       expect(r).toEqual(true);
   });

    it("Must return the translation for title", async ()=>{
        const r = await service.selectLanguage(SPANISH);
        expect(service.get("title")).toEqual("Bienvenido a Shopy");
    })
});