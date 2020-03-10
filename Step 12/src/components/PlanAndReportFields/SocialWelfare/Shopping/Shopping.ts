import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './shopping.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class Shopping extends Vue {
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
          const shopping = {
              shoppingSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(shopping)
          localStorage.setItem('socialWelfare_shoppingSocialWelfarePlanData', JSON.stringify(shopping))
        } else if(this.planOrReportTab === 'REPORT') {
          const shopping = {
              shoppingSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(shopping)
          localStorage.setItem('socialWelfare_shoppingSocialWelfareData', JSON.stringify(shopping))
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
        if(localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')!).shoppingSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')!).shoppingSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.shoppingSocialWelfarePlanData.target)
                  dateAndAction.push(res.shoppingSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.shoppingSocialWelfareData.target)
                  dateAndAction.push(res.shoppingSocialWelfareData.dateAndAction)
                  actual.push(res.shoppingSocialWelfareData.actual)
                  comment.push(res.shoppingSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}