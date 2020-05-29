<template>
    <v-footer color="purple" padless>
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="link in footerLinks"
                :key="link"
                color="white"
                text
                rounded
                class="my-2"
                >{{ link }}</v-btn
            >

            <transition name="fade">
                <v-col
                    class="purple py-4 text-center white--text title-center"
                    cols="12"
                >
                    <v-menu top offset-y class="margin-medium">
                        <template v-slot:activator="{ on }">
                            <v-btn color="purple" dark v-on="on">
                                <Icon
                                    :size="'icon-small'"
                                    :icon="'icon-sphere'"
                                    class="mr-2"
                                />
                                <div
                                    class="title-terciary"
                                    style="color:white;"
                                >
                                    {{ activeLang }}
                                </div>
                                <v-icon class="smallest-icon" color="white"
                                    >mdi-chevron-down</v-icon
                                >
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-for="(item, index) in languages"
                                :key="index"
                                class="item-small"
                                @click="selectLanguage(item)"
                            >
                                <v-list-item-title>{{
                                    item
                                }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </transition>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Icon from '@/components/typography/Icon.vue';
import { ENGLISH, SPANISH, translator } from '@/constants/language.constants';

@Component({
    components: { Icon }
})
export default class Footer extends Vue {
    public footerLinks: Array<string> = [
        'home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
    ];

    // public linkprueba : string= this.$language.get('footer.links.home')

    private lang = 'EN';

    get languages(): string[] {
        return [ENGLISH, SPANISH];
    }

    get activeLang(): string {
        return this.lang;
    }

    selectLanguage(lang: string) {
        translator.selectLanguage(lang);
        this.lang = lang;
    }
}
</script>

<style></style>
