import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './state-learning-session.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StateLearningSession extends Vue {
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
            const stateLearningSession = {
                stateLearningSessionTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(stateLearningSession)
            localStorage.setItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData', JSON.stringify(stateLearningSession))
          } else if(this.planOrReportTab === 'REPORT') {
            const stateLearningSession = {
                stateLearningSessionTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(stateLearningSession)
            localStorage.setItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData', JSON.stringify(stateLearningSession))
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
          if(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')!).stateLearningSessionTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')!).stateLearningSessionTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.stateLearningSessionTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.stateLearningSessionTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.stateLearningSessionTeachingLearningProgramData.target)
                    dateAndAction.push(res.stateLearningSessionTeachingLearningProgramData.dateAndAction)
                    actual.push(res.stateLearningSessionTeachingLearningProgramData.actual)
                    averageAttendance.push(res.stateLearningSessionTeachingLearningProgramData.averageAttendance)
                    comment.push(res.stateLearningSessionTeachingLearningProgramData.comment)
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