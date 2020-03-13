<template>
    <div class="create-plan-vue">
        <StateQiyamulLail/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateQiyamulLail  from './StateQiyamulLail';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StateQiyamulLail,
      Navbar2
  },
};
</script>