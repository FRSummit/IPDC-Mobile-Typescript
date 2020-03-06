<template>
    <div class="create-plan-vue">
        <StudyCircle/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StudyCircle  from './StudyCircle';

export default {
  components: {
      StudyCircle
  },
};
</script>