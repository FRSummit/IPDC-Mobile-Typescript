import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './clean-up-australia.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class CleanUpAustralia extends Vue {
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
          const cleanUpAustralia = {
              cleanUpAustraliaSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(cleanUpAustralia)
          localStorage.setItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData', JSON.stringify(cleanUpAustralia))
        } else if(this.planOrReportTab === 'REPORT') {
          const cleanUpAustralia = {
              cleanUpAustraliaSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(cleanUpAustralia)
          localStorage.setItem('socialWelfare_cleanUpAustraliaSocialWelfareData', JSON.stringify(cleanUpAustralia))
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
        if(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')!).cleanUpAustraliaSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')!).cleanUpAustraliaSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.cleanUpAustraliaSocialWelfarePlanData.target)
                  dateAndAction.push(res.cleanUpAustraliaSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.cleanUpAustraliaSocialWelfareData.target)
                  dateAndAction.push(res.cleanUpAustraliaSocialWelfareData.dateAndAction)
                  actual.push(res.cleanUpAustraliaSocialWelfareData.actual)
                  comment.push(res.cleanUpAustraliaSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}