import {TranslatorInterface} from "../../interfaces/translator.interface";
import Vue from "vue";
declare module 'vue/types/vue' {
    interface Vue {
        $language: TranslatorInterface;
    }
}