import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class Other extends Vue {
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
          const other = {
              otherSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(other)
          localStorage.setItem('socialWelfare_otherSocialWelfarePlanData', JSON.stringify(other))
        } else if(this.planOrReportTab === 'REPORT') {
          const other = {
              otherSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(other)
          localStorage.setItem('socialWelfare_otherSocialWelfareData', JSON.stringify(other))
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
        if(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).otherSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).otherSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.otherSocialWelfarePlanData.target)
                  dateAndAction.push(res.otherSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_otherSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.otherSocialWelfareData.target)
                  dateAndAction.push(res.otherSocialWelfareData.dateAndAction)
                  actual.push(res.otherSocialWelfareData.actual)
                  comment.push(res.otherSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}