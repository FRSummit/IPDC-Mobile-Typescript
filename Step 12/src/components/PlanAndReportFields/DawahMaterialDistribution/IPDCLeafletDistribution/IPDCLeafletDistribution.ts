import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './ipdc-leaflet-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class IPDCLeafletDistribution extends Vue {
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
            const ipdcLeafletDistribution = {
                ipdcLeafletDistributionMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(ipdcLeafletDistribution)
            localStorage.setItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData', JSON.stringify(ipdcLeafletDistribution))
          } else if(this.planOrReportTab === 'REPORT') {
            const ipdcLeafletDistribution = {
                ipdcLeafletDistributionMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(ipdcLeafletDistribution)
            localStorage.setItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData', JSON.stringify(ipdcLeafletDistribution))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[6] as HTMLElement
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
          if(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')!).ipdcLeafletDistributionMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')!).ipdcLeafletDistributionMaterialPlanData.dateAndAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.ipdcLeafletDistributionMaterialPlanData.target)
                    dateAndAction.push(res.ipdcLeafletDistributionMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.ipdcLeafletDistributionMaterialData.target)
                    dateAndAction.push(res.ipdcLeafletDistributionMaterialData.dateAndAction)
                    actual.push(res.ipdcLeafletDistributionMaterialData.actual)
                    comment.push(res.ipdcLeafletDistributionMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}