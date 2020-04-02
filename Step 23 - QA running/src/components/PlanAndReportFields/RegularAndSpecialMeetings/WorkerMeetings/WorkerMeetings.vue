<template>
    <div class="create-plan-vue">
        <WorkerMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  WorkerMeetings  from './WorkerMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      WorkerMeetings,
      Navbar2
  },
};
</script>