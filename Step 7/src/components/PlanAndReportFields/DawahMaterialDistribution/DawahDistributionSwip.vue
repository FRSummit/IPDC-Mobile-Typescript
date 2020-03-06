<template>
    <div class="report-landing-vue">
        <v-ons-page class="Page-MT">
            <v-card color="basil">
                <v-tabs v-model="tab" background-color="transparent" grow>
                <v-tab class="my_tab"  v-for="item in items" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
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
}
</script>