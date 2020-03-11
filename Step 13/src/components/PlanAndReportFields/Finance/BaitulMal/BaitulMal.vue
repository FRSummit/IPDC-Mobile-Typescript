<template>
    <div class="create-plan-vue">
        <BaitulMal/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BaitulMal  from './BaitulMal';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      BaitulMal,
      Navbar2
  },
};
</script>