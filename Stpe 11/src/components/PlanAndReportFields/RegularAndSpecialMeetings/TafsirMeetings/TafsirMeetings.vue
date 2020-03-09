<template>
    <div class="create-plan-vue">
        <TafsirMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  TafsirMeetings  from './TafsirMeetings';

export default {
  components: {
      TafsirMeetings
  },
};
</script>