<template>
    <div class="create-plan-vue">
        <Member/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Member  from './Member';

export default {
  components: {
      Member
  },
};
</script>