<template>
    <div class="create-plan-vue">
        <AssociateMember/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  AssociateMember  from './AssociateMember';

export default {
  components: {
      AssociateMember
  },
};
</script>