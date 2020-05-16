<template>
    <div> 
        <div color="white" class="card-create mt-6 ">
          <div class="flex to-column-tablet margin-medium">
            <div class="column mr-10 pa-5 cover" >
            
                <div class="form__group ">
                    <input v-model="productInfo.title" type="" class="form__input" placeholder="Name your product" id="name" required>
                    <label for="name" class="form__label">Name of your product</label>
                </div>
                 <v-textarea
                    filled
                    name="input-7-4"
                    label="Describe your product"
                    color="orange"
                    v-model="productInfo.description"
                   ></v-textarea>

                <v-radio-group v-model="productInfo.condition" row>
                    <v-radio label="Used" value="Used" color="orange"></v-radio>
                    <v-radio label="New" value="New" color="orange"></v-radio>
                </v-radio-group>     
            </div>
                <div class="column  mb-4">
                    <Title :size="'title-secondary'" class="mr-5 mb-5">Price:</Title>
                    <div class="flex mb-4">
                            <div class="form__group mr-6">
                                <input v-model="productInfo.price" type="number" class="form__number" required>
                            </div>
                            <div class="text-area mb-6">
                                <v-combobox
                                    v-model="select"
                                    :items="items"   
                                    dense
                                    
                                    class="" color="orange" item-color="orange" hide-details single-line="true"
                                    ></v-combobox>     
                            </div>
                    </div>
                
                    <div class="inline mb-4">
                        <div class="form__group mr-4">
                            <input type="number" class="form__number" placeholder="Width" id="width" required>
                            <label for="width" class="form__label">Width</label>
                        </div>
                        
                        <div class="form__group">
                            <input type="number" class="form__number" placeholder="Height" id="height" required>
                            <label for="height" class="form__label">Height</label>
                        </div>
                    </div>
                    <div class="form__group">
                            <input type="number" class="form__number"  id="quantity" placeholder="Quantity" required>
                            <label for="quantity" class="form__label">Quantity</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <ButtonSecondary  @click.native="nextStep()">Continue</ButtonSecondary>
            <ButtonSecondary :reverse="true"  @click.native="$emit('goBack')">Go back</ButtonSecondary>
        </div>
    <Popup :dialog="dialog" :response="response" :message="messageDialog" v-on:closeDialog="closeDialog"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Title from '@/components/typography/Title.vue';
import Popup from '@/components/generic/Popup.vue';
import {ProductInterface} from '../../../interfaces/product.interface';

@Component({
    components:{
        ButtonSecondary,
        Title,
        Popup
    }
})
export default class SelectInfo extends Vue{

        private title : string ='';
        private description : string = '';
        private row: string ='';
        private items: Array<string>=['$','Bs.F'];
        private select: string = this.items[0];
        private usedorNot : boolean = true;


            private dialog: boolean =false;
            private response? : boolean ;
            private messageDialog?: string;

        private productInfo : ProductInterface ={
            id: 0,
            title: '', 
            price: 0,
            author: '',
            condition: '',
            description: '',
            image: '' ,
            images: [],
            rating: 0,
            stock:5
        }

        private nextStep(){
            if (this.productInfo.title.length && this.productInfo.price >0 
                && this.productInfo.condition.length  && this.productInfo.description.length ){
                   this.$emit('nextStep',this.productInfo);
                }
            else {
                    this.dialog=true;
                    this.response=false;
                    this.messageDialog='All fields must be filled!';
            }
        }

        
}
</script>

<style lang="scss">

</style>