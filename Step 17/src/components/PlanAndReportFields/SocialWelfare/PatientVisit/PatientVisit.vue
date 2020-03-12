<template>
    <div class="create-plan-vue">
        <PatientVisit/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PatientVisit  from './PatientVisit';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      PatientVisit,
      Navbar2
  },
};
</script>