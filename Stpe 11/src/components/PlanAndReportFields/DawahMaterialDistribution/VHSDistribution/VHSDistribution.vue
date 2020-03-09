<template>
    <div class="create-plan-vue">
        <VHSDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  VHSDistribution  from './VHSDistribution';

export default {
  components: {
      VHSDistribution
  },
};
</script>