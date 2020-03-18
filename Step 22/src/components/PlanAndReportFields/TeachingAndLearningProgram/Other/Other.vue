<template>
    <div class="create-plan-vue">
        <Other/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Other  from './Other';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      Other,
      Navbar2
  },
};
</script>