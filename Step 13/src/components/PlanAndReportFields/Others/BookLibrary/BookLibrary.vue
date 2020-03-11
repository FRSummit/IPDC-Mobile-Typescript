<template>
    <div class="create-plan-vue">
        <BookLibrary/> 
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  BookLibrary  from './BookLibrary';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      BookLibrary,
      Navbar2
  },
};
</script>