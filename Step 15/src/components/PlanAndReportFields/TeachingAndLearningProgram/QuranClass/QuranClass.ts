import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './quran-class.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class QuranClass extends Vue {
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
            const quranClass = {
                quranClassTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(quranClass)
            localStorage.setItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData', JSON.stringify(quranClass))
          } else if(this.planOrReportTab === 'REPORT') {
            const quranClass = {
                quranClassTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(quranClass)
            localStorage.setItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData', JSON.stringify(quranClass))
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
          if(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')!).quranClassTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')!).quranClassTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.quranClassTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.quranClassTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.quranClassTeachingLearningProgramData.target)
                    dateAndAction.push(res.quranClassTeachingLearningProgramData.dateAndAction)
                    actual.push(res.quranClassTeachingLearningProgramData.actual)
                    averageAttendance.push(res.quranClassTeachingLearningProgramData.averageAttendance)
                    comment.push(res.quranClassTeachingLearningProgramData.comment)
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