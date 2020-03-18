<template>
    <div class="create-plan-vue">
        <OtherSale/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherSale  from './OtherSale';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      OtherSale,
      Navbar2
  },
};
</script>