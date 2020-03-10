<template>
    <div class="create-plan-vue">
        <StudyCircleAM/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StudyCircleAM  from './StudyCircleAM';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StudyCircleAM,
      Navbar2
  },
};
</script>