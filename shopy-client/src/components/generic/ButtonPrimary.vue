<template>
     <button class="button margin-medium" >
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

 

}
</script>

