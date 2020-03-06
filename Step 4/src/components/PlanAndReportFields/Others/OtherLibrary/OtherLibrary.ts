import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-library.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class OtherLibrary extends Vue {
    planOrReportTab !: null
    lastPeriod !: null
    thisPeriod !: null
    increased !: null
    decreased !: null
    comment !: null
    
    data() {
        return {
            planOrReportTab: null,
            lastPeriod: null,
            thisPeriod: null,
            increased: null,
            decreased: null,
            comment: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        const otherLibrary = {
          otherLibraryPlanData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          },
        };
        console.log(otherLibrary)
        localStorage.setItem('others_otherLibraryPlanData', JSON.stringify(otherLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const otherLibrary = {
            otherLibraryData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          }
        };
        console.log(otherLibrary)
        localStorage.setItem('others_otherLibraryData', JSON.stringify(otherLibrary))
      }
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          // let lastPeriod: any = []
          // let thisPeriod: any = []
          // let increased: any = []
          // let decreased: any = []
          // let comment: any = []
          // if(localStorage.getItem('others_otherLibraryPlanData')) {
          //   this.lastPeriod = JSON.parse(localStorage.getItem('others_otherLibraryPlanData')!).otherLibraryPlanData.lastPeriod
          //   this.thisPeriod = JSON.parse(localStorage.getItem('others_otherLibraryPlanData')!).otherLibraryPlanData.thisPeriod
          //   this.increased = JSON.parse(localStorage.getItem('others_otherLibraryPlanData')!).otherLibraryPlanData.increased
          //   this.decreased = JSON.parse(localStorage.getItem('others_otherLibraryPlanData')!).otherLibraryPlanData.decreased
          //   this.comment = JSON.parse(localStorage.getItem('others_otherLibraryPlanData')!).otherLibraryPlanData.comment
          // } else {
          //     unitPlanReportService
          //       .getPlan(unitReportId)
          //         .then(res => {
          //           lastPeriod.push(res.otherLibraryPlanData.lastPeriod)
          //           thisPeriod.push(res.otherLibraryPlanData.thisPeriod)
          //           increased.push(res.otherLibraryPlanData.increased)
          //           decreased.push(res.otherLibraryPlanData.decreased)
          //           comment.push(res.otherLibraryPlanData.comment)
          //         })
          //         this.lastPeriod = lastPeriod
          //         this.thisPeriod = thisPeriod
          //         this.increased = increased
          //         this.decreased = decreased
          //         this.comment = comment
          // }
          console.log('no data')
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let lastPeriod: any = []
          let thisPeriod: any = []
          let increased: any = []
          let decreased: any = []
          let comment: any = []
          if(localStorage.getItem('others_otherLibraryData')) {
            this.lastPeriod = JSON.parse(localStorage.getItem('others_otherLibraryData')!).otherLibraryStockData.lastPeriod
            this.thisPeriod = JSON.parse(localStorage.getItem('others_otherLibraryData')!).otherLibraryStockData.thisPeriod
            this.increased = JSON.parse(localStorage.getItem('others_otherLibraryData')!).otherLibraryStockData.increased
            this.decreased = JSON.parse(localStorage.getItem('others_otherLibraryData')!).otherLibraryStockData.decreased
            this.comment = JSON.parse(localStorage.getItem('others_otherLibraryData')!).otherLibraryStockData.comment
          } else {
              unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    lastPeriod.push(res.otherLibraryStockData.lastPeriod)
                    thisPeriod.push(res.otherLibraryStockData.thisPeriod)
                    increased.push(res.otherLibraryStockData.increased)
                    decreased.push(res.otherLibraryStockData.decreased)
                    comment.push(res.otherLibraryStockData.comment)
                  })
                  this.lastPeriod = lastPeriod
                  this.thisPeriod = thisPeriod
                  this.increased = increased
                  this.decreased = decreased
                  this.comment = comment
          }
        }
    }
}