import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './hadith-study.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class HadithStudy extends Vue {
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
            const hadithStudy = {
                hadithTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(hadithStudy)
            localStorage.setItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData', JSON.stringify(hadithStudy))
          } else if(this.planOrReportTab === 'REPORT') {
            const hadithStudy = {
                hadithTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(hadithStudy)
            localStorage.setItem('teachingAndLearningProgram_hadithTeachingLearningProgramData', JSON.stringify(hadithStudy))
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
          if(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')!).hadithTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')!).hadithTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.hadithTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.hadithTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.hadithTeachingLearningProgramData.target)
                    dateAndAction.push(res.hadithTeachingLearningProgramData.dateAndAction)
                    actual.push(res.hadithTeachingLearningProgramData.actual)
                    averageAttendance.push(res.hadithTeachingLearningProgramData.averageAttendance)
                    comment.push(res.hadithTeachingLearningProgramData.comment)
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