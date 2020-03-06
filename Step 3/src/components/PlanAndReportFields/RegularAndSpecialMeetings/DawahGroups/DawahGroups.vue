<template>
    <div class="create-plan-vue">
        <DawahGroups/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  DawahGroups  from './DawahGroups';

export default {
  components: {
      DawahGroups
  },
};
</script>