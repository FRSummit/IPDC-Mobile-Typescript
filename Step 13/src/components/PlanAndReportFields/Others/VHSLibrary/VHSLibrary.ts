import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './vhs-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class VHSLibrary extends Vue {
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
        const vhsLibrary = {
            vhsLibraryStockPlanData: {
                
            },
        };
        console.log(vhsLibrary)
        localStorage.setItem('others_vhsLibraryStockPlanData', JSON.stringify(vhsLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const vhsLibrary = {
          vhsLibraryStockData: {
              lastPeriod: this.lastPeriod,
              thisPeriod: this.thisPeriod,
              increased: this.increased,
              decreased: this.decreased,
              comment: this.comment,
            }
        };
        console.log(vhsLibrary)
        localStorage.setItem('others_vhsLibraryStockData', JSON.stringify(vhsLibrary))
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
        if(localStorage.getItem('others_vhsLibraryStockData')) {
          this.lastPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).vhsLibraryStockData.lastPeriod
          this.thisPeriod = JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).vhsLibraryStockData.thisPeriod
          this.increased = JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).vhsLibraryStockData.increased
          this.decreased = JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).vhsLibraryStockData.decreased
          this.comment = JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).vhsLibraryStockData.comment
        } else {
            this.unitPlanReportService
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