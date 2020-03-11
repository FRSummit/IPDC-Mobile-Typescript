import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class BookLibrary extends Vue {
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
        const bookLibrary = {
            bookLibraryStockPlanData: {
                
            },
        };
        console.log(bookLibrary)
        localStorage.setItem('others_bookLibraryStockPlanData', JSON.stringify(bookLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const bookLibrary = {
          bookLibraryStockData: {
              lastPeriod: this.lastPeriod,
              thisPeriod: this.thisPeriod,
              increased: this.increased,
              decreased: this.decreased,
              comment: this.comment,
            }
        };
        console.log(bookLibrary)
        localStorage.setItem('others_bookLibraryStockData', JSON.stringify(bookLibrary))
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
        if(localStorage.getItem('others_bookLibraryStockData')) {
          this.lastPeriod = JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).bookLibraryStockData.lastPeriod
          this.thisPeriod = JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).bookLibraryStockData.thisPeriod
          this.increased = JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).bookLibraryStockData.increased
          this.decreased = JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).bookLibraryStockData.decreased
          this.comment = JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).bookLibraryStockData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  lastPeriod.push(res.bookLibraryStockData.lastPeriod)
                  thisPeriod.push(res.bookLibraryStockData.thisPeriod)
                  increased.push(res.bookLibraryStockData.increased)
                  decreased.push(res.bookLibraryStockData.decreased)
                  comment.push(res.bookLibraryStockData.comment)
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