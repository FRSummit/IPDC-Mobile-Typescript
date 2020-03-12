<template>
    <div class="create-plan-vue">
        <MemorizingDoa/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingDoa  from './MemorizingDoa';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MemorizingDoa,
      Navbar2
  },
};
</script>