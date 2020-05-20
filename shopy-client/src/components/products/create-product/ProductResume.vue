<template>
    <div>
        <div color="white" class="card-finish mb-12 mt-6" >
            <div class="space-around pa-10">
                <div class="flex column half">
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Name:</Title>
                        <Title size="title-terciary ">{{product.title}}</Title>
                    </div>
                     <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Description:</Title>
                        <Title size="title-terciary ">{{product.description}}</Title>
                    </div>
                     <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Condition:</Title>
                        <Title size="title-terciary ">{{product.condition}}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Quantity:</Title>
                        <Title size="title-terciary ">{{product.stock}}</Title>
                    </div>
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Dimentions:</Title>
                        <Title size="title-terciary ">{{product.width}} x {{product.height}}</Title>
                    </div>
                </div>
                <div class=" flex column half">
                    <div class="flex mb-6 start">
                        <Title size="title-secondary mr-6">Price:</Title>
                        <Title size="title-terciary ">{{product.price}}</Title>
                    </div>
                    <div class="inline mb-6 start">
                        <div class="flex column">
                                <v-combobox
                                   
                                    :items="categoriesName"
                                    label="Categories"
                                    
                                    solo
                                ></v-combobox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
                <ButtonSecondary @click.native="publishProduct">Publish!</ButtonSecondary>
                <ButtonSecondary :reverse="true"  @click.native="$emit('goBack')">Go back</ButtonSecondary>
        </div>
        <Popup ref="successModal" message="Your product has been successfuly published!" :response="true"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import {Product} from "@/requests/products/Product";
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Popup from '@/components/generic/Popup.vue';

@Component({
    components:{
        Title,
        ButtonSecondary,
        Popup
    }
})
export default class ProductResume extends Vue{

    @Prop() product! : Product;
    @Prop() categories!: Array<object>;

    $refs!:{
        successModal: any
    }
    get categoriesName(){
        let categoryName :Array<string>=[];
       for (let i=1;i<this.categories.length;i++){
            let name=this.categories[i].name;
            categoryName.push(name);
               
        }
         return categoryName;
    }

    private publishProduct(){
        this.$refs.successModal.openModal();
    }

}
</script>

<style>

</style>