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