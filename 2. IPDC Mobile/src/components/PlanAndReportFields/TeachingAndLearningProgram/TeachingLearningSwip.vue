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
                    <v-card v-if="item === 'GroupStudyDiscussion'"><GroupStudyDiscussion/></v-card>
                    <v-card v-if="item === 'StudyCircleAM'"><StudyCircleAM/></v-card>
                    <v-card v-if="item === 'StudyCircle'"><StudyCircle/></v-card>
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
import StudyCircleAM from './StudyCircleAM/StudyCircleAM.vue';
import StudyCircle from './StudyCircle/StudyCircle.vue';
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
      StudyCircleAM,
      StudyCircle,
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
            items: ['GroupStudyDiscussion', 'StudyCircleAM', 'StudyCircle', 'PracticeDarsSpeech', 'StateLearningCamp', 'QuranStudy', 'HadithStudy', 'QuranClass', 'WeekendIslamicSchool', 'MemorizingAyat', 'MemorizingHadith', 'MemorizingDoa', 'StateLearningSession', 'StateQiyamulLali', 'Other']
      }
  },
}
</script>