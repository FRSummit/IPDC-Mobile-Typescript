import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './supporter-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import ons from 'onsenui';
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class SupporterMember extends Vue {
    planOrReportTab !: null
    supporterMemberPlanData !: MemberPlanData;
    supporterMemberReportData !: MemberData;
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
        this.supporterMemberPlanData = this.unitPlan.supporterMemberPlanData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).upgradeTarget : this.unitPlan.supporterMemberPlanData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).nameAndContactNumber : this.unitPlan.supporterMemberPlanData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).action : this.unitPlan.supporterMemberPlanData.action;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.supporterMemberReportData = this.unitReport.supporterMemberData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).upgradeTarget : this.unitReport.supporterMemberData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).nameAndContactNumber : this.unitReport.supporterMemberData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).action : this.unitReport.supporterMemberData.action;
        this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).lastPeriod : this.unitReport.supporterMemberData.lastPeriod;
        this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).thisPeriod : this.unitReport.supporterMemberData.thisPeriod;
        this.increased = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).increased : this.unitReport.supporterMemberData.increased;
        this.decreased = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).decreased : this.unitReport.supporterMemberData.decreased;
        this.comment = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).comment : this.unitReport.supporterMemberData.comment;
        this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).personalContact : this.unitReport.supporterMemberData.personalContact;
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
        this.supporterMemberPlanData.upgradeTarget =  this.target!;
        this.supporterMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.supporterMemberPlanData.action =  this.action!;
        this.unitPlanModifiedData.supporterMemberPlanData = this.supporterMemberPlanData;

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
        this.supporterMemberReportData.upgradeTarget =  this.target!;
        this.supporterMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.supporterMemberReportData.action =  this.action!;
        this.supporterMemberReportData.lastPeriod =  this.lastPeriod!;
        this.supporterMemberReportData.thisPeriod =  this.thisPeriod!;
        this.supporterMemberReportData.increased =  this.increased!;
        this.supporterMemberReportData.decreased =  this.decreased!;
        this.supporterMemberReportData.comment =  this.comment!;
        this.supporterMemberReportData.personalContact =  this.memberContact!;

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
    mounted() {
    }
    async isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (this.$store.state.mydata === 'PlanPromoted' || this.$store.state.mydata === 'Submitted')) {
        return this.readable = true
      } else if (tabActivationForPlanOrReport === 'REPORT' && this.$store.state.mydata === 'Submitted') {
        return this.readable = true
      }
    }
}