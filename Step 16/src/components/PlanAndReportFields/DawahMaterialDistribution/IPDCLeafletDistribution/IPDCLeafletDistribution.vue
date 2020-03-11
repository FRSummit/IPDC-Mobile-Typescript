<template>
    <div class="create-plan-vue">
        <IPDCLeafletDistribution/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  IPDCLeafletDistribution  from './IPDCLeafletDistribution';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      IPDCLeafletDistribution,
      Navbar2
  },
};
</script>