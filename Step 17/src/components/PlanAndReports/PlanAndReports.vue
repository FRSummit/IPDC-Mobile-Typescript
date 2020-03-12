<template>
    <div class="plan-and-reports-vue">
        <PlanAndReports/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import  PlanAndReports  from '@/components/PlanAndReports/PlanAndReports';

export default {
  components: {
      PlanAndReports
  },
  data () {
    return {
        unit_items: [
            {description: 'Item 1', id: '1'},
            {description: 'Item 2', id: '2'},
            {description: 'Item 3', id: '3'},
            {description: 'Item 4', id: '4'},
            {description: 'Item 5', id: '5'}
        ],
    }
  },
  created() {
  },
  methods:{
    // unitItemClick(id) {
    //     console.log(id);
    // },
  },
  watch: {
  },
};
</script>

<style scoped>
.plan-and-reports {
    padding: 0 4px;
}
.planandreport-title {
    font-size: 26px;
    margin: 0px;
} 
.search {
    text-align: right;
}
.search ons-search-input {
    margin-right: 10px;
}
.search input.search-input.search-input--material {
    height: 28px !important;
    background-size: 13px;
    background-position: 8px center;
    padding: 0 8px 0 28px !important;
    width: auto !important;
}
.plan-and-report-row {
    margin: 0;
    display: block;
    margin-top: 20px;
}
.card-radius.plan-card {
    margin: 8px 0;
    width: 100%;
}
.card-radius.plan-card .report-card {
    border-bottom: 1px solid gainsboro;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 16px;
    color: rgba(0, 0, 0, .54);
}
.search input.search-input.search-input--material[data-v-35ceb82b] {
    background-color: rgba(3,3,3,.09);
    border-radius: 5px;
}
.search {
    display: inline-block;
    /* float: right; */
    margin-top: 12px;
}
.waves-effect {
    margin-top: 10px;
}
input[type=search]:not(.browser-default):focus:not([readonly]){
    border-bottom: 1px solid #9e9e9e;
    -webkit-box-shadow: 0 1px 0 0 #9e9e9e;
    box-shadow: 0 1px 0 0 #9e9e9e;
}
.create-btn {
    background-color: #25a6d9 !important;
    width: 84px !important;
    height: 36px !important;
}
</style>