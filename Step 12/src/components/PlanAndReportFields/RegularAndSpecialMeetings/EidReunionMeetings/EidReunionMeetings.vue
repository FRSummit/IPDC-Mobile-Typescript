<template>
    <div class="create-plan-vue">
        <EidReunionMeetings/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  EidReunionMeetings  from './EidReunionMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      EidReunionMeetings,
      Navbar2
  },
};
</script>