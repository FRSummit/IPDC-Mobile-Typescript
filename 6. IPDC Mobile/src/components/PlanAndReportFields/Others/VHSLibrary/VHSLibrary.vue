<template>
    <div class="create-plan-vue">
        <VHSLibrary/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  VHSLibrary  from './VHSLibrary';

export default {
  components: {
      VHSLibrary
  },
};
</script>