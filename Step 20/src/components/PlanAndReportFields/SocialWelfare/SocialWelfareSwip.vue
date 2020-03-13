<template>
    <div class="report-landing-vue">
        <v-ons-page class="Page-MT page-position">
            <v-card color="basil">
                <v-tabs v-model="tab" background-color="transparent" grow>
                <v-tab class="my_tab"  v-for="item in items" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" class="tab-container">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card color="basil" flat>
                    <v-card v-if="item === 'QardEHasana'"><QardEHasana/></v-card>
                    <v-card v-if="item === 'PatientVisit'"><PatientVisit/></v-card>
                    <v-card v-if="item === 'SocialVisit'"><SocialVisit/></v-card>
                    <v-card v-if="item === 'Transport'"><Transport/></v-card>
                    <v-card v-if="item === 'Shifting'"><Shifting/></v-card>
                    <v-card v-if="item === 'Shopping'"><Shopping/></v-card>
                    <v-card v-if="item === 'FoodDistribution'"><FoodDistribution/></v-card>
                    <v-card v-if="item === 'CleanUpAustralia'"><CleanUpAustralia/></v-card>
                    <v-card v-if="item === 'Other'"><Other/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import QardEHasana from './QardEHasana/QardEHasana.vue'
import PatientVisit from './PatientVisit/PatientVisit.vue'
import SocialVisit from './SocialVisit/SocialVisit.vue'
import Transport from './Transport/Transport.vue'
import Shifting from './Shifting/Shifting.vue'
import Shopping from './Shopping/Shopping.vue'
import FoodDistribution from './FoodDistribution/FoodDistribution.vue'
import CleanUpAustralia from './CleanUpAustralia/CleanUpAustralia.vue'
import Other from './Other/Other.vue'

export default {
  components: {
      QardEHasana,
      PatientVisit,
      SocialVisit,
      Transport,
      Shifting,
      Shopping,
      FoodDistribution,
      CleanUpAustralia,
      Other
  },
  data() {
      return {
            tab: null,
            items: ['QardEHasana', 'PatientVisit', 'SocialVisit', 'Transport', 'Shifting', 'Shopping', 'FoodDistribution', 'CleanUpAustralia', 'Other']
      }
  },
  mounted() {
      if(this.$route.name === 'Qard-e-Hasana') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Patient Visit') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'Social Visit') document.querySelectorAll('.my_tab')[2].click()
      else if(this.$route.name === 'Transport') document.querySelectorAll('.my_tab')[3].click()
      else if(this.$route.name === 'Shifting') document.querySelectorAll('.my_tab')[4].click()
      else if(this.$route.name === 'Shopping') document.querySelectorAll('.my_tab')[5].click()
      else if(this.$route.name === 'Food Distribution') document.querySelectorAll('.my_tab')[6].click()
      else if(this.$route.name === 'Clean Up') document.querySelectorAll('.my_tab')[7].click()
      else if(this.$route.name === 'Other') document.querySelectorAll('.my_tab')[8].click()
  },
}
</script>