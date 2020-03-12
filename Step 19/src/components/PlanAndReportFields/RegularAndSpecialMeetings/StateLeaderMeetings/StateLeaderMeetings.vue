<template>
    <div class="create-plan-vue">
        <StateLeaderMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateLeaderMeetings  from './StateLeaderMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StateLeaderMeetings,
      Navbar2
  },
};
</script>