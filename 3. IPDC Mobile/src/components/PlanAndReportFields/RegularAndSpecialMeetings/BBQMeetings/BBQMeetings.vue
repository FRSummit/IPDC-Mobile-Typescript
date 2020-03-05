<template>
    <div class="create-plan-vue">
        <BBQMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BBQMeetings  from './BBQMeetings';

export default {
  components: {
      BBQMeetings
  },
};
</script>