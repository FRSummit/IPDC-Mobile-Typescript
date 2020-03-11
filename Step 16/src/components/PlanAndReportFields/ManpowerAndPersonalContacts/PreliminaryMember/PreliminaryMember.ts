import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './preliminary-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class PrelimanryMember extends Vue {
    planOrReportTab !: null
    preliminaryMemberPlanData !: MemberPlanData;
    preliminarymemberReportData !: MemberData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    lastPeriod !: null
    target !: null
    increased !: null
    decreased !: null
    thisPeriod !: null
    memberContact !: null
    comment !: null
    nameAndContactNumber !: null
    action !: null
    signalr = new SignalrWrapper();
    readable = false

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
        this.preliminaryMemberPlanData = this.unitPlan.preliminaryMemberPlanData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).upgradeTarget : this.unitPlan.preliminaryMemberPlanData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).nameAndContactNumber : this.unitPlan.preliminaryMemberPlanData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).action : this.unitPlan.preliminaryMemberPlanData.action;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.preliminarymemberReportData = this.unitReport.preliminaryMemberData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).upgradeTarget : this.unitReport.preliminaryMemberData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).nameAndContactNumber : this.unitReport.preliminaryMemberData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).action : this.unitReport.preliminaryMemberData.action;
        this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).lastPeriod : this.unitReport.preliminaryMemberData.lastPeriod;
        this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).thisPeriod : this.unitReport.preliminaryMemberData.thisPeriod;
        this.increased = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).increased : this.unitReport.preliminaryMemberData.increased;
        this.decreased = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).decreased : this.unitReport.preliminaryMemberData.decreased;
        this.comment = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).comment : this.unitReport.preliminaryMemberData.comment;
        this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).personalContact : this.unitReport.preliminaryMemberData.personalContact;
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
        this.preliminaryMemberPlanData.upgradeTarget =  this.target!;
        this.preliminaryMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.preliminaryMemberPlanData.action =  this.action!;
        this.unitPlanModifiedData.preliminaryMemberPlanData = this.preliminaryMemberPlanData;

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
        this.preliminarymemberReportData.upgradeTarget =  this.target!;
        this.preliminarymemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.preliminarymemberReportData.action =  this.action!;
        this.preliminarymemberReportData.lastPeriod =  this.lastPeriod!;
        this.preliminarymemberReportData.thisPeriod =  this.thisPeriod!;
        this.preliminarymemberReportData.increased =  this.increased!;
        this.preliminarymemberReportData.decreased =  this.decreased!;
        this.preliminarymemberReportData.comment =  this.comment!;
        this.preliminarymemberReportData.personalContact =  this.memberContact!;

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
      let tab = document.querySelectorAll('.my_tab')[3] as HTMLElement
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