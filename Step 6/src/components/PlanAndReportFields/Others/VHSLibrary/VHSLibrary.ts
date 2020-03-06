import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './vhs-library.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class VHSLibrary extends Vue {
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
        const vhsLibrary = {
          vhsLibraryPlanData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          },
        };
        console.log(vhsLibrary)
        localStorage.setItem('others_bookLibraryPlanData', JSON.stringify(vhsLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const vhsLibrary = {
            vhsLibraryData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          }
        };
        console.log(vhsLibrary)
        localStorage.setItem('others_bookLibraryData', JSON.stringify(vhsLibrary))
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
          // if(localStorage.getItem('others_vhsLibraryPlanData')) {
          //   this.lastPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryPlanData')!).vhsLibraryPlanData.lastPeriod
          //   this.thisPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryPlanData')!).vhsLibraryPlanData.thisPeriod
          //   this.increased = JSON.parse(localStorage.getItem('others_vhsLibraryPlanData')!).vhsLibraryPlanData.increased
          //   this.decreased = JSON.parse(localStorage.getItem('others_vhsLibraryPlanData')!).vhsLibraryPlanData.decreased
          //   this.comment = JSON.parse(localStorage.getItem('others_vhsLibraryPlanData')!).vhsLibraryPlanData.comment
          // } else {
          //     unitPlanReportService
          //       .getPlan(unitReportId)
          //         .then(res => {
          //           lastPeriod.push(res.vhsLibraryPlanData.lastPeriod)
          //           thisPeriod.push(res.vhsLibraryPlanData.thisPeriod)
          //           increased.push(res.vhsLibraryPlanData.increased)
          //           decreased.push(res.vhsLibraryPlanData.decreased)
          //           comment.push(res.vhsLibraryPlanData.comment)
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
          if(localStorage.getItem('others_vhsLibraryData')) {
            this.lastPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryData')!).vhsLibraryStockData.lastPeriod
            this.thisPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryData')!).vhsLibraryStockData.thisPeriod
            this.increased = JSON.parse(localStorage.getItem('others_vhsLibraryData')!).vhsLibraryStockData.increased
            this.decreased = JSON.parse(localStorage.getItem('others_vhsLibraryData')!).vhsLibraryStockData.decreased
            this.comment = JSON.parse(localStorage.getItem('others_vhsLibraryData')!).vhsLibraryStockData.comment
          } else {
              unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    lastPeriod.push(res.vhsLibraryStockData.lastPeriod)
                    thisPeriod.push(res.vhsLibraryStockData.thisPeriod)
                    increased.push(res.vhsLibraryStockData.increased)
                    decreased.push(res.vhsLibraryStockData.decreased)
                    comment.push(res.vhsLibraryStockData.comment)
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