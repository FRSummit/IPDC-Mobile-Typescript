<template>
    <div class="create-plan-vue">
        <Shopping/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Shopping  from './Shopping';

export default {
  components: {
      Shopping
  },
};
</script>