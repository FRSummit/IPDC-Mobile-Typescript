<template>
    <div class="report-landing-vue">
        <ReportLanding/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import  ReportLanding  from '@/components/ReportLanding/ReportLanding';
import router from '../../router'

export default {
    components: {
        ReportLanding,
    }
}

</script>