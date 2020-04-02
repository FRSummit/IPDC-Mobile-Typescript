<template>
    <div class="report-landing-vue">
        <v-ons-page class="report-landing-page Page-MT">
            <v-container class="head-container">
            <v-card color="basil">
                <div class="report-des">
                <p><span class="report-text report-subtitle">{{ title }}</span></p>
                <p><span class="report-text">{{ unit }}</span></p>
                <p><span class="report-text">{{ status }}</span></p>
                </div>
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
import $ from 'jquery'

export default {
  components: {
      ReportLandingPlan
  },
  data() {
      return {
            title: null,
            unit: null,
            status: null,
      }
  },
  created() {
    let tabActivation = {'Tab': 'PLAN'};
    localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
    let unitReportId = localStorage.getItem('planandreports_passing_unit_id')
    let data = unitPlanReportService.getPlan(unitReportId)
    data.then(res => {
        let descParts = res.description.split('_')
        this.title = descParts[0] + ' ' + descParts[2] + ' ' + descParts[3] + ' ' + descParts[4]
        this.unit = res.organization.description
        this.status = res.reportStatusDescription
        if(this.status === "Draft") this.status = "Plan Not Submitted";
        else if(this.status === "PlanPromoted") this.status = "Plan Submitted, Report Not Submitted";
        else if(this.status === "Submitted") this.status = "Plan Submitted, Report Submitted";
        else return '';

        this.$store.state.reportStatus = res.reportStatusDescription
        let reportStatusDescriptionForInput = {'Status': res.reportStatusDescription};
        localStorage.setItem('reportStatusDescriptionForInput', JSON.stringify(reportStatusDescriptionForInput))
    })
  },
  methods: {
  },
  updated() {
  },
}
</script>