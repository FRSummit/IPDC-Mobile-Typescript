<template>
    <div class="create-plan-vue">
        <BookDistribution/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookDistribution  from './BookDistribution';

export default {
  components: {
      BookDistribution
  },
};
</script>