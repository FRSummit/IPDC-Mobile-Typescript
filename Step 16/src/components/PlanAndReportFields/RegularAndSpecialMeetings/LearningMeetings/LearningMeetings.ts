import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './learning-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class LearningMeetings extends Vue {
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
            const learningMeetings = {
                learningMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(learningMeetings)
            localStorage.setItem('regularAndSpecialMeetings_learningMeetingProgramPlanData', JSON.stringify(learningMeetings))
          } else if(this.planOrReportTab === 'REPORT') {
            const learningMeetings = {
                learningMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(learningMeetings)
            localStorage.setItem('regularAndSpecialMeetings_learningMeetingProgramData', JSON.stringify(learningMeetings))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[9] as HTMLElement
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
          if(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')!).learningMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')!).learningMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.learningMeetingProgramPlanData.target)
                    dateAndAction.push(res.learningMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.learningMeetingProgramData.target)
                    dateAndAction.push(res.learningMeetingProgramData.dateAndAction)
                    actual.push(res.learningMeetingProgramData.actual)
                    averageAttendance.push(res.learningMeetingProgramData.averageAttendance)
                    comment.push(res.learningMeetingProgramData.comment)
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