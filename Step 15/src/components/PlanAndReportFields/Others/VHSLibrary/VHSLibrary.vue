<template>
    <div class="create-plan-vue">
        <VHSLibrary/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  VHSLibrary  from './VHSLibrary';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      VHSLibrary,
      Navbar2
  },
};
</script>