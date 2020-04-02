<template>
    <div class="report-landing-vue">
        <v-ons-page class="Page-MT page-position">
            <v-card color="basil">
                <v-tabs v-model="tab" background-color="transparent" grow>
                <v-tab class="my_tab"  v-for="(tab, index) in items" :key="index" @click="currentTab(index)">{{ tab }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab" class="tab-container">
                <v-tab-item v-for="(tab, index) in items" :key="index">
                    <v-card color="basil" flat>
                    <v-card v-if="tab === 'Member'"><Member/></v-card>
                    <v-card v-if="tab === 'AssociateMember'"><AssociateMember/></v-card>
                    <v-card v-if="tab === 'PreliminaryMember'"><PreliminaryMember/></v-card>
                    <v-card v-if="tab === 'SupporterMember'"><SupporterMember/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import Member from './Member/Member.vue'
import AssociateMember from './AssociateMember/AssociateMember.vue'
import PreliminaryMember from './PreliminaryMember/PreliminaryMember.vue'
import SupporterMember from './SupporterMember/SupporterMember.vue'
import { Watch } from 'vue-property-decorator'

export default {
  components: {
      Member,
      AssociateMember,
      PreliminaryMember,
      SupporterMember
  },
  data() {
      return {
            tab: null,
            items: ['Member', 'AssociateMember', 'PreliminaryMember', 'SupporterMember']
      }
  },
  created() {
  },
  mounted() {
      if(this.$route.name === 'Member') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Associate Member') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'Preliminary Member') document.querySelectorAll('.my_tab')[2].click()
      else if(this.$route.name === 'Supporter Member') document.querySelectorAll('.my_tab')[3].click()
    //   this.item1Mutation()
    //   this.item2Mutation()
    //   this.item3Mutation()
    //   this.item4Mutation()
  },
  methods: {
    tabChange(tabName) {
        console.log(tabName)
    },
    currentTab(index) {
        // console.log(index)
    },
    item1Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[0].classList.contains('v-tab--active')) {
            document.querySelectorAll('.my_tab')[0].click()
            console.log('this is Member')
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
            document.querySelectorAll('.my_tab')[1].click()
            console.log('A Member')
          }
        }
      });
      this.observer2.observe(document.querySelectorAll('.my_tab')[1],{
        attributes: true,
        attributeOldValue : true,
        attributeFilter: ['class'],
      });
    },
    item3Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[2].classList.contains('v-tab--active')) {
            document.querySelectorAll('.my_tab')[2].click()
            console.log('P Member')
          }
        }
      });
      this.observer2.observe(document.querySelectorAll('.my_tab')[2],{
        attributes: true,
        attributeOldValue : true,
        attributeFilter: ['class'],
      });
    },
    item4Mutation() {
      this.observer2 = new MutationObserver(mutations => {
        for (const m of mutations) {
          if(document.querySelectorAll('.my_tab')[3].classList.contains('v-tab--active')) {
            document.querySelectorAll('.my_tab')[3].click()
            console.log('S Member')
          }
        }
      });
      this.observer2.observe(document.querySelectorAll('.my_tab')[3],{
        attributes: true,
        attributeOldValue : true,
        attributeFilter: ['class'],
      });
    },
  },
  watch: {
    // $route (to, from){
    //     // this.show = false;
    //     console.log(to)
    //     console.log(from)
    // }
  }
}
</script>