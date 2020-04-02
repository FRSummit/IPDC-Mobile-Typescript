<template>
    <div class="create-plan-vue">
        <LearningMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  LearningMeetings  from './LearningMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      LearningMeetings,
      Navbar2
  },
};
</script>