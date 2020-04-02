<template>
    <div class="create-plan-vue">
        <QuranStudy/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  QuranStudy  from './QuranStudy';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      QuranStudy,
      Navbar2
  },
};
</script>