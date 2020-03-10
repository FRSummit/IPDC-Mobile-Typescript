<template>
    <div class="create-plan-vue">
        <PracticeDarsSpeech/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PracticeDarsSpeech  from './PracticeDarsSpeech';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      PracticeDarsSpeech,
      Navbar2
  },
};
</script>