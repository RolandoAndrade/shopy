import { TranslatorInterface } from '../../interfaces/translator.interface';

declare module 'vue/types/vue' {
    interface Vue {
        $language: TranslatorInterface;
    }
}
