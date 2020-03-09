import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './qard-e-hasana.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class QardEHasana extends Vue {
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
          const qardEHasana = {
              qardeHasanaSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(qardEHasana)
          localStorage.setItem('socialWelfare_qardeHasanaSocialWelfarePlanData', JSON.stringify(qardEHasana))
        } else if(this.planOrReportTab === 'REPORT') {
          const qardEHasana = {
              qardeHasanaSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(qardEHasana)
          localStorage.setItem('socialWelfare_qardeHasanaSocialWelfareData', JSON.stringify(qardEHasana))
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
        if(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')!).qardeHasanaSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')!).qardeHasanaSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.qardeHasanaSocialWelfarePlanData.target)
                  dateAndAction.push(res.qardeHasanaSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.qardeHasanaSocialWelfareData.target)
                  dateAndAction.push(res.qardeHasanaSocialWelfareData.dateAndAction)
                  actual.push(res.qardeHasanaSocialWelfareData.actual)
                  comment.push(res.qardeHasanaSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}