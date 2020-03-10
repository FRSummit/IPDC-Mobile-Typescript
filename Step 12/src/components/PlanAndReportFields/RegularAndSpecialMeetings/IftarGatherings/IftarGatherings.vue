<template>
    <div class="create-plan-vue">
        <IftarGatherings/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  IftarGatherings  from './IftarGatherings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      IftarGatherings,
      Navbar2
  },
};
</script>