<template>
    <div class="create-plan-vue">
        <FoodDistribution/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  FoodDistribution  from './FoodDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      FoodDistribution,
      Navbar2
  },
};
</script>