import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other.html';
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
export default class Other extends Vue {
    planOrReportTab !: null
    otherTeachingLearningProgramPlanData !: TeachingLearningProgramPlanData;
    otherTeachingLearningProgramData !: TeachingLearningProgramData;
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
        this.otherTeachingLearningProgramPlanData = this.unitPlan.otherTeachingLearningProgramPlanData;
        this.target = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')!).target : this.unitPlan.otherTeachingLearningProgramPlanData.target;
        this.dateAndAction = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')!).dateAndAction : this.unitPlan.otherTeachingLearningProgramPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherTeachingLearningProgramData = this.unitReport.otherTeachingLearningProgramData;
        this.target = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).target : this.unitReport.otherTeachingLearningProgramData.target;
        this.dateAndAction = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).dateAndAction : this.unitReport.otherTeachingLearningProgramData.dateAndAction;
        this.actual = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).actual : this.unitReport.otherTeachingLearningProgramData.actual;
        this.averageAttendance = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).averageAttendance : this.unitReport.otherTeachingLearningProgramData.averageAttendance;
        this.comment = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData') ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).comment : this.unitReport.otherTeachingLearningProgramData.comment;
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
        else if(this.$store.state.reportStatus === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.unitPlanModifiedData = await this.unitPlanReportService.getPlan(this.unitReportId);
        this.otherTeachingLearningProgramPlanData.target =  this.target!;
        this.otherTeachingLearningProgramPlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.otherTeachingLearningProgramPlanData = this.otherTeachingLearningProgramPlanData;
      
        if (this.isPlanDirty) {
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
              ons.notification.alert('Plan Updated',{title :''}); 
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
        }
        else{
          ons.notification.alert('Nothing to change',{title :''});
        }
      } if(this.planOrReportTab === 'REPORT') {
        this.unitReportModifiedData = await this.unitPlanReportService.getReport(this.unitReportId);
        this.otherTeachingLearningProgramData.target =  this.target!;
        this.otherTeachingLearningProgramData.dateAndAction =  this.dateAndAction!;
        this.otherTeachingLearningProgramData.actual =  this.actual!;
        this.otherTeachingLearningProgramData.averageAttendance =  this.averageAttendance!;
        this.otherTeachingLearningProgramData.comment =  this.comment!;
        this.unitReportModifiedData.otherTeachingLearningProgramData = this.otherTeachingLearningProgramData;

        if (this.isReportDirty){
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
              ons.notification.alert('Report Updated',{title :''});
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
        }
        else{
          ons.notification.alert('Nothing to change',{title :''});
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
      this.$router.push('/plan-and-report-edit/dawah-material-distribution/book-sale')
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