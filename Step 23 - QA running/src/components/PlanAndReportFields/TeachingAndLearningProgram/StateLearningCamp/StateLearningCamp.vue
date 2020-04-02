<template>
    <div class="create-plan-vue">
        <StateLearningCamp/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLearningCamp  from './StateLearningCamp';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StateLearningCamp,
      Navbar2
  },
};
</script>