import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './dawah-meetings.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {MeetingProgramPlanData} from "../../../../models/MeetingProgramPlanData";
import {MeetingProgramData} from "../../../../models/MeetingProgramData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class DawahMeetings extends Vue {
    planOrReportTab !: null
    dawahMeetingProgramPlanData !: MeetingProgramPlanData;
    dawahMeetingProgramData !: MeetingProgramData;
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
            comment: null,
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
        this.dawahMeetingProgramPlanData = this.unitPlan.dawahMeetingProgramPlanData;
        this.target = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')!).target : this.unitPlan.dawahMeetingProgramPlanData.target;
        this.dateAndAction = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')!).dateAndAction : this.unitPlan.dawahMeetingProgramPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.dawahMeetingProgramData = this.unitReport.dawahMeetingProgramData;
        this.target = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).target : this.unitReport.dawahMeetingProgramData.target;
        this.dateAndAction = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).dateAndAction : this.unitReport.dawahMeetingProgramData.dateAndAction;
        this.actual = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).actual : this.unitReport.dawahMeetingProgramData.actual;
        this.averageAttendance = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).averageAttendance : this.unitReport.dawahMeetingProgramData.averageAttendance;
        this.comment = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).comment : this.unitReport.dawahMeetingProgramData.comment;
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
        this.dawahMeetingProgramPlanData.target =  this.target!;
        this.dawahMeetingProgramPlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.dawahMeetingProgramPlanData = this.dawahMeetingProgramPlanData;
      
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
        this.dawahMeetingProgramData.target =  this.target!;
        this.dawahMeetingProgramData.dateAndAction =  this.dateAndAction!;
        this.dawahMeetingProgramData.actual =  this.actual!;
        this.dawahMeetingProgramData.averageAttendance =  this.averageAttendance!;
        this.dawahMeetingProgramData.comment =  this.comment!;
        this.unitReportModifiedData.dawahMeetingProgramData = this.dawahMeetingProgramData;

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
      let tab = document.querySelectorAll('.my_tab')[5] as HTMLElement
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