<template>
    <div class="create-plan-vue">
        <VHSSale/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  VHSSale  from './VHSSale';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      VHSSale,
      Navbar2
  },
};
</script>