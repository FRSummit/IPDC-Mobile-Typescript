import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class OtherDistribution extends Vue {
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
            const otherDistribution = {
                otherDistributionMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(otherDistribution)
            localStorage.setItem('dawahMaterialDistribution_otherDistributionMaterialPlanData', JSON.stringify(otherDistribution))
          } else if(this.planOrReportTab === 'REPORT') {
            const otherDistribution = {
                otherDistributionMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(otherDistribution)
            localStorage.setItem('dawahMaterialDistribution_otherDistributionMaterialData', JSON.stringify(otherDistribution))
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
          if(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).otherDistributionMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).otherDistributionMaterialPlanData.dateAndAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.otherDistributionMaterialPlanData.target)
                    dateAndAction.push(res.otherDistributionMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.otherDistributionMaterialData.target)
                    dateAndAction.push(res.otherDistributionMaterialData.dateAndAction)
                    actual.push(res.otherDistributionMaterialData.actual)
                    comment.push(res.otherDistributionMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}