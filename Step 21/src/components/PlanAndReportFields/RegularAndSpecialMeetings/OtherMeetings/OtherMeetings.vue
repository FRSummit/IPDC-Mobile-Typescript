<template>
    <div class="create-plan-vue">
        <OtherMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  OtherMeetings  from './OtherMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      OtherMeetings,
      Navbar2
  },
};
</script>