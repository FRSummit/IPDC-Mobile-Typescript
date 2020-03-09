<template>
    <div class="create-plan-vue">
        <StudyCircleAM/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  StudyCircleAM  from './StudyCircleAM';

export default {
  components: {
      StudyCircleAM
  },
};
</script>