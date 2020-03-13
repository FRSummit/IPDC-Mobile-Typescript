<template>
    <div class="create-plan-vue">
        <QuranClass/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  QuranClass  from './QuranClass';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      QuranClass,
      Navbar2
  },
};
</script>