import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './shifting.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class Shifting extends Vue {
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
          const shifting = {
              shiftingSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(shifting)
          localStorage.setItem('socialWelfare_shiftingSocialWelfarePlanData', JSON.stringify(shifting))
        } else if(this.planOrReportTab === 'REPORT') {
          const shifting = {
              shiftingSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(shifting)
          localStorage.setItem('socialWelfare_shiftingSocialWelfareData', JSON.stringify(shifting))
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
        if(localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')!).shiftingSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')!).shiftingSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.shiftingSocialWelfarePlanData.target)
                  dateAndAction.push(res.shiftingSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.shiftingSocialWelfareData.target)
                  dateAndAction.push(res.shiftingSocialWelfareData.dateAndAction)
                  actual.push(res.shiftingSocialWelfareData.actual)
                  comment.push(res.shiftingSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}