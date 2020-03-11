<template>
    <div class="create-plan-vue">
        <MemorizingHadith/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingHadith  from './MemorizingHadith';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MemorizingHadith,
      Navbar2
  },
};
</script>