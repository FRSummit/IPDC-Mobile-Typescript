import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './email-distribution.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class EmailDistribution extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null

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
            const emailDistribution = {
                emailDistributionMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(emailDistribution)
            localStorage.setItem('dawahMaterialDistribution_emailDistributionMaterialPlanData', JSON.stringify(emailDistribution))
          } else if(this.planOrReportTab === 'REPORT') {
            const emailDistribution = {
                emailDistributionMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(emailDistribution)
            localStorage.setItem('dawahMaterialDistribution_emailDistributionMaterialData', JSON.stringify(emailDistribution))
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
          if(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')!).emailDistributionMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')!).emailDistributionMaterialPlanData.dateAndAction
          } else {
              unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.emailDistributionMaterialPlanData.target)
                    dateAndAction.push(res.emailDistributionMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.comment
          } else {
              unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.emailDistributionMaterialData.target)
                    dateAndAction.push(res.emailDistributionMaterialData.dateAndAction)
                    actual.push(res.emailDistributionMaterialData.actual)
                    comment.push(res.emailDistributionMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}