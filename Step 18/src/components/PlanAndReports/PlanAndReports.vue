<template>
    <div class="plan-and-reports-vue">
        <PlanAndReports/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PlanAndReports  from '@/components/PlanAndReports/PlanAndReports';

export default {
  components: {
      PlanAndReports
  },
};
</script>