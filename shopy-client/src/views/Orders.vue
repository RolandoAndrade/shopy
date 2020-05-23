<template>
    <v-content>
        <div>
            <Title size="title-primary">{{this.$language.get('my-orders.title')}}</Title>
            <div class="divider" style="height:1px; width:70%"></div>
        </div>
        <v-row
            class="card-order pa-6 to-column"
            v-for="(n, i) in visibleProducts"
            :key="i"
        >
            <img
                src="https://i.ebayimg.com/images/g/NgUAAOSwZntccwEN/s-l300.jpg"
                class="card-order__image"
            />
            <v-col class="ml-4">
                <Title size="title-secondary" style="text-align:start;">{{
                    n.title
                }}</Title>
                <Title size="title-terciary " style="text-align:start;"
                    >{{ currency }} {{ n.price }}</Title
                >
            </v-col>
            <ButtonSecondary style="margin:20px;">See order</ButtonSecondary>
        </v-row>
        <v-content class="mb-6">
            <v-pagination
                total-visible="10"
                v-model="currentPage"
                :length="getLength"
                circle
                color="purple"
                @input="changePage()"
                class="xyz"
            ></v-pagination>
        </v-content>
    </v-content>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Title from '@/components/typography/Title.vue';
import { getItemsPerPage, getLength } from '../utils/global-functions';
import Vue from 'vue';
@Component({
    components: {
        ButtonSecondary,
        Title
    }
})
export default class Orders extends Vue {
    private currency = '$';
    private currentPage = 1;
    private visibleProducts?: Array<object>;
    private myOrders: Array<object> = [
        {
            id: 1,
            title: 'Camisa linda',
            price: 202
        },
        {
            id: 2,
            title: 'Camisa linda',
            price: 203
        },
        {
            id: 3,
            title: 'Camisa linda',
            price: 204
        },
        {
            id: 4,
            title: 'Camisa linda',
            price: 205
        },
        {
            id: 5,
            title: 'Camisa linda',
            price: 206
        }
    ];

    private getItemsPerPage() {
        return getItemsPerPage(this.myOrders, this.currentPage, 4);
    }

    get getLength() {
        return getLength(this.myOrders, 4);
    }
    beforeMount() {
        this.changePage();
    }
    private changePage(): void {
        this.visibleProducts = this.getItemsPerPage();
    }
}
</script>

<style lang="scss">
.card-order {
    width: 60%;
    background-color: white;
    margin: 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    margin: 20px auto;

    &__image {
        height: auto;
        width: 15rem;
    }
}
</style>
