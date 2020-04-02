<template>
    <div class="create-plan-vue">
        <SMMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SMMeetings  from './SMMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      SMMeetings,
      Navbar2
  },
};
</script>