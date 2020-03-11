<template>
    <div class="create-plan-vue">
        <DawahGroups/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  DawahGroups  from './DawahGroups';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      DawahGroups,
      Navbar2
  },
};
</script>