import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-meetings.html';
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
export default class OtherMeetings extends Vue {
    planOrReportTab !: null
    otherMeetingProgramPlanData !: MeetingProgramPlanData;
    otherMeetingProgramData !: MeetingProgramData;
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
        this.otherMeetingProgramPlanData = this.unitPlan.otherMeetingProgramPlanData;
        this.target = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).target : this.unitPlan.otherMeetingProgramPlanData.target;
        this.dateAndAction = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).dateAndAction : this.unitPlan.otherMeetingProgramPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherMeetingProgramData = this.unitReport.otherMeetingProgramData;
        this.target = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).target : this.unitReport.otherMeetingProgramData.target;
        this.dateAndAction = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).dateAndAction : this.unitReport.otherMeetingProgramData.dateAndAction;
        this.actual = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).actual : this.unitReport.otherMeetingProgramData.actual;
        this.averageAttendance = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).averageAttendance : this.unitReport.otherMeetingProgramData.averageAttendance;
        this.comment = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData') ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).comment : this.unitReport.otherMeetingProgramData.comment;
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
        this.otherMeetingProgramPlanData.target =  this.target!;
        this.otherMeetingProgramPlanData.dateAndAction =  this.dateAndAction!;
      
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
        this.otherMeetingProgramData.target =  this.target!;
        this.otherMeetingProgramData.dateAndAction =  this.dateAndAction!;
        this.otherMeetingProgramData.actual =  this.actual!;
        this.otherMeetingProgramData.averageAttendance =  this.averageAttendance!;
        this.otherMeetingProgramData.comment =  this.comment!;

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
      let tab = document.querySelectorAll('.my_tab')[19] as HTMLElement
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