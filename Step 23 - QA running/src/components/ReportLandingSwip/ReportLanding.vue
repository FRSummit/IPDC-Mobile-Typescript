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
                <v-tabs v-model="tab" background-color="transparent" grow>
                <v-tab class="my_tab"  v-for="item in items" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card color="basil" flat>
                    <v-card v-if="item === 'Plan'"><ReportLandingPlan/></v-card>
                    <v-card v-if="item === 'Report'"><ReportLandingReport/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
            </v-container>
        </v-ons-page>
    </div>
</template>

<script>
import ReportLandingPlan from './ReportLanding_Plan/ReportLanding.vue'
import ReportLandingReport from './ReportLanding_Report/ReportLanding.vue'
import { UnitPlanReportService } from "../../services/UnitPlanReportService"
const unitPlanReportService = new UnitPlanReportService();

export default {
  components: {
      ReportLandingPlan,
      ReportLandingReport
  },
  data() {
      return {
            tab: null,
            items: ['Plan', 'Report'],
            text: 'Lorem ipsum dolor',
            reportStatus: null,
            dts: [],
            title: null,
            unit: null,
            status: null,
      }
  },
  created() {
    let tabActivation = {'Tab': 'PLAN'};
    localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
    const unitReportId = localStorage.getItem('planandreports_passing_unit_id')
    let status = null
    unitPlanReportService
      .getPlan(unitReportId)
      .then(res => {
        this.dts = res
        let descParts = res.description.split('_')
        this.title = descParts[0] + ' ' + descParts[2] + ' ' + descParts[3] + ' ' + descParts[4]
        this.unit = res.organization.description
        this.status = res.reportStatusDescription
        if(this.status === "Draft") this.status = "Plan Not Submitted";
        else if(this.status === "PlanPromoted") this.status = "Plan Submitted, Report Not Submitted";
        else if(this.status === "Submitted") this.status = "Plan Submitted, Report Submitted";
        else return '';

        status = res.reportStatusDescription
        this.reportStatus = res.reportStatusDescription
      })
    
    let data = unitPlanReportService.getPlan(unitReportId)
    data.then(res => {
      this.$store.state.reportStatus = res.reportStatusDescription
      let reportStatusDescriptionForInput = {'Status': res.reportStatusDescription};
      localStorage.setItem('reportStatusDescriptionForInput', JSON.stringify(reportStatusDescriptionForInput))
    })
  },
  methods: {
    item1Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[0].classList.contains('v-tab--active')) {
            localStorage.removeItem('reportingLanding_tab_activation')
            let tabActivation = {'Tab': 'PLAN'};
            localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
          }
        }
      });
      this.observer2.observe(document.querySelectorAll('.my_tab')[0],{
        attributes: true,
        attributeOldValue : true,
        attributeFilter: ['class'],
      });
    },
    item2Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[1].classList.contains('v-tab--active')) {
            let tabActivation = {'Tab': 'REPORT'};
            localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
          }
        }
      });
      this.observer2.observe(document.querySelectorAll('.my_tab')[1],{
        attributes: true,
        attributeOldValue : true,
        attributeFilter: ['class'],
      });
    },
  },
  mounted() {
    this.item1Mutation();
    this.item2Mutation();
    if(this.$route.path === '/report-landing-swip-report') document.querySelectorAll('.my_tab')[1].click()
  },
}
</script>