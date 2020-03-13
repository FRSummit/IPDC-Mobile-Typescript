<template>
    <div class="create-plan-vue">
        <BookDistribution/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookDistribution  from './BookDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      BookDistribution,
      Navbar2
  },
};
</script>