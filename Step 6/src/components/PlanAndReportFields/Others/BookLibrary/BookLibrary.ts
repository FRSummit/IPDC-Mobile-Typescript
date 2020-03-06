import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-library.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class BookLibrary extends Vue {
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
        const bookLibrary = {
          bookLibraryPlanData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          },
        };
        console.log(bookLibrary)
        localStorage.setItem('others_bookLibraryPlanData', JSON.stringify(bookLibrary))
      } else if(this.planOrReportTab === 'REPORT') {
        const bookLibrary = {
            bookLibraryData: {
            lastPeriod: this.lastPeriod,
            thisPeriod: this.thisPeriod,
            increased: this.increased,
            decreased: this.decreased,
            comment: this.comment
          }
        };
        console.log(bookLibrary)
        localStorage.setItem('others_bookLibraryData', JSON.stringify(bookLibrary))
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
          // if(localStorage.getItem('others_bookLibraryPlanData')) {
          //   this.lastPeriod = JSON.parse(localStorage.getItem('others_bookLibraryPlanData')!).bookLibraryPlanData.lastPeriod
          //   this.thisPeriod = JSON.parse(localStorage.getItem('others_bookLibraryPlanData')!).bookLibraryPlanData.thisPeriod
          //   this.increased = JSON.parse(localStorage.getItem('others_bookLibraryPlanData')!).bookLibraryPlanData.increased
          //   this.decreased = JSON.parse(localStorage.getItem('others_bookLibraryPlanData')!).bookLibraryPlanData.decreased
          //   this.comment = JSON.parse(localStorage.getItem('others_bookLibraryPlanData')!).bookLibraryPlanData.comment
          // } else {
          //     unitPlanReportService
          //       .getPlan(unitReportId)
          //         .then(res => {
          //           lastPeriod.push(res.bookLibraryPlanData.lastPeriod)
          //           lastPeriod.push(res.bookL)
          //           thisPeriod.push(res.bookLibraryPlanData.thisPeriod)
          //           increased.push(res.bookLibraryPlanData.increased)
          //           decreased.push(res.bookLibraryPlanData.decreased)
          //           comment.push(res.bookLibraryPlanData.comment)
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
          if(localStorage.getItem('others_bookLibraryData')) {
            this.lastPeriod = JSON.parse(localStorage.getItem('others_bookLibraryData')!).bookLibraryStockData.lastPeriod
            this.thisPeriod = JSON.parse(localStorage.getItem('others_bookLibraryData')!).bookLibraryStockData.thisPeriod
            this.increased = JSON.parse(localStorage.getItem('others_bookLibraryData')!).bookLibraryStockData.increased
            this.decreased = JSON.parse(localStorage.getItem('others_bookLibraryData')!).bookLibraryStockData.decreased
            this.comment = JSON.parse(localStorage.getItem('others_bookLibraryData')!).bookLibraryStockData.comment
          } else {
              unitPlanReportService
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