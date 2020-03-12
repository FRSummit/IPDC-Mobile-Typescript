<template>
    <div class="create-plan-vue">
        <SocialVisit/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SocialVisit  from './SocialVisit';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      SocialVisit,
      Navbar2
  },
};
</script>