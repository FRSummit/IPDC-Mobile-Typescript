<template>
    <div class="create-plan-vue">
        <SocialDawahPrograms/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SocialDawahPrograms  from './SocialDawahPrograms';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      SocialDawahPrograms,
      Navbar2
  },
};
</script>