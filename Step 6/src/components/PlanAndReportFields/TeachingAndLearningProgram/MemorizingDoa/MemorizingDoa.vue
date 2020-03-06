<template>
    <div class="create-plan-vue">
        <MemorizingDoa/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingDoa  from './MemorizingDoa';

export default {
  components: {
      MemorizingDoa
  },
};
</script>