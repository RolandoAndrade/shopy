<template>
    <section class="section-book">
        <div class="book" v-if="isShow">
            <div class="book__form">
                <UserAccountForm @changePage="changePage" />
            </div>
        </div>
        <div class="book__signup" v-else>
            <PersonalInfoForm :user-data.sync="user"/>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserAccountForm from '@/components/login/UserAccountForm.vue';
import PersonalInfoForm from '@/components/login/PersonalInfoForm.vue';
import {User} from "@/requests/users/User";
import {Person} from "@/requests/person/Person";
import {Address} from "@/requests/address/Address";
@Component({
    components: {
        UserAccountForm,
        PersonalInfoForm
    }
})
export default class SignUp extends Vue {
    private isShow = true;
    private user!: User;

    public changePage(user: User) {
        this.isShow = !this.isShow;
        Object.assign(this.user, user);
    }

    mounted()
    {
        this.user = new User();
        this.user.person = new Person();
        this.user.person.image = "";
        this.user.addresses=[new Address()];
    }

    public register()
    {

    }
}
</script>

<style></style>
