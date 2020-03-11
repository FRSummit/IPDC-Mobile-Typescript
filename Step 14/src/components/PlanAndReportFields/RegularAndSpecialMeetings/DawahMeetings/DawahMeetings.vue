<template>
    <div class="create-plan-vue">
        <DawahMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  DawahMeetings  from './DawahMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      DawahMeetings,
      Navbar2
  },
};
</script>