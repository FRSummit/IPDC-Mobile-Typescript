import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class OtherLibrary extends Vue {
    planOrReportTab !: null
    lastPeriod !: null
    thisPeriod !: null
    increased !: null
    decreased !: null
    comment !: null
    unitPlanReportService = new UnitPlanReportService();
    
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
            otherLibraryStockPlanData: {
                
            },
        };
        console.log(otherLibrary)
        localStorage.setItem('others_otherLibraryStockPlanData', JSON.stringify(otherLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const otherLibrary = {
          otherLibraryStockData: {
              lastPeriod: this.lastPeriod,
              thisPeriod: this.thisPeriod,
              increased: this.increased,
              decreased: this.decreased,
              comment: this.comment,
            }
        };
        console.log(otherLibrary)
        localStorage.setItem('others_otherLibraryStockData', JSON.stringify(otherLibrary))
      }
    }
    created() {
      const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      console.log(tabActivationForPlanOrReport)
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        console.log('no data')
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let lastPeriod: any = []
        let thisPeriod: any = []
        let increased: any = []
        let decreased: any = []
        let comment: any = []
        if(localStorage.getItem('others_otherLibraryStockData')) {
          this.lastPeriod = JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).otherLibraryStockData.lastPeriod
          this.thisPeriod = JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).otherLibraryStockData.thisPeriod
          this.increased = JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).otherLibraryStockData.increased
          this.decreased = JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).otherLibraryStockData.decreased
          this.comment = JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).otherLibraryStockData.comment
        } else {
          this.unitPlanReportService
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