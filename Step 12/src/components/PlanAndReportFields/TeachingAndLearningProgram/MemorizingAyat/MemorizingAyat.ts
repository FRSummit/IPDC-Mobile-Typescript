import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './memorizing-ayat.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class MemorizingAyat extends Vue {
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
            const memorizingAyat = {
                memorizingAyatTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(memorizingAyat)
            localStorage.setItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData', JSON.stringify(memorizingAyat))
          } else if(this.planOrReportTab === 'REPORT') {
            const memorizingAyat = {
                memorizingAyatTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(memorizingAyat)
            localStorage.setItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData', JSON.stringify(memorizingAyat))
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')!).memorizingAyatTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')!).memorizingAyatTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.memorizingAyatTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.memorizingAyatTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.memorizingAyatTeachingLearningProgramData.target)
                    dateAndAction.push(res.memorizingAyatTeachingLearningProgramData.dateAndAction)
                    actual.push(res.memorizingAyatTeachingLearningProgramData.actual)
                    averageAttendance.push(res.memorizingAyatTeachingLearningProgramData.averageAttendance)
                    comment.push(res.memorizingAyatTeachingLearningProgramData.comment)
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