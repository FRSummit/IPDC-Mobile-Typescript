<template>
    <div class="create-plan-vue">
        <Transport/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Transport  from './Transport';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      Transport,
      Navbar2
  },
};
</script>