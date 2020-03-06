<template>
    <div class="create-plan-vue">
        <BookSale/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookSale  from './BookSale';

export default {
  components: {
      BookSale
  },
};
</script>