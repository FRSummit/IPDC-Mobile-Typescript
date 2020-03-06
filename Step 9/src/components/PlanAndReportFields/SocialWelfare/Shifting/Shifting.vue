<template>
    <div class="create-plan-vue">
        <Shifting/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Shifting  from './Shifting';

export default {
  components: {
      Shifting
  },
};
</script>