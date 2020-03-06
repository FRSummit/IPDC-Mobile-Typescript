<template>
    <div class="create-plan-vue">
        <EmailDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  EmailDistribution  from './EmailDistribution';

export default {
  components: {
      EmailDistribution
  },
};
</script>