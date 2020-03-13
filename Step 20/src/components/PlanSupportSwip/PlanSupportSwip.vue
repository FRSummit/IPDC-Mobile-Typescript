<template>
    <div class="">
        <v-ons-page class="Page-MT">
            <v-card color="basil">
                <v-tabs v-model="tab" background-color="transparent" grow>
                    <v-tab class="my_tab"  v-for="item in items" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" class="tab-container">
                    <v-tab-item v-for="item in items" :key="item">
                        <v-card color="basil" flat>
                            <v-card v-if="item === 'PlanAndReport'"><PlanAndReport/></v-card>
                            <v-card v-if="item === 'Support'"><Support/></v-card>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import PlanAndReport from '../PlanAndReports/PlanAndReports.vue'
import Support from '../Support/Support.vue'

export default {
  components: {
      PlanAndReport,
      Support,
  },
  data() {
      return {
            tab: null,
            items: ['PlanAndReport', 'Support'],
            text5: 'PlanAndReport',
            text6: 'Support'
      }
  },
  created() {
      console.log(this.$route.name)
  },
  mounted() {
      if(this.$route.name === 'Plan and Reports') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Support') document.querySelectorAll('.my_tab')[1].click()
  },
}
</script>