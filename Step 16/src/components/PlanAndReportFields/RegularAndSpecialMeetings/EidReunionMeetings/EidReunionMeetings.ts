import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './eid-reunion-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class EidReunionMeetings extends Vue {
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
            const eidReunionMeetings = {
                eidReunionMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(eidReunionMeetings)
            localStorage.setItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData', JSON.stringify(eidReunionMeetings))
          } else if(this.planOrReportTab === 'REPORT') {
            const eidReunionMeetings = {
                eidReunionMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(eidReunionMeetings)
            localStorage.setItem('regularAndSpecialMeetings_eidReunionMeetingProgramData', JSON.stringify(eidReunionMeetings))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[18] as HTMLElement
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
          if(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')!).eidReunionMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')!).eidReunionMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.eidReunionMeetingProgramPlanData.target)
                    dateAndAction.push(res.eidReunionMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.eidReunionMeetingProgramData.target)
                    dateAndAction.push(res.eidReunionMeetingProgramData.dateAndAction)
                    actual.push(res.eidReunionMeetingProgramData.actual)
                    averageAttendance.push(res.eidReunionMeetingProgramData.averageAttendance)
                    comment.push(res.eidReunionMeetingProgramData.comment)
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