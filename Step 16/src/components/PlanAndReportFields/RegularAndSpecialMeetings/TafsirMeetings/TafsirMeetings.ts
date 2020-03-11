import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './tafsir-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class TafsirMeetings extends Vue {
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
            const tafsirMeetings = {
                tafsirMeetingProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(tafsirMeetings)
            localStorage.setItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData', JSON.stringify(tafsirMeetings))
          } else if(this.planOrReportTab === 'REPORT') {
            const tafsirMeetings = {
                tafsirMeetingProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(tafsirMeetings)
            localStorage.setItem('regularAndSpecialMeetings_tafsirMeetingProgramData', JSON.stringify(tafsirMeetings))
          }
          this.changeTab()
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[13] as HTMLElement
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
          if(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')!).tafsirMeetingProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')!).tafsirMeetingProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.tafsirMeetingProgramPlanData.target)
                    dateAndAction.push(res.tafsirMeetingProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')) {
            this.target = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.tafsirMeetingProgramData.target)
                    dateAndAction.push(res.tafsirMeetingProgramData.dateAndAction)
                    actual.push(res.tafsirMeetingProgramData.actual)
                    averageAttendance.push(res.tafsirMeetingProgramData.averageAttendance)
                    comment.push(res.tafsirMeetingProgramData.comment)
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