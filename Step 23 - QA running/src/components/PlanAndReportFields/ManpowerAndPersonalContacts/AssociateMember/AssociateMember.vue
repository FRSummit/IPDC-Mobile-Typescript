<template>
    <div class="create-plan-vue">
        <AssociateMember/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  AssociateMember  from './AssociateMember';
import Navbar2 from '../../../CommonLayout/NavBar2.vue'

export default {
  components: {
      AssociateMember,
      Navbar2
  },
};
</script>