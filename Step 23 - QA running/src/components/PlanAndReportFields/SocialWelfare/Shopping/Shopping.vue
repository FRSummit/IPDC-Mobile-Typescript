<template>
    <div class="create-plan-vue">
        <Shopping/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Shopping  from './Shopping';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      Shopping,
      Navbar2
  },
};
</script>