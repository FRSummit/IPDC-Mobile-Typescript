<template>
    <div class="create-plan-vue">
        <MasjidProject/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MasjidProject  from './MasjidProject';

export default {
  components: {
      MasjidProject
  },
};
</script>