<template>
    <div class="create-plan-vue">
        <MasjidTableBank/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  MasjidTableBank  from './MasjidTableBank';

export default {
  components: {
      MasjidTableBank
  },
};
</script>