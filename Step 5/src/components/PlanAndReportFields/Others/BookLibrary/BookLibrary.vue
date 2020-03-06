<template>
    <div class="create-plan-vue">
        <BookLibrary/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookLibrary  from './BookLibrary';

export default {
  components: {
      BookLibrary
  },
};
</script>