<template>
    <div class="create-plan-vue">
        <FamilyVisitMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  FamilyVisitMeetings  from './FamilyVisitMeetings';

export default {
  components: {
      FamilyVisitMeetings
  },
};
</script>