<template>
    <div class="create-plan-vue">
        <MemorizingHadith/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingHadith  from './MemorizingHadith';

export default {
  components: {
      MemorizingHadith
  },
};
</script>