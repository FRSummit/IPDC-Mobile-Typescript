<template>
    <div class="create-plan-vue">
        <PreliminaryMember/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PreliminaryMember  from './PreliminaryMember';

export default {
  components: {
      PreliminaryMember
  },
};
</script>