<template>
    <div class="create-plan-vue">
        <Transport/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Transport  from './Transport';

export default {
  components: {
      Transport
  },
};
</script>