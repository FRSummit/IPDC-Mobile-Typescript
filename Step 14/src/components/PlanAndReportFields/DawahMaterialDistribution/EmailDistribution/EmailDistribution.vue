<template>
    <div class="create-plan-vue">
        <EmailDistribution/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  EmailDistribution  from './EmailDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      EmailDistribution,
      Navbar2
  },
};
</script>