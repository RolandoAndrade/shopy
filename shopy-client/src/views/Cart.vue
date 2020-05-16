<template>
    <div>
        <div class="inline align-center ma-6 to-column">
            <Icon icon="icon-cart" size="icon-gigant" class="mr-6" color="orange-i"/>
            <div class="column ">
                <Title size="title-primary">My Cart</Title>
                <div class="title-terciary mt-4" >Total: {{totalPrice}}  $</div>
            </div>
        </div>
        <div class="divider" style="height:1px; width:70%"></div>
        <div v-if="items">
            <div class="mt-10 mb-10">
                <v-slide-group class="image-slider" center-active show-arrows color="purple" >    
                        <ProductCard v-for="n in items" :key="n.id" :product="n" :into="true"  @click.native="selectCard(n.id)"  :class="selectedCard(n.id)"/>
                </v-slide-group>
            </div>
            <div class="flex to-column mb-10" style="width:min-content;margin:0 auto;">
                <ButtonPrimary class="flex mr-8" >Buy all the products!</ButtonPrimary>
                <ButtonPrimary v-if="selected.length >0" class="flex"> Buy {{selected.length}} items</ButtonPrimary>
            </div>
        </div>
        <div v-else class="mt-10 mb-10">
            <Title size="title-secondary">Your cart is empty</Title>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '@/components/typography/Icon.vue';
import Title from '@/components/typography/Title.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import {Product} from "@/requests/products/Product";

@Component({
    components:{
        Icon,
        Title,
        ProductCard,
        ButtonPrimary
    }
})
export default class Cart extends Vue{

    private selected: Array<number>=[];
   // private selectedCard!: boolean;
    private totalPrice: number=1202;
    public items: Product[] = []

    private selectCard(productId : number){
       const selected = this.selected.find(f => f === productId);
       if (selected === undefined) this.selected.push(productId);
       else {
           const indx = this.selected.indexOf(productId);
           this.selected.splice(indx,1)
       }
    }

    private selectedCard(productId : number): string{
       const id = this.selected.find(f => f === productId);
       if (id){
           console.log('seleccionado')
           return 'selected-card '
       }
       else return ''
    }

}
</script>

<style>

</style>