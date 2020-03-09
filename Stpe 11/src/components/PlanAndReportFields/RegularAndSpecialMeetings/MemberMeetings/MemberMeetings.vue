<template>
    <div class="create-plan-vue">
        <MemberMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemberMeetings  from './MemberMeetings';

export default {
  components: {
      MemberMeetings
  },
};
</script>