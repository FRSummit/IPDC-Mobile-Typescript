<template>
    <div class="create-plan-vue">
        <PreliminaryMember/>
        <Navbar2/>  
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PreliminaryMember  from './PreliminaryMember';
import Navbar2 from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      PreliminaryMember,
      Navbar2
  },
};
</script>