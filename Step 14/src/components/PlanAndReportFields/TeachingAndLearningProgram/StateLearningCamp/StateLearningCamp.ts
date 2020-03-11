import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './state-learning-camp.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StateLearningCamp extends Vue {
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
            const stateLearningCamp = {
                stateLearningCampTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(stateLearningCamp)
            localStorage.setItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData', JSON.stringify(stateLearningCamp))
          } else if(this.planOrReportTab === 'REPORT') {
            const stateLearningCamp = {
                stateLearningCampTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(stateLearningCamp)
            localStorage.setItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData', JSON.stringify(stateLearningCamp))
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
          if(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')!).stateLearningCampTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')!).stateLearningCampTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.stateLearningCampTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.stateLearningCampTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.stateLearningCampTeachingLearningProgramData.target)
                    dateAndAction.push(res.stateLearningCampTeachingLearningProgramData.dateAndAction)
                    actual.push(res.stateLearningCampTeachingLearningProgramData.actual)
                    averageAttendance.push(res.stateLearningCampTeachingLearningProgramData.averageAttendance)
                    comment.push(res.stateLearningCampTeachingLearningProgramData.comment)
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