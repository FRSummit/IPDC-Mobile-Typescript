<template>
    <div class="create-plan-vue">
        <MemorizingAyat/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MemorizingAyat  from './MemorizingAyat';

export default {
  components: {
      MemorizingAyat
  },
};
</script>