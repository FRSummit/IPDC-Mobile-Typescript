<template>
    <div class="report-landing-vue">
        <v-ons-page class="report-landing-page Page-MT">
            <v-container class="head-container">
            <v-card color="basil">
                <ReportLandingPlan/>
            </v-card>
            </v-container>
        </v-ons-page>
    </div>
</template>

<script>
import ReportLandingPlan from './ReportLanding_Plan/ReportLanding.vue'
import { UnitPlanReportService } from "../../services/UnitPlanReportService"
const unitPlanReportService = new UnitPlanReportService();

export default {
  components: {
      ReportLandingPlan
  },
  data() {
      return {
      }
  },
  created() {
    let tabActivation = {'Tab': 'PLAN'};
    localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
    
    let unitReportId = localStorage.getItem('planandreports_passing_unit_id')
    let data = unitPlanReportService.getPlan(unitReportId)
    data.then(res => {
        this.$store.state.reportStatus = res.reportStatusDescription
    })
  },
  methods: {
  },
  mounted() {
  },
}
</script>