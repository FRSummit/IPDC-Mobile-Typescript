<template>
    <div class="create-plan-vue">
        <StateLearningSession/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLearningSession  from './StateLearningSession';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StateLearningSession,
      Navbar2
  },
};
</script>