<template>
    <v-app-bar app color="purple" class="pa-0">
        <div class="cover space-between">
            <div class="inline">
                <img
                    :class="onMobile"
                    src="@/assets/shopy1w.png"
                    @click="() => this.$router.push('/')"
                />
            </div>
            <SearchBar />

            <v-menu :close-on-content-click="false" offset-x offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon class="mr-2" v-on="on">
                        <v-icon large color="purple2">mdi-menu</v-icon>
                    </v-btn>
                </template>

                <v-card width="300">
                    <v-list v-if="login">
                        <v-list-item>
                            <v-list-item-avatar>
                                <img
                                    v-if="isLogged && userImage"
                                    :src="userImage"
                                    alt="User photo"
                                />
                                <v-icon v-else-if="isLogged && !userImage">mdi-account</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title
                                    >{{userName}}</v-list-item-title
                                >
                                <v-list-item-subtitle
                                    >{{user.email}}</v-list-item-subtitle
                                >
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                        v-if="isLogged"
                                    color="orange"
                                    icon
                                    v-on:click="
                                        () => this.$router.push('/cart')
                                    "
                                >
                                    <v-icon x-large>mdi-cart-outline</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-divider v-if="login"></v-divider>

                    <v-list dense nav>
                        <v-list-item
                            v-for="item in navLinks"
                            :key="item.title"
                            link
                            :to="item.link"
                            @click="()=>item.click()"
                        >
                            <v-list-item-icon>
                                <v-icon medium>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title class="py-2">
                                    {{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import SearchBar from '@/components/generic/SearchBar.vue';
import Vue from 'vue';
import {user} from "@/store/namespaces";
import {IS_LOGGED, USER_GET_USER} from "@/store/users/getters/user.getters";
import {User} from "@/requests/users/User";

@Component({
    components: {
        Title,
        SearchBar
    }
})
export default class Header extends Vue {
    private login = true;
    private showLogo = true;
    private navLink: { title: string; icon: string; link?: string, show: boolean, click?: Function}[] = [
        {
            title: 'My profile',
            icon: 'mdi-account-circle-outline',
            link: '/profile',
            show: false
        },
        { title: 'Categories', icon: 'mdi-apps', link: '/products' , show: true},
        {
            title: 'My products',
            icon: 'mdi-bulletin-board',
            link: '/edit/products',
            show: false
        },
        { title: 'My orders', icon: 'mdi-shopping-outline', link: '/orders', show: false},
        { title: 'Sell', icon: 'mdi-cash', link: '/add/product', show: false},
        { title: 'Log in', icon: 'mdi-login', link: '/login' , show: true},
        { title: 'Log out', icon: 'mdi-logout', show: false, click: ()=>{
            localStorage.removeItem("token");
            window.location.reload();
            }}
    ];

    get navLinks(): { title: string; icon: string; link?: string; show: boolean }[]
    {
        return this.navLink.filter((i)=>{
            if(i.icon=="mdi-login")
            {
                return !this.isLogged;
            }
            else if(i.icon=="mdi-logout")
            {
                return this.isLogged;
            }
            return (i.show||this.isLogged)
        })
    }

    get onMobile() {
        if (this.$vuetify.breakpoint.smAndDown) return 'logo__small';
        else return 'logo__big';
    }

    get userName()
    {
        if(this.user.person)
        {
            return this.user.person.name + " " + this.user.person.lastname;
        }
        return "";
    }

    get userImage()
    {
        if(this.isLogged)
        {
            if(this.user.person && this.user.person.image && this.user.person.image.length)
            {
                return this.user.person.image;
            }
            else
            {
                return undefined
            }
        }
        else
        {
            return undefined;
        }

    }

    @user.Getter(IS_LOGGED) isLogged !: boolean;
    @user.Getter(USER_GET_USER) user !: User;
}
</script>

<style scoped>
header,
.v-toolbar,
header.v-app-bar {
    width: 100vw !important;
}
</style>
