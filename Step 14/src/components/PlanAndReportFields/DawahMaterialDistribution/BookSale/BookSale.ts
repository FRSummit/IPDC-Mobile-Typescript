import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-sale.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class BookSale extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null
    unitPlanReportService = new UnitPlanReportService();

    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        if(this.planOrReportTab === 'PLAN') {
            const bookSale = {
                bookSaleMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(bookSale)
            localStorage.setItem('dawahMaterialDistribution_bookSaleMaterialPlanData', JSON.stringify(bookSale))
          } else if(this.planOrReportTab === 'REPORT') {
            const bookSale = {
                bookSaleMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(bookSale)
            localStorage.setItem('dawahMaterialDistribution_bookSaleMaterialData', JSON.stringify(bookSale))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      tab.click()
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          let target: any = []
          let dateAndAction: any = []
          if(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')!).bookSaleMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')!).bookSaleMaterialPlanData.dateAndAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.bookSaleMaterialPlanData.target)
                    dateAndAction.push(res.bookSaleMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.bookSaleMaterialData.target)
                    dateAndAction.push(res.bookSaleMaterialData.dateAndAction)
                    actual.push(res.bookSaleMaterialData.actual)
                    comment.push(res.bookSaleMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}