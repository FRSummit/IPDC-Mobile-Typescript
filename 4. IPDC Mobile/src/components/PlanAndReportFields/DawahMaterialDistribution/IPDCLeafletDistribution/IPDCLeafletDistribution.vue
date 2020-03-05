<template>
    <div class="create-plan-vue">
        <IPDCLeafletDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  IPDCLeafletDistribution  from './IPDCLeafletDistribution';

export default {
  components: {
      IPDCLeafletDistribution
  },
};
</script>