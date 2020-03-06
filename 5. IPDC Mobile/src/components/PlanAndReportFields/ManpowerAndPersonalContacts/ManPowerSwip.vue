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
                    <v-card v-if="item === 'Member'"><Member/></v-card>
                    <v-card v-if="item === 'AssociateMember'"><AssociateMember/></v-card>
                    <v-card v-if="item === 'PreliminaryMember'"><PreliminaryMember/></v-card>
                    <v-card v-if="item === 'SupporterMember'"><SupporterMember/></v-card>
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
}
</script>