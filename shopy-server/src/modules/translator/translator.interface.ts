export interface TranslatorInterface {
    selectLanguage(language: string): any;
    get(term: string): any;
    list(): any[]
}