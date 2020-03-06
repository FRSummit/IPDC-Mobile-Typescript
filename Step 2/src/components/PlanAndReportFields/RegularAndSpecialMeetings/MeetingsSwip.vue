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
                        {{ text }}
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>

export default {
  components: {
  },
  data() {
      return {
            tab: null,
            items: ['Member', 'AssociateMember', 'PreliminaryMember', 'SupporterMember'],
            text: 'IPDC Project'
      }
  },
}
</script>