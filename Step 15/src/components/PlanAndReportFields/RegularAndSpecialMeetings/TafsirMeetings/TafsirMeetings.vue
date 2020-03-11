<template>
    <div class="create-plan-vue">
        <TafsirMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  TafsirMeetings  from './TafsirMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      TafsirMeetings,
      Navbar2
  },
};
</script>