import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './vhs-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class VHSDistribution extends Vue {
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
            const vhsDistribution = {
                vhsDistributionMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(vhsDistribution)
            localStorage.setItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData', JSON.stringify(vhsDistribution))
          } else if(this.planOrReportTab === 'REPORT') {
            const vhsDistribution = {
                vhsDistributionMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(vhsDistribution)
            localStorage.setItem('dawahMaterialDistribution_vhsDistributionMaterialData', JSON.stringify(vhsDistribution))
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
          if(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')!).vhsDistributionMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')!).vhsDistributionMaterialPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.vhsDistributionMaterialPlanData.target)
                    dateAndAction.push(res.vhsDistributionMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.vhsDistributionMaterialData.target)
                    dateAndAction.push(res.vhsDistributionMaterialData.dateAndAction)
                    actual.push(res.vhsDistributionMaterialData.actual)
                    comment.push(res.vhsDistributionMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}