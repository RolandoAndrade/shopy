<template>
    <section class="section-book">
        <div class="book" v-if="mostrar === true">
            <div class="book__form">
                <UserAccountForm v-on:changePage="changePage()" />
            </div>
        </div>
        <div class="book__signup" v-else>
            <PersonalInfoForm />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UserAccountForm from '@/components/login/UserAccountForm.vue';
import PersonalInfoForm from '@/components/login/PersonalInfoForm.vue';

@Component({
    components: {
        UserAccountForm,
        PersonalInfoForm
    }
})
export default class SignUp extends Vue {
    private mostrar = true;

    private changePage() {
        this.mostrar = !this.mostrar;
    }
}
</script>

<style></style>
