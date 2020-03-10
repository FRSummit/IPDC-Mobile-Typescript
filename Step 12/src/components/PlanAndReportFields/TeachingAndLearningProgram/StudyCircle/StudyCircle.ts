import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './study-circle.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StudyCircle extends Vue {
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
            const studyCircle = {
                studyCircleTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(studyCircle)
            localStorage.setItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData', JSON.stringify(studyCircle))
          } else if(this.planOrReportTab === 'REPORT') {
            const studyCircle = {
                studyCircleTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(studyCircle)
            localStorage.setItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData', JSON.stringify(studyCircle))
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
          if(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')!).studyCircleTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')!).studyCircleTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.studyCircleTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.studyCircleTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.studyCircleTeachingLearningProgramData.target)
                    dateAndAction.push(res.studyCircleTeachingLearningProgramData.dateAndAction)
                    actual.push(res.studyCircleTeachingLearningProgramData.actual)
                    averageAttendance.push(res.studyCircleTeachingLearningProgramData.averageAttendance)
                    comment.push(res.studyCircleTeachingLearningProgramData.comment)
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