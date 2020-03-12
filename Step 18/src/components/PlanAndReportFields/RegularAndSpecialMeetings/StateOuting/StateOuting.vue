<template>
    <div class="create-plan-vue">
        <StateOuting/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateOuting  from './StateOuting';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StateOuting,
      Navbar2
  },
};
</script>