<template>
    <div class="create-plan-vue">
        <CMSMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  CMSMeetings  from './CMSMeetings';

export default {
  components: {
      CMSMeetings
  },
};
</script>