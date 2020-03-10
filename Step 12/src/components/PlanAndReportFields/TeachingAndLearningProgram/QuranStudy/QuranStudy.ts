import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './quran-study.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class QuranStudy extends Vue {
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
            const quranStudy = {
                quranStudyTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(quranStudy)
            localStorage.setItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData', JSON.stringify(quranStudy))
          } else if(this.planOrReportTab === 'REPORT') {
            const quranStudy = {
                quranStudyTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(quranStudy)
            localStorage.setItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData', JSON.stringify(quranStudy))
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
          if(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')!).quranStudyTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')!).quranStudyTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.quranStudyTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.quranStudyTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.quranStudyTeachingLearningProgramData.target)
                    dateAndAction.push(res.quranStudyTeachingLearningProgramData.dateAndAction)
                    actual.push(res.quranStudyTeachingLearningProgramData.actual)
                    averageAttendance.push(res.quranStudyTeachingLearningProgramData.averageAttendance)
                    comment.push(res.quranStudyTeachingLearningProgramData.comment)
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