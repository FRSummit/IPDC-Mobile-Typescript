import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './weekend-islamic-school.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class WeekendIslamicSchool extends Vue {
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
            const weekendIslamicSchool = {
                weekendIslamicSchoolTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(weekendIslamicSchool)
            localStorage.setItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData', JSON.stringify(weekendIslamicSchool))
          } else if(this.planOrReportTab === 'REPORT') {
            const weekendIslamicSchool = {
                weekendIslamicSchoolTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(weekendIslamicSchool)
            localStorage.setItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData', JSON.stringify(weekendIslamicSchool))
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
          if(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')!).weekendIslamicSchoolTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')!).weekendIslamicSchoolTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.weekendIslamicSchoolTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.weekendIslamicSchoolTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.weekendIslamicSchoolTeachingLearningProgramData.target)
                    dateAndAction.push(res.weekendIslamicSchoolTeachingLearningProgramData.dateAndAction)
                    actual.push(res.weekendIslamicSchoolTeachingLearningProgramData.actual)
                    averageAttendance.push(res.weekendIslamicSchoolTeachingLearningProgramData.averageAttendance)
                    comment.push(res.weekendIslamicSchoolTeachingLearningProgramData.comment)
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