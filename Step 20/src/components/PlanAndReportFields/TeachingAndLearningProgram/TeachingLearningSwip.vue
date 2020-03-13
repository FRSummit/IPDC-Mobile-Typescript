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
                    <v-card v-if="item === 'GroupStudyDiscussion'"><GroupStudyDiscussion/></v-card>
                    <v-card v-if="item === 'StudyCircle'"><StudyCircle/></v-card>
                    <v-card v-if="item === 'StudyCircleAM'"><StudyCircleAM/></v-card>
                    <v-card v-if="item === 'PracticeDarsSpeech'"><PracticeDarsSpeech/></v-card>
                    <v-card v-if="item === 'StateLearningCamp'"><StateLearningCamp/></v-card>
                    <v-card v-if="item === 'QuranStudy'"><QuranStudy/></v-card>
                    <v-card v-if="item === 'HadithStudy'"><HadithStudy/></v-card>
                    <v-card v-if="item === 'QuranClass'"><QuranClass/></v-card>
                    <v-card v-if="item === 'WeekendIslamicSchool'"><WeekendIslamicSchool/></v-card>
                    <v-card v-if="item === 'MemorizingAyat'"><MemorizingAyat/></v-card>
                    <v-card v-if="item === 'MemorizingHadith'"><MemorizingHadith/></v-card>
                    <v-card v-if="item === 'MemorizingDoa'"><MemorizingDoa/></v-card>
                    <v-card v-if="item === 'StateLearningSession'"><StateLearningSession/></v-card>
                    <v-card v-if="item === 'StateQiyamulLali'"><StateQiyamulLali/></v-card>
                    <v-card v-if="item === 'Other'"><Other/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import GroupStudyDiscussion from './GroupStudyDiscussion/GroupStudyDiscussion.vue';
import StudyCircle from './StudyCircle/StudyCircle.vue';
import StudyCircleAM from './StudyCircleAM/StudyCircleAM.vue';
import PracticeDarsSpeech from './PracticeDarsSpeech/PracticeDarsSpeech.vue';
import StateLearningCamp from './StateLearningCamp/StateLearningCamp.vue';
import QuranStudy from './QuranStudy/QuranStudy.vue';
import HadithStudy from './HadithStudy/HadithStudy.vue';
import QuranClass from './QuranClass/QuranClass.vue';
import WeekendIslamicSchool from './WeekendIslamicSchool/WeekendIslamicSchool.vue';
import MemorizingAyat from './MemorizingAyat/MemorizingAyat.vue';
import MemorizingHadith from './MemorizingHadith/MemorizingHadith.vue';
import MemorizingDoa from './MemorizingDoa/MemorizingDoa.vue';
import StateLearningSession from './StateLearningSession/StateLearningSession.vue';
import StateQiyamulLali from './StateQiyamulLail/StateQiyamulLail.vue';
import Other from './Other/Other.vue';

export default {
  components: {
      GroupStudyDiscussion,
      StudyCircle,
      StudyCircleAM,
      PracticeDarsSpeech,
      StateLearningCamp,
      QuranStudy,
      HadithStudy,
      QuranClass,
      WeekendIslamicSchool,
      MemorizingAyat,
      MemorizingHadith,
      MemorizingDoa,
      StateLearningSession,
      StateQiyamulLali,
      Other
  },
  data() {
      return {
            tab: null,
            items: ['GroupStudyDiscussion', 'StudyCircle', 'StudyCircleAM', 'PracticeDarsSpeech', 'StateLearningCamp', 'QuranStudy', 'HadithStudy', 'QuranClass', 'WeekendIslamicSchool', 'MemorizingAyat', 'MemorizingHadith', 'MemorizingDoa', 'StateLearningSession', 'StateQiyamulLali', 'Other']
      }
  },
  mounted() {
      if(this.$route.name === 'Group Study Discussion') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Study Circle') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'Study Circle AM') document.querySelectorAll('.my_tab')[2].click()
      else if(this.$route.name === 'Practice DarsSpeech') document.querySelectorAll('.my_tab')[3].click()
      else if(this.$route.name === 'State Learning Camp') document.querySelectorAll('.my_tab')[4].click()
      else if(this.$route.name === 'Quran Study') document.querySelectorAll('.my_tab')[5].click()
      else if(this.$route.name === 'Hadith Study') document.querySelectorAll('.my_tab')[6].click()
      else if(this.$route.name === 'Quran Class') document.querySelectorAll('.my_tab')[7].click()
      else if(this.$route.name === 'Weekend Islamic School') document.querySelectorAll('.my_tab')[8].click()
      else if(this.$route.name === 'Memorizing Ayat') document.querySelectorAll('.my_tab')[9].click()
      else if(this.$route.name === 'Memorizing Hadith') document.querySelectorAll('.my_tab')[10].click()
      else if(this.$route.name === 'Memorizing Doa') document.querySelectorAll('.my_tab')[11].click()
      else if(this.$route.name === 'State Learning Session') document.querySelectorAll('.my_tab')[12].click()
      else if(this.$route.name === 'State Qiyamul Lail') document.querySelectorAll('.my_tab')[13].click()
      else if(this.$route.name === 'Other') document.querySelectorAll('.my_tab')[14].click()
  }
}
</script>