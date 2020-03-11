<template>
    <div class="create-plan-vue">
        <MasjidTableBank/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MasjidTableBank  from './MasjidTableBank';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MasjidTableBank,
      Navbar2
  },
};
</script>