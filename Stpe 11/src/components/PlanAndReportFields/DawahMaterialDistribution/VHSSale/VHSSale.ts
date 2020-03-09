import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './vhs-sale.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class VHSSale extends Vue {
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
            const vhsSale = {
                vhsSaleMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(vhsSale)
            localStorage.setItem('dawahMaterialDistribution_vhsSaleMaterialPlanData', JSON.stringify(vhsSale))
          } else if(this.planOrReportTab === 'REPORT') {
            const vhsSale = {
                vhsSaleMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(vhsSale)
            localStorage.setItem('dawahMaterialDistribution_vhsSaleMaterialData', JSON.stringify(vhsSale))
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
          if(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')!).vhsSaleMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')!).vhsSaleMaterialPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.vhsSaleMaterialPlanData.target)
                    dateAndAction.push(res.vhsSaleMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.vhsSaleMaterialData.target)
                    dateAndAction.push(res.vhsSaleMaterialData.dateAndAction)
                    actual.push(res.vhsSaleMaterialData.actual)
                    comment.push(res.vhsSaleMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}