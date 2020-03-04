<template>
    <div class="report-landing-vue">
        <v-ons-page style="margin-top: 56px;">
            <v-card color="basil">
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
        </v-ons-page>
    </div>
</template>

<script>
import ReportLandingPlan from './ReportLanding_Plan/ReportLanding.vue'
import ReportLandingReport from './ReportLanding_Report/ReportLanding.vue'

export default {
  components: {
      ReportLandingPlan,
      ReportLandingReport
  },
  data() {
      return {
            tab: null,
            items: [
            'Plan', 'Report',
            ],
            text: 'Lorem ipsum dolor'
      }
  },
}
</script>