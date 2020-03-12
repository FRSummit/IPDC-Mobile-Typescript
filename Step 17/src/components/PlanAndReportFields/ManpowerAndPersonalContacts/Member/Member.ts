import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import ons from 'onsenui';
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";
import { readonly } from '../../../../methods/ReadonlyInput/Readonly'

@WithRender

@Component
export default class Member extends Vue {
    planOrReportTab !: null
    memberMemberPlanData !: MemberPlanData;
    memberMemberReportData !: MemberData;
    unitPlan !: UnitPlanViewModelDto;
    unitReport !: UnitReportViewModelDto;
    lastPeriod !: null
    target !: null
    increased !: null
    decreased !: null
    thisPeriod !: null
    memberContact !: null
    comment !: null
    nameAndContactNumber !: null
    action !: null
    unitPlanReportService = new UnitPlanReportService();
    
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    signalr = new SignalrWrapper();
    readable = false

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
            lastPeriod: null,
            target: null,
            increased: null,
            decreased: null, 
            thisPeriod: null, 
            memberContact: null, 
            comment: null, 
            nameAndContactNumber: null, 
            action: null,
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
        this.memberMemberPlanData = this.unitPlan.memberMemberPlanData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).upgradeTarget : this.unitPlan.memberMemberPlanData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).nameAndContactNumber : this.unitPlan.memberMemberPlanData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).action : this.unitPlan.memberMemberPlanData.action;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.memberMemberReportData = this.unitReport.memberMemberData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).upgradeTarget : this.unitReport.memberMemberData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).nameAndContactNumber : this.unitReport.memberMemberData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).action : this.unitReport.memberMemberData.action;
        this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).lastPeriod : this.unitReport.memberMemberData.lastPeriod;
        this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).thisPeriod : this.unitReport.memberMemberData.thisPeriod;
        this.increased = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).increased : this.unitReport.memberMemberData.increased;
        this.decreased = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).decreased : this.unitReport.memberMemberData.decreased;
        this.comment = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).comment : this.unitReport.memberMemberData.comment;
        this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).personalContact : this.unitReport.memberMemberData.personalContact;
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
        this.memberMemberPlanData.upgradeTarget =  this.target!;
        this.memberMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.memberMemberPlanData.action =  this.action!;
        this.unitPlanModifiedData.memberMemberPlanData = this.memberMemberPlanData;

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
        this.memberMemberReportData.upgradeTarget =  this.target!;
        this.memberMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.memberMemberReportData.action =  this.action!;
        this.memberMemberReportData.lastPeriod =  this.lastPeriod!;
        this.memberMemberReportData.thisPeriod =  this.thisPeriod!;
        this.memberMemberReportData.increased =  this.increased!;
        this.memberMemberReportData.decreased =  this.decreased!;
        this.memberMemberReportData.comment =  this.comment!;
        this.memberMemberReportData.personalContact =  this.memberContact!;

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
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
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