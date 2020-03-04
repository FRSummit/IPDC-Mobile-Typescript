<template>
    <div class="create-plan-vue">
        <StateLearningCamp/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLearningCamp  from './StateLearningCamp';

export default {
  components: {
      StateLearningCamp
  },
};
</script>