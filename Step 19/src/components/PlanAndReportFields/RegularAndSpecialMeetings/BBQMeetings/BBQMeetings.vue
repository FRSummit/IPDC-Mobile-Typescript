<template>
    <div class="create-plan-vue">
        <BBQMeetings/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BBQMeetings  from './BBQMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      BBQMeetings,
      Navbar2
  },
};
</script>