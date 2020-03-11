import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './transport.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class Transport extends Vue {
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
          const transport = {
              transportSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(transport)
          localStorage.setItem('socialWelfare_transportSocialWelfarePlanData', JSON.stringify(transport))
        } else if(this.planOrReportTab === 'REPORT') {
          const transport = {
              transportSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(transport)
          localStorage.setItem('socialWelfare_transportSocialWelfareData', JSON.stringify(transport))
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
        if(localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')!).transportSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')!).transportSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.transportSocialWelfarePlanData.target)
                  dateAndAction.push(res.transportSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_transportSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.transportSocialWelfareData.target)
                  dateAndAction.push(res.transportSocialWelfareData.dateAndAction)
                  actual.push(res.transportSocialWelfareData.actual)
                  comment.push(res.transportSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}