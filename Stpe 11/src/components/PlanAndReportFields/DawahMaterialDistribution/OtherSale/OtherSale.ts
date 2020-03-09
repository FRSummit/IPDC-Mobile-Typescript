import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-sale.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class OtherSale extends Vue {
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
            const otherSale = {
                otherSaleMaterialPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(otherSale)
            localStorage.setItem('dawahMaterialDistribution_otherSaleMaterialPlanData', JSON.stringify(otherSale))
          } else if(this.planOrReportTab === 'REPORT') {
            const otherSale = {
                otherSaleMaterialData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    comment: this.comment
                }
            };
            console.log(otherSale)
            localStorage.setItem('dawahMaterialDistribution_otherSaleMaterialData', JSON.stringify(otherSale))
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
          if(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).otherSaleMaterialPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).otherSaleMaterialPlanData.dateAndAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.otherSaleMaterialPlanData.target)
                    dateAndAction.push(res.otherSaleMaterialPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let comment: any = []
          if(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')) {
            this.target = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.actual
            this.comment = JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.otherSaleMaterialData.target)
                    dateAndAction.push(res.otherSaleMaterialData.dateAndAction)
                    actual.push(res.otherSaleMaterialData.actual)
                    comment.push(res.otherSaleMaterialData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.comment = comment
          }
        }
    }
}