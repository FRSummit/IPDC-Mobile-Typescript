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
                    <v-card v-if="item === 'BookLibrary'"><BookLibrary/></v-card>
                    <v-card v-if="item === 'VHSLibrary'"><VHSLibrary/></v-card>
                    <v-card v-if="item === 'OtherLibrary'"><OtherLibrary/></v-card>
                    </v-card>
                </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-ons-page>
    </div>
</template>

<script>
import BookLibrary from './BookLibrary/BookLibrary.vue'
import OtherLibrary from './OtherLibrary/OtherLibrary.vue'
import VHSLibrary from './VHSLibrary/VHSLibrary.vue'

export default {
  components: {
      BookLibrary,
      OtherLibrary,
      VHSLibrary
  },
  data() {
      return {
            tab: null,
            items: ['BookLibrary', 'VHSLibrary', 'OtherLibrary']
      }
  },
  mounted() {
      if(this.$route.name === 'Book Library') document.querySelectorAll('.my_tab')[0].click()
      else if(this.$route.name === 'Audio Library') document.querySelectorAll('.my_tab')[1].click()
      else if(this.$route.name === 'Other Library') document.querySelectorAll('.my_tab')[2].click()
  },
}
</script>