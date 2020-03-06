<template>
    <div class="create-plan-vue">
        <GatheringMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  GatheringMeetings  from './GatheringMeetings';

export default {
  components: {
      GatheringMeetings
  },
};
</script>