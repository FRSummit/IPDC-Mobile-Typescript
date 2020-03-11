import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './group-study-discussion.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class GroupStudyDiscussion extends Vue {
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
            const groupStudyDiscussion = {
                groupStudyTeachingLearningProgramPlanData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                },
            };
            console.log(groupStudyDiscussion)
            localStorage.setItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData', JSON.stringify(groupStudyDiscussion))
          } else if(this.planOrReportTab === 'REPORT') {
            const groupStudyDiscussion = {
                groupStudyTeachingLearningProgramData: {
                    target: this.target,
                    dateAndAction: this.dateAndAction,
                    actual: this.actual,
                    averageAttendance: this.averageAttendance,
                    comment: this.comment,
                }
            };
            console.log(groupStudyDiscussion)
            localStorage.setItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData', JSON.stringify(groupStudyDiscussion))
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
          if(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')!).groupStudyTeachingLearningProgramPlanData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')!).groupStudyTeachingLearningProgramPlanData.dateAndAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.groupStudyTeachingLearningProgramPlanData.target)
                    dateAndAction.push(res.groupStudyTeachingLearningProgramPlanData.dateAndAction)
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
          if(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')) {
            this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.target
            this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.dateAndAction
            this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.actual
            this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.averageAttendance
            this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    target.push(res.groupStudyTeachingLearningProgramData.target)
                    dateAndAction.push(res.groupStudyTeachingLearningProgramData.dateAndAction)
                    actual.push(res.groupStudyTeachingLearningProgramData.actual)
                    averageAttendance.push(res.groupStudyTeachingLearningProgramData.averageAttendance)
                    comment.push(res.groupStudyTeachingLearningProgramData.comment)
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