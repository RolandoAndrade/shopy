<template>
  <form action="#" class="search">
       <input type="text" class="search__input" placeholder="Search your product">
          <button class="search__button">
           <svg class="search__icon">
                 <use xlink:href="../../assets//symbol-defs.svg#icon-search"/>
            </svg>
          </button>
  </form>
</template>


<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class SearchBar extends Vue{

}
</script>

<style>

</style>