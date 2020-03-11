<template>
    <div class="create-plan-vue">
        <OtherDistribution/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherDistribution  from './OtherDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      OtherDistribution,
      Navbar2
  },
};
</script>