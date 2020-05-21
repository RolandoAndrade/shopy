import Vue_ from 'vue';
import { translator } from '@/constants/language.constants';

export function LanguagePlugin(Vue: typeof Vue_, options?: any): void {
    Vue.prototype.$language = translator;
    Vue.mixin({
        data() {
            return {
                translator: translator
            };
        },
        async created() {
            //@ts-ignore
            await this.translator.init();
        },
        computed: {}
    });
}
