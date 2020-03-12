<template>
    <div class="create-plan-vue">
        <MemorizingAyat/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingAyat  from './MemorizingAyat';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MemorizingAyat,
      Navbar2
  },
};
</script>