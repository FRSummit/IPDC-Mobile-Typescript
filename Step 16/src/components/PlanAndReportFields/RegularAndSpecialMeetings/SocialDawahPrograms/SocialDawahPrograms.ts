import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './social-dawah-programs.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class SocialDawahPrograms extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    averageAttendance !: null
    comment !: null
    unitPlanReportService = new UnitPlanReportService();

    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            averageAttendance: null, 
            comment: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        if(this.planOrReportTab === 'PLAN') {
            const socialDawahPrograms = {
                socialDawahMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(socialDawahPrograms)
            localStorage.setItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData', JSON.stringify(socialDawahPrograms))
          } else if(this.planOrReportTab === 'REPORT') {
            const socialDawahPrograms = {
                socialDawahMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(socialDawahPrograms)
            localStorage.setItem('regularAndSpecialMeetings_socialDawahMeetingProgramData', JSON.stringify(socialDawahPrograms))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[10] as HTMLElement
      tab.click()
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          let target: any = []
          let dateAndAction: any = []
          if(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')!).socialDawahMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')!).socialDawahMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.socialDawahMeetingProgramPlanData.target)
                    dateAndAction.push(res.socialDawahMeetingProgramPlanData.dateAndAction)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let target: any = []
          let dateAndAction: any = []
          let actual: any = []
          let averageAttendance: any = []
          let comment: any = []
          if(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.socialDawahMeetingProgramData.target)
                    dateAndAction.push(res.socialDawahMeetingProgramData.dateAndAction)
                    actual.push(res.socialDawahMeetingProgramData.actual)
                    averageAttendance.push(res.socialDawahMeetingProgramData.averageAttendance)
                    comment.push(res.socialDawahMeetingProgramData.comment)
                  })
                  this.target = target
                  this.dateAndAction = dateAndAction
                  this.actual = actual
                  this.averageAttendance = averageAttendance
                  this.comment = comment
          }
        }
    }
}