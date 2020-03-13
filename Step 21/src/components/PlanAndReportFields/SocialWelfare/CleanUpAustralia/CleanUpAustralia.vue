<template>
    <div class="create-plan-vue">
        <CleanUpAustralia/> 
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  CleanUpAustralia  from './CleanUpAustralia';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      CleanUpAustralia,
      Navbar2
  },
};
</script>