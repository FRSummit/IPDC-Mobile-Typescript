<template>
    <div class="create-plan-vue">
        <FoodDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  FoodDistribution  from './FoodDistribution';

export default {
  components: {
      FoodDistribution
  },
};
</script>