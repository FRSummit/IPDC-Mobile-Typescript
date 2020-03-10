import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './memorizing-hadith.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class MemorizingHadith extends Vue {
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
            const memorizingHadith = {
                memorizingHadithTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(memorizingHadith)
            localStorage.setItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData', JSON.stringify(memorizingHadith))
          } else if(this.planOrReportTab === 'REPORT') {
            const memorizingHadith = {
                memorizingHadithTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(memorizingHadith)
            localStorage.setItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData', JSON.stringify(memorizingHadith))
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')!).memorizingHadithTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')!).memorizingHadithTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.memorizingHadithTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.memorizingHadithTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.memorizingHadithTeachingLearningProgramData.target)
                    dateAndAction.push(res.memorizingHadithTeachingLearningProgramData.dateAndAction)
                    actual.push(res.memorizingHadithTeachingLearningProgramData.actual)
                    averageAttendance.push(res.memorizingHadithTeachingLearningProgramData.averageAttendance)
                    comment.push(res.memorizingHadithTeachingLearningProgramData.comment)
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