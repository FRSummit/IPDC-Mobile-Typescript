<template>
    <div class="create-plan-vue">
        <WeekendIslamicSchool/>
        <Navbar2/> 
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  WeekendIslamicSchool  from './WeekendIslamicSchool';
import  Navbar2  from '../../../CommonLayout/NavBar2.vue';

export default {
  components: {
      WeekendIslamicSchool,
      Navbar2
  },
};
</script>