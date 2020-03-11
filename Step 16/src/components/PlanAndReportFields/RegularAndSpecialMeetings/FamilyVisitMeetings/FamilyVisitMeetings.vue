<template>
    <div class="create-plan-vue">
        <FamilyVisitMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  FamilyVisitMeetings  from './FamilyVisitMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      FamilyVisitMeetings,
      Navbar2
  },
};
</script>