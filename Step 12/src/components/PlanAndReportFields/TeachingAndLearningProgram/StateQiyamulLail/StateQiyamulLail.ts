import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './state-qiyamul-lail.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class StateQiyamulLail extends Vue {
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
            const stateQiyamulLail = {
                stateQiyamulLailTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(stateQiyamulLail)
            localStorage.setItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData', JSON.stringify(stateQiyamulLail))
          } else if(this.planOrReportTab === 'REPORT') {
            const stateQiyamulLail = {
                stateQiyamulLailTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(stateQiyamulLail)
            localStorage.setItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData', JSON.stringify(stateQiyamulLail))
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
          if(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')!).stateQiyamulLailTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')!).stateQiyamulLailTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.stateQiyamulLailTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.stateQiyamulLailTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.stateQiyamulLailTeachingLearningProgramData.target)
                    dateAndAction.push(res.stateQiyamulLailTeachingLearningProgramData.dateAndAction)
                    actual.push(res.stateQiyamulLailTeachingLearningProgramData.actual)
                    averageAttendance.push(res.stateQiyamulLailTeachingLearningProgramData.averageAttendance)
                    comment.push(res.stateQiyamulLailTeachingLearningProgramData.comment)
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