<template>
    <div class="create-plan-vue">
        <GroupStudyDiscussion/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  GroupStudyDiscussion  from './GroupStudyDiscussion';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      GroupStudyDiscussion,
      Navbar2
  },
};
</script>