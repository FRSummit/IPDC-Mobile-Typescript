<template>
    <div class="create-plan-vue">
        <DawahMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  DawahMeetings  from './DawahMeetings';

export default {
  components: {
      DawahMeetings
  },
};
</script>