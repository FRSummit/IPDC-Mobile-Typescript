import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './practice-dars-speech.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class PracticeDarsSpeech extends Vue {
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
            const practiceDarsSpeech = {
                practiceDarsTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(practiceDarsSpeech)
            localStorage.setItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData', JSON.stringify(practiceDarsSpeech))
          } else if(this.planOrReportTab === 'REPORT') {
            const practiceDarsSpeech = {
                practiceDarsTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(practiceDarsSpeech)
            localStorage.setItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData', JSON.stringify(practiceDarsSpeech))
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
          if(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.practiceDarsTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.practiceDarsTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.practiceDarsTeachingLearningProgramData.target)
                    dateAndAction.push(res.practiceDarsTeachingLearningProgramData.dateAndAction)
                    actual.push(res.practiceDarsTeachingLearningProgramData.actual)
                    averageAttendance.push(res.practiceDarsTeachingLearningProgramData.averageAttendance)
                    comment.push(res.practiceDarsTeachingLearningProgramData.comment)
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