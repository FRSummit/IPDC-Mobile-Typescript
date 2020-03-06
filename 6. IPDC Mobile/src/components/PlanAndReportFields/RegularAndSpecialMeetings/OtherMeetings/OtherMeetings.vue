<template>
    <div class="create-plan-vue">
        <OtherMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherMeetings  from './OtherMeetings';

export default {
  components: {
      OtherMeetings
  },
};
</script>