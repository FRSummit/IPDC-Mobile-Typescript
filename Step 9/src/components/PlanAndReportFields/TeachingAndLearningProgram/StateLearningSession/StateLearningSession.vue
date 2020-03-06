<template>
    <div class="create-plan-vue">
        <StateLearningSession/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLearningSession  from './StateLearningSession';

export default {
  components: {
      StateLearningSession
  },
};
</script>