<template>
    <div class="create-plan-vue">
        <SupporterMember/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SupporterMember  from './SupporterMember';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      SupporterMember,
      Navbar2
  },
};
</script>