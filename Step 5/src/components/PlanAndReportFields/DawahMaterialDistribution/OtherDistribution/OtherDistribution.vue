<template>
    <div class="create-plan-vue">
        <OtherDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherDistribution  from './OtherDistribution';

export default {
  components: {
      OtherDistribution
  },
};
</script>