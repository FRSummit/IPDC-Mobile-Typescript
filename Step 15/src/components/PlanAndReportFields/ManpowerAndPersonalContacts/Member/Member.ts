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
      console.log(tabActivationForPlanOrReport)
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        this.unitPlan = await this.unitPlanReportService.getPlan(this.unitReportId);
        const initialData = planDataBuilder.getPlanData(this.unitPlan);
        this.unitPlanModifiedData = this.unitPlan;
        this.initialJson = JSON.stringify(initialData);
        this.memberMemberPlanData = this.unitPlan.memberMemberPlanData;
        console.log(this.unitPlan.memberMemberPlanData);
        this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).upgradeTarget : this.unitPlan.memberMemberPlanData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).nameAndContactNumber : this.unitPlan.memberMemberPlanData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).action : this.unitPlan.memberMemberPlanData.action;
        console.log('----------------Plan----------------')
        console.log(this.memberMemberPlanData);
        if(this.memberMemberPlanData.upgradeTarget === null) {
          console.log('target null')
        } else {
          console.log('target not null')
        }
        console.log('----------------Plan----------------')

      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.memberMemberReportData = this.unitReport.associateMemberData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).upgradeTarget : this.unitReport.associateMemberData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).nameAndContactNumber : this.unitReport.associateMemberData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).action : this.unitReport.associateMemberData.action;
        this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).lastPeriod : this.unitReport.associateMemberData.lastPeriod;
        this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).thisPeriod : this.unitReport.associateMemberData.thisPeriod;
        this.increased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).increased : this.unitReport.associateMemberData.increased;
        this.decreased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).decreased : this.unitReport.associateMemberData.decreased;
        this.comment = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).comment : this.unitReport.associateMemberData.comment;
        this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).personalContact : this.unitReport.associateMemberData.personalContact;
        console.log(this.memberMemberReportData);
        // if(this.readable === false) {
        //   // console.log(this.readable)
        //   this.reportInputReadable()
        //   this.readable = true
        // }
      }

      await this.signalrStart();

      console.log('Test: ' + this.test())
      
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
            console.log('Save Report');
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
      //this.isSaving = false;
      //toastr.success("Plan Saved");
      //this.setInitialData();
      //if(this.afterSave.length === 0) return;
      //await this.afterSave.pop()();  
  }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
        //this.isSaving = false;
        // toastr.error(e.$values.join("\n"), "Error Saving Plan");
        // if(this.afterSave.length === 0) return;
        // this.afterSave.pop();
    }
    mounted() {
    }
    planInputReadable() {
      let target: any = document.querySelector('#target')
      let nameAndContactNumber: any = document.querySelector('#nameAndContactNumber')
      let action: any = document.querySelector('#action')
      
      if(this.memberMemberPlanData.upgradeTarget !== null) target.readOnly = true
      if(this.memberMemberPlanData.nameAndContactNumber !== null) nameAndContactNumber.readOnly = true
      if(this.memberMemberPlanData.action !== null) action.readOnly = true
    }
    reportInputReadable() {
      // this.readable = true
      let target: any = document.querySelector('#target')
      let nameAndContactNumber: any = document.querySelector('#nameAndContactNumber')
      let action: any = document.querySelector('#action')
      let lastPeriod: any = document.querySelector('#lastPeriod')
      let thisPeriod: any = document.querySelector('#thisPeriod')
      let increased: any = document.querySelector('#increased')
      let decreased: any = document.querySelector('#decreased')
      let comment: any = document.querySelector('#comment')
      let memberContact: any = document.querySelector('#memberContact')

      if(this.memberMemberReportData.upgradeTarget !== null) target.readOnly = true
      if(this.memberMemberReportData.nameAndContactNumber !== null) nameAndContactNumber.readOnly = true
      if(this.memberMemberReportData.action !== null) action.readOnly = true
      if(this.memberMemberReportData.lastPeriod != null) lastPeriod.readOnly = true
      if(this.memberMemberReportData.thisPeriod !== null) thisPeriod.readOnly = true
      if(this.memberMemberReportData.increased !== null) increased.readOnly = true
      if(this.memberMemberReportData.decreased !== null) decreased.readOnly = true
      if(this.memberMemberReportData.comment !== null) comment.readOnly = true
      if(this.memberMemberReportData.personalContact !== null) memberContact.readOnly = true
    }

    test() {
      // if(this.unitReport.reportStatusDescription === 'Submitted') {
        return this.readable = true
      // }
    }







    // backButton() {
    //     // this.$router.push('/report-landing-swip')
    //     let id: any = localStorage.getItem('planandreports_passing_unit_id');
    //     this.unitPlanReportService
    //       .getPlan(id)
    //       .then(res => {
    //         if(res.reportStatusDescription === 'Draft') this.$router.push('/report-landing-plan')
    //         else if(this.planOrReportTab === 'REPORT') this.$router.push('/report-landing-swip-report')
    //         else this.$router.push('/report-landing-swip')
    //       })
    // }

    // onSubmit() {
    //   if(this.planOrReportTab === 'PLAN') {

    //     this.memberMemberPlanData.upgradeTarget =  this.target!;
    //     this.memberMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
    //     this.memberMemberPlanData.action =  this.action!;
    //     localStorage.setItem('manpowerAndPersonalContacts_memberMemberPlanData', JSON.stringify(this.memberMemberPlanData))
    //   } if(this.planOrReportTab === 'REPORT') {
    //     this.memberMemberReportData.upgradeTarget =  this.target!;
    //     this.memberMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
    //     this.memberMemberReportData.action =  this.action!;
    //     this.memberMemberReportData.lastPeriod =  this.lastPeriod!;
    //     this.memberMemberReportData.thisPeriod =  this.thisPeriod!;
    //     this.memberMemberReportData.increased =  this.increased!;
    //     this.memberMemberReportData.decreased =  this.decreased!;
    //     this.memberMemberReportData.comment =  this.comment!;
    //     this.memberMemberReportData.personalContact =  this.memberContact!;
    //     localStorage.setItem('manpowerAndPersonalContacts_memberMemberData', JSON.stringify(this.memberMemberReportData))
    //   }
    //   this.changeTab()
    // }
    // async created() {
    //     const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
    //     let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
    //     console.log(tabActivationForPlanOrReport)
    //     this.planOrReportTab = tabActivationForPlanOrReport
    //     if(tabActivationForPlanOrReport === 'PLAN') {
    //       this.unitPlan = await this.unitPlanReportService.getPlan(unitReportId);
    //       this.memberMemberPlanData = this.unitPlan.memberMemberPlanData;
    //       this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).upgradeTarget : this.unitPlan.memberMemberPlanData.upgradeTarget;
    //       this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).nameAndContactNumber : this.unitPlan.memberMemberPlanData.nameAndContactNumber;
    //       this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).action : this.unitPlan.memberMemberPlanData.action;
    //       console.log(this.memberMemberPlanData);
    //     } else if(tabActivationForPlanOrReport === 'REPORT') {
    //       this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
    //       this.memberMemberReportData = this.unitReport.memberMemberData;
    //       this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).upgradeTarget : this.unitReport.memberMemberData.upgradeTarget;
    //       this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).nameAndContactNumber : this.unitReport.memberMemberData.nameAndContactNumber;
    //       this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).action : this.unitReport.memberMemberData.action;
    //       this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).lastPeriod : this.unitReport.memberMemberData.lastPeriod;
    //       this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).thisPeriod : this.unitReport.memberMemberData.thisPeriod;
    //       this.increased = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).increased : this.unitReport.memberMemberData.increased;
    //       this.decreased = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).decreased : this.unitReport.memberMemberData.decreased;
    //       this.comment = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).comment : this.unitReport.memberMemberData.comment;
    //       this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).personalContact : this.unitReport.memberMemberData.personalContact;
    //       console.log(this.memberMemberReportData);
    //     }
    // }
    // changeTab() {
    //   let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
    //   tab.click()
    // }
}