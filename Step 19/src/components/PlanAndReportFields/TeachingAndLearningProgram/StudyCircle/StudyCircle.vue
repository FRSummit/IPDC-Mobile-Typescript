<template>
    <div class="create-plan-vue">
        <StudyCircle/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StudyCircle  from './StudyCircle';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      StudyCircle,
      Navbar2
  },
};
</script>