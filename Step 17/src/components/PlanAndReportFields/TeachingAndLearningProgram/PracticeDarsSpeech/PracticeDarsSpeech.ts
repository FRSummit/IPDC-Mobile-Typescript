import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './practice-dars-speech.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {TeachingLearningProgramPlanData} from "../../../../models/TeachingLearningProgramPlanData";
import {TeachingLearningProgramData} from "../../../../models/TeachingLearningProgramData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class PracticeDarsSpeech extends Vue {
    planOrReportTab !: null
    practiceDarsTeachingLearningProgramPlanData !: TeachingLearningProgramPlanData;
    practiceDarsTeachingLearningProgramData !: TeachingLearningProgramData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    target !: null
    dateAndAction !: null
    actual !: null
    averageAttendance !: null
    comment !: null
    signalr = new SignalrWrapper();

    unitPlanReportService = new UnitPlanReportService();

    constructor() 
    { 
        super()
        this.signalreventhandlers = {
            "UnitPlanUpdated": this.onUnitPlanUpdated,
            "UnitPlanUpdateFailed": this.onUnitPlanUpdateFailed,
        };
    }
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

    async created() {
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        this.unitPlan = await this.unitPlanReportService.getPlan(this.unitReportId);
        const initialData = planDataBuilder.getPlanData(this.unitPlan);
        this.unitPlanModifiedData = this.unitPlan;
        this.initialJson = JSON.stringify(initialData);
        this.practiceDarsTeachingLearningProgramPlanData = this.unitPlan.practiceDarsTeachingLearningProgramPlanData;
        this.target = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).target : this.unitPlan.practiceDarsTeachingLearningProgramPlanData.target;
        this.dateAndAction = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).dateAndAction : this.unitPlan.practiceDarsTeachingLearningProgramPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.practiceDarsTeachingLearningProgramData = this.unitReport.practiceDarsTeachingLearningProgramData;
        this.target = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).target : this.unitReport.practiceDarsTeachingLearningProgramData.target;
        this.dateAndAction = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).dateAndAction : this.unitReport.practiceDarsTeachingLearningProgramData.dateAndAction;
        this.actual = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).actual : this.unitReport.practiceDarsTeachingLearningProgramData.actual;
        this.averageAttendance = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).averageAttendance : this.unitReport.practiceDarsTeachingLearningProgramData.averageAttendance;
        this.comment = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).comment : this.unitReport.practiceDarsTeachingLearningProgramData.comment;
      }
      await this.signalrStart();
    }

    async signalrStart() {
      this.signalr.start();
      for (const key in this.signalreventhandlers) {
          if (this.signalreventhandlers.hasOwnProperty(key)) {
              this.signalr.on(key, this.signalreventhandlers[key]);
          }
       }
    }

    backButton() {
        if(this.planOrReportTab === 'REPORT') 
        this.$router.push('/report-landing-swip-report')        
        else if(this.unitPlan.reOpenedReportStatusDescription === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.practiceDarsTeachingLearningProgramPlanData.target =  this.target!;
        this.practiceDarsTeachingLearningProgramPlanData.dateAndAction =  this.dateAndAction!;
      
        if (!this.isPlanDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
            ons.notification.alert('Plan Updated',{title :''}); 
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
        }

      } if(this.planOrReportTab === 'REPORT') {
        this.practiceDarsTeachingLearningProgramData.target =  this.target!;
        this.practiceDarsTeachingLearningProgramData.dateAndAction =  this.dateAndAction!;
        this.practiceDarsTeachingLearningProgramData.actual =  this.actual!;
        this.practiceDarsTeachingLearningProgramData.averageAttendance =  this.averageAttendance!;
        this.practiceDarsTeachingLearningProgramData.comment =  this.comment!;

        if (!this.isReportDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
            ons.notification.alert('Report Updated',{title :''});
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
        }
      }
      this.changeTab()
    }

    get isPlanDirty() { 
      const latestJson = JSON.stringify(planDataBuilder.getPlanData(this.unitPlanModifiedData));
      return latestJson !== this.initialJson;
    }

    get isReportDirty() { 
      const latestJson = JSON.stringify(reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
      return latestJson !== this.initialJson;;
    }
    
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[4] as HTMLElement
      tab.click()
    }

    onUnitPlanUpdated = async (id: number) => {
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }
    isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (this.$store.state.reportStatus === 'PlanPromoted' || this.$store.state.reportStatus === 'Submitted')) {
        return true
      } else if (tabActivationForPlanOrReport === 'REPORT' && this.$store.state.reportStatus === 'Submitted') {
        return true
      }
    }
}





















//     backButton() {
//         this.$router.push('/report-landing-swip')
//     }
//     onSubmit() {
//         if(this.planOrReportTab === 'PLAN') {
//             const practiceDarsSpeech = {
//                 practiceDarsTeachingLearningProgramPlanData: {
//                     target: this.target,
//                     dateAndAction: this.dateAndAction,
//                 },
//             };
//             console.log(practiceDarsSpeech)
//             localStorage.setItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData', JSON.stringify(practiceDarsSpeech))
//           } else if(this.planOrReportTab === 'REPORT') {
//             const practiceDarsSpeech = {
//                 practiceDarsTeachingLearningProgramData: {
//                     target: this.target,
//                     dateAndAction: this.dateAndAction,
//                     actual: this.actual,
//                     averageAttendance: this.averageAttendance,
//                     comment: this.comment,
//                 }
//             };
//             console.log(practiceDarsSpeech)
//             localStorage.setItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData', JSON.stringify(practiceDarsSpeech))
//           }
//           this.changeTab()
//     }
//     changeTab() {
//       let tab = document.querySelectorAll('.my_tab')[4] as HTMLElement
//       tab.click()
//     }
//     created() {
//         const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
//         let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
//         console.log(tabActivationForPlanOrReport)
//         this.planOrReportTab = tabActivationForPlanOrReport
//         if(tabActivationForPlanOrReport === 'PLAN') {
//           let target: any = []
//           let dateAndAction: any = []
//           if(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')) {
//             this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.target
//             this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.dateAndAction
//           } else {
//               this.unitPlanReportService
//                 .getPlan(unitReportId)
//                   .then(res => {
//                     target.push(res.practiceDarsTeachingLearningProgramPlanData.target)
//                     dateAndAction.push(res.practiceDarsTeachingLearningProgramPlanData.dateAndAction)
//                   })
//                   this.target = target
//                   this.dateAndAction = dateAndAction
//           }
//         } else if(tabActivationForPlanOrReport === 'REPORT') {
//           let target: any = []
//           let dateAndAction: any = []
//           let actual: any = []
//           let averageAttendance: any = []
//           let comment: any = []
//           if(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')) {
//             this.target = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.target
//             this.dateAndAction = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.dateAndAction
//             this.actual = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.actual
//             this.averageAttendance = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.averageAttendance
//             this.comment = JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.comment
//           } else {
//             this.unitPlanReportService
//                 .getReport(unitReportId)
//                   .then(res => {
//                     target.push(res.practiceDarsTeachingLearningProgramData.target)
//                     dateAndAction.push(res.practiceDarsTeachingLearningProgramData.dateAndAction)
//                     actual.push(res.practiceDarsTeachingLearningProgramData.actual)
//                     averageAttendance.push(res.practiceDarsTeachingLearningProgramData.averageAttendance)
//                     comment.push(res.practiceDarsTeachingLearningProgramData.comment)
//                   })
//                   this.target = target
//                   this.dateAndAction = dateAndAction
//                   this.actual = actual
//                   this.averageAttendance = averageAttendance
//                   this.comment = comment
//           }
//         }
//     }
// }