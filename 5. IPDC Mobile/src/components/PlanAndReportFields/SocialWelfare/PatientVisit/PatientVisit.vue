<template>
    <div class="create-plan-vue">
        <PatientVisit/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PatientVisit  from './PatientVisit';

export default {
  components: {
      PatientVisit
  },
};
</script>