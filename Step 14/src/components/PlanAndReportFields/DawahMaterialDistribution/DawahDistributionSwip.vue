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
                    <v-card v-if="item === 'BookSale'"><BookSale/></v-card>
                    <v-card v-if="item === 'BookDistribution'"><BookDistribution/></v-card>
                    <v-card v-if="item === 'VHSSale'"><VHSSale/></v-card>
                    <v-card v-if="item === 'VHSDistribution'"><VHSDistribution/></v-card>
                    <v-card v-if="item === 'EmailDistribution'"><EmailDistribution/></v-card>
                    <v-card v-if="item === 'IPDCLeafletDistribution'"><IPDCLeafletDistribution/></v-card>
                    <v-card v-if="item === 'OtherSale'"><OtherSale/></v-card>
                    <v-card v-if="item === 'OtherDistribution'"><OtherDistribution/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import BookSale from './BookSale/BookSale.vue'
import BookDistribution from './BookDistribution/BookDistribution.vue'
import VHSSale from './VHSSale/VHSSale.vue'
import VHSDistribution from './VHSDistribution/VHSDistribution.vue'
import EmailDistribution from './EmailDistribution/EmailDistribution.vue'
import IPDCLeafletDistribution from './IPDCLeafletDistribution/IPDCLeafletDistribution.vue'
import OtherSale from './OtherSale/OtherSale.vue'
import OtherDistribution from './OtherDistribution/OtherDistribution.vue'

export default {
  components: {
      BookSale,
      BookDistribution,
      VHSSale,
      VHSDistribution,
      EmailDistribution,
      IPDCLeafletDistribution,
      OtherSale,
      OtherDistribution
  },
  data() {
      return {
            tab: null,
            items: ['BookSale', 'BookDistribution', 'VHSSale', 'VHSDistribution', 'EmailDistribution', 'IPDCLeafletDistribution', 'OtherSale', 'OtherDistribution']
      }
  },
  mounted() {
      if(this.$route.name === 'Book Sale') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Book Distribution') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'Audion sale') document.querySelectorAll('.my_tab')[2].click()
      else if(this.$route.name === 'Audio Distribution') document.querySelectorAll('.my_tab')[3].click()
      else if(this.$route.name === 'Email Distribution') document.querySelectorAll('.my_tab')[4].click()
      else if(this.$route.name === 'IPDC Leaflet Distribution') document.querySelectorAll('.my_tab')[5].click()
      else if(this.$route.name === 'Other Sale') document.querySelectorAll('.my_tab')[6].click()
      else if(this.$route.name === 'Other Distribution') document.querySelectorAll('.my_tab')[7].click()
  },
}
</script>