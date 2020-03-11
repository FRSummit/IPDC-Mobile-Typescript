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
                        <v-card v-if="item === 'WorkerMeetings'"><WorkerMeetings/></v-card>
                        <v-card v-if="item === 'CMSMeetings'"><CMSMeetings/></v-card>
                        <v-card v-if="item === 'SMMeetings'"><SMMeetings/></v-card>
                        <v-card v-if="item === 'MemberMeetings'"><MemberMeetings/></v-card>
                        <v-card v-if="item === 'DawahMeetings'"><DawahMeetings/></v-card>
                        <v-card v-if="item === 'StateLeaderMeetings'"><StateLeaderMeetings/></v-card>
                        <v-card v-if="item === 'StateOuting'"><StateOuting/></v-card>
                        <v-card v-if="item === 'IftarGatherings'"><IftarGatherings/></v-card>
                        <v-card v-if="item === 'LearningMeetings'"><LearningMeetings/></v-card>
                        <v-card v-if="item === 'SocialDawahPrograms'"><SocialDawahPrograms/></v-card>
                        <v-card v-if="item === 'DawahGroups'"><DawahGroups/></v-card>
                        <v-card v-if="item === 'NextGMeetings'"><NextGMeetings/></v-card>
                        <v-card v-if="item === 'TafsirMeetings'"><TafsirMeetings/></v-card>
                        <v-card v-if="item === 'UnitMeetings'"><UnitMeetings/></v-card>
                        <v-card v-if="item === 'BBQMeetings'"><BBQMeetings/></v-card>
                        <v-card v-if="item === 'GatheringMeetings'"><GatheringMeetings/></v-card>
                        <v-card v-if="item === 'FamilyVisitMeetings'"><FamilyVisitMeetings/></v-card>
                        <v-card v-if="item === 'EidReunionMeetings'"><EidReunionMeetings/></v-card>
                        <v-card v-if="item === 'OtherMeetings'"><OtherMeetings/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import WorkerMeetings from './WorkerMeetings/WorkerMeetings.vue'
import CMSMeetings from './CMSMeetings/CMSMeetings.vue'
import SMMeetings from './SMMeetings/SMMeetings.vue'
import MemberMeetings from './MemberMeetings/MemberMeetings.vue'
import DawahMeetings from './DawahMeetings/DawahMeetings.vue'
import StateLeaderMeetings from './StateLeaderMeetings/StateLeaderMeetings.vue'
import StateOuting from './StateOuting/StateOuting.vue'
import IftarGatherings from './IftarGatherings/IftarGatherings.vue'
import LearningMeetings from './LearningMeetings/LearningMeetings.vue'
import SocialDawahPrograms from './SocialDawahPrograms/SocialDawahPrograms.vue'
import DawahGroups from './DawahGroups/DawahGroups.vue'
import NextGMeetings from './NextGMeetings/NextGMeetings.vue'
import TafsirMeetings from './TafsirMeetings/TafsirMeetings.vue'
import UnitMeetings from './UnitMeetings/UnitMeetings.vue'
import BBQMeetings from './BBQMeetings/BBQMeetings.vue'
import GatheringMeetings from './GatheringMeetings/GatheringMeetings.vue'
import FamilyVisitMeetings from './FamilyVisitMeetings/FamilyVisitMeetings.vue'
import EidReunionMeetings from './EidReunionMeetings/EidReunionMeetings.vue'
import OtherMeetings from './OtherMeetings/OtherMeetings.vue'

export default {
  components: {
      WorkerMeetings,
      CMSMeetings,
      SMMeetings,
      MemberMeetings,
      DawahMeetings,
      StateLeaderMeetings,
      StateOuting,
      IftarGatherings,
      LearningMeetings,
      SocialDawahPrograms,
      DawahGroups,
      NextGMeetings,
      TafsirMeetings,
      UnitMeetings,
      BBQMeetings,
      GatheringMeetings,
      FamilyVisitMeetings,
      EidReunionMeetings,
      OtherMeetings
  },
  data() {
      return {
            tab: null,
            items: ['WorkerMeetings', 'CMSMeetings', 'SMMeetings', 'MemberMeetings', 'DawahMeetings', 'StateLeaderMeetings', 'StateOuting', 'IftarGatherings', 'LearningMeetings', 'SocialDawahPrograms', 'DawahGroups', 'NextGMeetings', 'TafsirMeetings', 'UnitMeetings', 'BBQMeetings', 'GatheringMeetings', 'FamilyVisitMeetings', 'EidReunionMeetings', 'OtherMeetings'],
      }
  },
  mounted() {
      if(this.$route.name === 'Worker Meetings') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'CMS Meetings') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'SM Meetings') document.querySelectorAll('.my_tab')[2].click()
      else if(this.$route.name === 'Member Meetings') document.querySelectorAll('.my_tab')[3].click()
      else if(this.$route.name === 'Dawah Meetings') document.querySelectorAll('.my_tab')[4].click()
      else if(this.$route.name === 'State Leader Meetings') document.querySelectorAll('.my_tab')[5].click()
      else if(this.$route.name === 'State Outing') document.querySelectorAll('.my_tab')[6].click()
      else if(this.$route.name === 'Iftar Gathering') document.querySelectorAll('.my_tab')[7].click()
      else if(this.$route.name === 'Learning Meetings') document.querySelectorAll('.my_tab')[8].click()
      else if(this.$route.name === 'Social Dawah Programs') document.querySelectorAll('.my_tab')[9].click()
      else if(this.$route.name === 'Dawah group') document.querySelectorAll('.my_tab')[10].click()
      else if(this.$route.name === 'NextG Meeting') document.querySelectorAll('.my_tab')[11].click()
      else if(this.$route.name === 'Tafsir Meetings') document.querySelectorAll('.my_tab')[12].click()
      else if(this.$route.name === 'Unit Meetings') document.querySelectorAll('.my_tab')[13].click()
      else if(this.$route.name === 'BBQ Meetings') document.querySelectorAll('.my_tab')[14].click()
      else if(this.$route.name === 'Gathering Meetings') document.querySelectorAll('.my_tab')[15].click()
      else if(this.$route.name === 'Family Visit Meetings') document.querySelectorAll('.my_tab')[16].click()
      else if(this.$route.name === 'Eid Re-Union Meetings') document.querySelectorAll('.my_tab')[17].click()
      else if(this.$route.name === 'Other Meetings') document.querySelectorAll('.my_tab')[18].click()
  },
}
</script>