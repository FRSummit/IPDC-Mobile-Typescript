import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './memorizing-doa.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class MemorizingDoa extends Vue {
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
            const memorizingDoa = {
                memorizingDoaTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(memorizingDoa)
            localStorage.setItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData', JSON.stringify(memorizingDoa))
          } else if(this.planOrReportTab === 'REPORT') {
            const memorizingDoa = {
                memorizingDoaTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(memorizingDoa)
            localStorage.setItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData', JSON.stringify(memorizingDoa))
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')!).memorizingDoaTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')!).memorizingDoaTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.memorizingDoaTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.memorizingDoaTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.memorizingDoaTeachingLearningProgramData.target)
                    dateAndAction.push(res.memorizingDoaTeachingLearningProgramData.dateAndAction)
                    actual.push(res.memorizingDoaTeachingLearningProgramData.actual)
                    averageAttendance.push(res.memorizingDoaTeachingLearningProgramData.averageAttendance)
                    comment.push(res.memorizingDoaTeachingLearningProgramData.comment)
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