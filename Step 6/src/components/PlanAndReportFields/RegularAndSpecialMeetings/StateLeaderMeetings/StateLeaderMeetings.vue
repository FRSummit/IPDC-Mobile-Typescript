<template>
    <div class="create-plan-vue">
        <StateLeaderMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLeaderMeetings  from './StateLeaderMeetings';

export default {
  components: {
      StateLeaderMeetings
  },
};
</script>