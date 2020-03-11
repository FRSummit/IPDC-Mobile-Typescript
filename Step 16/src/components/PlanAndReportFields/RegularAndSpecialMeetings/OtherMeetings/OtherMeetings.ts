import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class OtherMeetings extends Vue {
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
            const otherMeetings = {
                otherMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(otherMeetings)
            localStorage.setItem('regularAndSpecialMeetings_otherMeetingProgramPlanData', JSON.stringify(otherMeetings))
          } else if(this.planOrReportTab === 'REPORT') {
            const otherMeetings = {
                otherMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(otherMeetings)
            localStorage.setItem('regularAndSpecialMeetings_otherMeetingProgramData', JSON.stringify(otherMeetings))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[19] as HTMLElement
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
          if(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).otherMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).otherMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.otherMeetingProgramPlanData.target)
                    dateAndAction.push(res.otherMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.otherMeetingProgramData.target)
                    dateAndAction.push(res.otherMeetingProgramData.dateAndAction)
                    actual.push(res.otherMeetingProgramData.actual)
                    averageAttendance.push(res.otherMeetingProgramData.averageAttendance)
                    comment.push(res.otherMeetingProgramData.comment)
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