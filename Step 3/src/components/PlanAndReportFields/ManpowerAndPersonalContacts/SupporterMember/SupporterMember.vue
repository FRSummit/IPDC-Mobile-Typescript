<template>
    <div class="create-plan-vue">
        <SupporterMember/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  SupporterMember  from './SupporterMember';

export default {
  components: {
      SupporterMember
  },
};
</script>