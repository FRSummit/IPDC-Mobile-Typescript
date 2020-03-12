<template>
    <div class="create-plan-vue">
        <VHSDistribution/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  VHSDistribution  from './VHSDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      VHSDistribution,
      Navbar2
  },
};
</script>