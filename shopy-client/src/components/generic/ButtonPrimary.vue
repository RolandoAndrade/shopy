<template>
     <button :class="getClass()" >
                <div class="button__text">
                   <slot/>
                </div>
     </button>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
})
export default class ButtonPrimary extends Vue{

   @Prop() color? : string;

   private getClass(): string{
      if (this.color==='purple'){
         return 'button button__primary__purple margin-medium'
      }
      else return 'button button__primary margin-medium'
   }

}
</script>

