<template>
    <div class="report-landing-vue">
        <v-ons-page class="report-landing-page Page-MT">
            <v-container class="head-container">
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
            </v-container>
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
  created() {
    let tabActivation = {'Tab': 'PLAN'};
    localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
    console.log(tabActivation)
  },
  methods: {
    item1Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[0].classList.contains('v-tab--active')) {
            localStorage.removeItem('reportingLanding_tab_activation')
            // let tabActivation = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')).Tab;
            let tabActivation = {'Tab': 'PLAN'};
            localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
            console.log(tabActivation.Tab);
          }
          console.log(document.querySelector('.member.save-btn'));
          // console.log(event.target);
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
            // let tabActivation = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')).Tab;
            let tabActivation = {'Tab': 'REPORT'};
            localStorage.setItem('reportingLanding_tab_activation', JSON.stringify(tabActivation))
            console.log(tabActivation.Tab);
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
  },
}
</script>