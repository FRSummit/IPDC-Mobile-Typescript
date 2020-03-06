<template>
    <div class="create-plan-vue">
        <StateOuting/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StateOuting  from './StateOuting';

export default {
  components: {
      StateOuting
  },
};
</script>