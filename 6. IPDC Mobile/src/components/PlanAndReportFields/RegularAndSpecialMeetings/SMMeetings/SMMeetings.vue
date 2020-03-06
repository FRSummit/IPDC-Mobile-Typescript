<template>
    <div class="create-plan-vue">
        <SMMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SMMeetings  from './SMMeetings';

export default {
  components: {
      SMMeetings
  },
};
</script>