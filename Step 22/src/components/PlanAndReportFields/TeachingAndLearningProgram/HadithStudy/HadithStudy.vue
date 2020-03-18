<template>
    <div class="create-plan-vue">
        <HadithStudy/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  HadithStudy  from './HadithStudy';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      HadithStudy,
      Navbar2
  },
};
</script>