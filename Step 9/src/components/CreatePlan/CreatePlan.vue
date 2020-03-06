<template>
    <div class="create-plan-vue">
        <CreatePlan/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  CreatePlan  from '@/components/CreatePlan/CreatePlan';

export default {
  components: {
      CreatePlan
  },
};
</script>