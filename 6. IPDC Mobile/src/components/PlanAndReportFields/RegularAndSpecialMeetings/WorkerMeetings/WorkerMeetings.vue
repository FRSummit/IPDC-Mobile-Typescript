<template>
    <div class="create-plan-vue">
        <WorkerMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  WorkerMeetings  from './WorkerMeetings';

export default {
  components: {
      WorkerMeetings
  },
};
</script>