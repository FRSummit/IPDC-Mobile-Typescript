<template>
    <div class="create-plan-vue">
        <OtherLibrary/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherLibrary  from './OtherLibrary';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      OtherLibrary,
      Navbar2
  },
};
</script>