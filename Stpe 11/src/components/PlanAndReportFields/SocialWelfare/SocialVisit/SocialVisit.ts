import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './social-visit.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class SocialVisit extends Vue {
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
          const socialVisit = {
              socialVisitSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(socialVisit)
          localStorage.setItem('socialWelfare_socialVisitSocialWelfarePlanData', JSON.stringify(socialVisit))
        } else if(this.planOrReportTab === 'REPORT') {
          const socialVisit = {
              socialVisitSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(socialVisit)
          localStorage.setItem('socialWelfare_socialVisitSocialWelfareData', JSON.stringify(socialVisit))
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
        if(localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')!).socialVisitSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')!).socialVisitSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.socialVisitSocialWelfarePlanData.target)
                  dateAndAction.push(res.socialVisitSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.socialVisitSocialWelfareData.target)
                  dateAndAction.push(res.socialVisitSocialWelfareData.dateAndAction)
                  actual.push(res.socialVisitSocialWelfareData.actual)
                  comment.push(res.socialVisitSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}