<template>
    <div class="create-plan-vue">
        <MemberMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemberMeetings  from './MemberMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MemberMeetings,
      Navbar2
  },
};
</script>