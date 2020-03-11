<template>
    <div class="create-plan-vue">
        <CMSMeetings/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  CMSMeetings  from './CMSMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      CMSMeetings,
      Navbar2
  },
};
</script>