<template>
    <div class="create-plan-vue">
        <QuranStudy/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  QuranStudy  from './QuranStudy';

export default {
  components: {
      QuranStudy
  },
};
</script>