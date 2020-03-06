<template>
    <div class="create-plan-vue">
        <LearningMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  LearningMeetings  from './LearningMeetings';

export default {
  components: {
      LearningMeetings
  },
};
</script>