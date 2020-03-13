<template>
    <div class="create-plan-vue">
        <UnitMeetings/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  UnitMeetings  from './UnitMeetings';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      UnitMeetings,
      Navbar2
  },
};
</script>