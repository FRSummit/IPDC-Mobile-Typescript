import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './state-leader-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StateLeaderMeetings extends Vue {
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
            const stateLeaderMeetings = {
                stateLeaderMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(stateLeaderMeetings)
            localStorage.setItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData', JSON.stringify(stateLeaderMeetings))
          } else if(this.planOrReportTab === 'REPORT') {
            const stateLeaderMeetings = {
                stateLeaderMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(stateLeaderMeetings)
            localStorage.setItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData', JSON.stringify(stateLeaderMeetings))
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
          if(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')!).stateLeaderMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')!).stateLeaderMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.stateLeaderMeetingProgramPlanData.target)
                    dateAndAction.push(res.stateLeaderMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.stateLeaderMeetingProgramData.target)
                    dateAndAction.push(res.stateLeaderMeetingProgramData.dateAndAction)
                    actual.push(res.stateLeaderMeetingProgramData.actual)
                    averageAttendance.push(res.stateLeaderMeetingProgramData.averageAttendance)
                    comment.push(res.stateLeaderMeetingProgramData.comment)
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