<template>
    <div class="create-plan-vue">
        <GroupStudyDiscussion/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  GroupStudyDiscussion  from './GroupStudyDiscussion';

export default {
  components: {
      GroupStudyDiscussion
  },
};
</script>