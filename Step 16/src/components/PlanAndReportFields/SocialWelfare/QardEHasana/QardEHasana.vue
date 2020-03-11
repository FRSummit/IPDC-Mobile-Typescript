<template>
    <div class="create-plan-vue">
        <QardEHasana/>
        <Navbar2/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  QardEHasana  from './QardEHasana';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      QardEHasana,
      Navbar2
  },
};
</script>