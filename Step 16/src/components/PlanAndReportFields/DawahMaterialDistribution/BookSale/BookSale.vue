<template>
    <div class="create-plan-vue">
        <BookSale/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookSale  from './BookSale';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      BookSale,
      Navbar2
  },
};
</script>