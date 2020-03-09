import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class BookDistribution extends Vue {
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
            const bookDistribution = {
                bookDistributionMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(bookDistribution)
            localStorage.setItem('dawahMaterialDistribution_bookDistributionMaterialPlanData', JSON.stringify(bookDistribution))
          } else if(this.planOrReportTab === 'REPORT') {
            const bookDistribution = {
                bookDistributionMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(bookDistribution)
            localStorage.setItem('dawahMaterialDistribution_bookDistributionMaterialData', JSON.stringify(bookDistribution))
          }
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          let target: any = []
          let dateAndAction: any = []
          if(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).bookDistributionMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).bookDistributionMaterialPlanData.dateAndAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.bookDistributionMaterialPlanData.target)
                    dateAndAction.push(res.bookDistributionMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.bookDistributionMaterialData.target)
                    dateAndAction.push(res.bookDistributionMaterialData.dateAndAction)
                    actual.push(res.bookDistributionMaterialData.actual)
                    comment.push(res.bookDistributionMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}