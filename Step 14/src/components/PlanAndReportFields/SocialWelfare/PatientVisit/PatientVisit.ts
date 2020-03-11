import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './patient-visit.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class PatientVisit extends Vue {
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
          const patientVisit = {
              patientVisitSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(patientVisit)
          localStorage.setItem('socialWelfare_patientVisitSocialWelfarePlanData', JSON.stringify(patientVisit))
        } else if(this.planOrReportTab === 'REPORT') {
          const patientVisit = {
              patientVisitSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(patientVisit)
          localStorage.setItem('socialWelfare_patientVisitSocialWelfareData', JSON.stringify(patientVisit))
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
        if(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).patientVisitSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).patientVisitSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.patientVisitSocialWelfarePlanData.target)
                  dateAndAction.push(res.patientVisitSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.patientVisitSocialWelfareData.target)
                  dateAndAction.push(res.patientVisitSocialWelfareData.dateAndAction)
                  actual.push(res.patientVisitSocialWelfareData.actual)
                  comment.push(res.patientVisitSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}