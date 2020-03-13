<template>
    <div class="create-plan-vue">
        <NextGMeetings/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  NextGMeetings  from './NextGMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      NextGMeetings,
      Navbar2
  },
};
</script>