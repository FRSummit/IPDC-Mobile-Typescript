<template>
    <div class="create-plan-vue">
        <PracticeDarsSpeech/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PracticeDarsSpeech  from './PracticeDarsSpeech';

export default {
  components: {
      PracticeDarsSpeech
  },
};
</script>