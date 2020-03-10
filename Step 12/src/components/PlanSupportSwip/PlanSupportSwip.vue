<template>
    <div class="report-landing-vue">
        <!-- <v-ons-page class="" style="margin-top: 56px;">
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
        </v-ons-page> -->
    </div>
</template>

<script>
// import Member from '../PlanAndReportFields/ManpowerAndPersonalContacts/Member/Member.vue'
// import AssociateMember from '../PlanAndReportFields/ManpowerAndPersonalContacts/AssociateMember/AssociateMember.vue'
// import PreliminaryMember from '../PlanAndReportFields/ManpowerAndPersonalContacts/PreliminaryMember/PreliminaryMember.vue'
// import SupporterMember from '../PlanAndReportFields/ManpowerAndPersonalContacts/SupporterMember/SupporterMember.vue'
// import PlanAndReport from './PlanAndReports/PlanAndReports.vue'
// import Support from './Support/Support.vue'

// export default {
//   components: {
//     //   Member,
//     //   AssociateMember,
//     //   PreliminaryMember,
//     //   SupporterMember,
//       PlanAndReport,
//       Support
//   },
//   data() {
//       return {
//             tab: null,
//             // items: ['Member', 'AssociateMember', 'PreliminaryMember', 'SupporterMember']
//             items: ['PlanAndReport', 'Support']
//       }
//   },
//   created() {
//   },
//   mounted() {
//     //   if(this.$route.name === 'Member') document.querySelectorAll('.my_tab')[0].click()
//     //   else if(this.$route.name === 'Associate Member') document.querySelectorAll('.my_tab')[1].click()
//     //   else if(this.$route.name === 'Preliminary Member') document.querySelectorAll('.my_tab')[2].click()
//     //   else if(this.$route.name === 'Supporter Member') document.querySelectorAll('.my_tab')[3].click()
//   },
//   methods: {
//       tabChange(tabName) {
//           console.log(tabName)
//       },
//     addPost1(post) {
//       console.log("this is the post: " + post)
//     //   if(post === 'member') {
//     //     document.querySelectorAll('.my_tab')[1].click()
//     //   }
//     },
//   }
// }
</script>