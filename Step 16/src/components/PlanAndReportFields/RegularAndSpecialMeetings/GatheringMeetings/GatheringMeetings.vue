<template>
    <div class="create-plan-vue">
        <GatheringMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  GatheringMeetings  from './GatheringMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      GatheringMeetings,
      Navbar2
  },
};
</script>