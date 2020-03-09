import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './dawah-groups.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class DawahGroups extends Vue {
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
            const dawahGroups = {
                dawahGroupMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(dawahGroups)
            localStorage.setItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData', JSON.stringify(dawahGroups))
          } else if(this.planOrReportTab === 'REPORT') {
            const dawahGroups = {
                dawahGroupMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(dawahGroups)
            localStorage.setItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData', JSON.stringify(dawahGroups))
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
          if(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')!).dawahGroupMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')!).dawahGroupMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.dawahGroupMeetingProgramPlanData.target)
                    dateAndAction.push(res.dawahGroupMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.dawahGroupMeetingProgramData.target)
                    dateAndAction.push(res.dawahGroupMeetingProgramData.dateAndAction)
                    actual.push(res.dawahGroupMeetingProgramData.actual)
                    averageAttendance.push(res.dawahGroupMeetingProgramData.averageAttendance)
                    comment.push(res.dawahGroupMeetingProgramData.comment)
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