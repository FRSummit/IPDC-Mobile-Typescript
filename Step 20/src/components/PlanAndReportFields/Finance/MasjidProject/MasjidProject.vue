<template>
    <div class="create-plan-vue">
        <MasjidProject/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MasjidProject  from './MasjidProject';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      MasjidProject,
      Navbar2
  },
};
</script>