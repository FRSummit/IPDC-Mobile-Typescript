<template>
    <div class="create-plan-vue">
        <EidReunionMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  EidReunionMeetings  from './EidReunionMeetings';

export default {
  components: {
      EidReunionMeetings
  },
};
</script>