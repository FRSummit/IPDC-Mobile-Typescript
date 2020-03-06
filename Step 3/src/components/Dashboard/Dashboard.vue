<template>
    <div class="dashboard-vue">
        <Dashboard/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  Dashboard  from '@/components/Dashboard/Dashboard';

// @Component({
//     components: {
//         Dashboard,
//     },
// })

// export default class DB extends Vue {}

export default {
    components: {
        Dashboard,
    },

}
</script>

<style scoped>
.dashboard {
  text-align: center;
}
.dashboard-title {
    font-size: 26px;
    margin: 0px;
} 
.router-link {
  text-decoration: none;
}
.dashboard-items_parent {
  width: 200px;
  padding: 20px 20px 10px 20px;
  background-color: #eee;
  margin: 10px auto;
  border: 1px solid #dedede;
  border-radius: 4px;
  cursor: pointer;
}
.dashboard-items_child_1 {
  color: #fff;
  width: 50%;
  padding: 20px;
  background: #0076FF;
  text-align: center;
  border-radius: 100px;
  margin: 0 auto;
}
.dashboard-items_parent span {
  color: #222;
}
</style>