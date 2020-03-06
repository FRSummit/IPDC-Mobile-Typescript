<template>
    <div class="create-plan-vue">
        <UnitMeetings/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  UnitMeetings  from './UnitMeetings';

export default {
  components: {
      UnitMeetings
  },
};
</script>