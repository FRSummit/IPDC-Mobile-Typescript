<template>
    <div class="create-plan-vue">
        <Shifting/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Shifting  from './Shifting';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      Shifting,
      Navbar2
  },
};
</script>