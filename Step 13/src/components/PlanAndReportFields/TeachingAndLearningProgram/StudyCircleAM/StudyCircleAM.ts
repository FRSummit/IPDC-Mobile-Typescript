import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './study-circle-am.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StudyCircleAM extends Vue {
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
            comment: null
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        if(this.planOrReportTab === 'PLAN') {
            const studyCircleAM = {
                studyCircleForAssociateMemberTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(studyCircleAM)
            localStorage.setItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData', JSON.stringify(studyCircleAM))
          } else if(this.planOrReportTab === 'REPORT') {
            const studyCircleAM = {
                studyCircleForAssociateMemberTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(studyCircleAM)
            localStorage.setItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData', JSON.stringify(studyCircleAM))
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
          if(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')!).studyCircleForAssociateMemberTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')!).studyCircleForAssociateMemberTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.studyCircleForAssociateMemberTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.studyCircleForAssociateMemberTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.studyCircleForAssociateMemberTeachingLearningProgramData.target)
                    dateAndAction.push(res.studyCircleForAssociateMemberTeachingLearningProgramData.dateAndAction)
                    actual.push(res.studyCircleForAssociateMemberTeachingLearningProgramData.actual)
                    averageAttendance.push(res.studyCircleForAssociateMemberTeachingLearningProgramData.averageAttendance)
                    comment.push(res.studyCircleForAssociateMemberTeachingLearningProgramData.comment)
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