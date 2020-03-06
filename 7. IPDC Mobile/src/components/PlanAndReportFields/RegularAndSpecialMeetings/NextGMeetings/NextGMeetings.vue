<template>
    <div class="create-plan-vue">
        <NextGMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  NextGMeetings  from './NextGMeetings';

export default {
  components: {
      NextGMeetings
  },
};
</script>