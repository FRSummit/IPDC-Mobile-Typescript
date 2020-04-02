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
import $ from 'jquery'

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
    thisPeriod !: any
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

    defTarget = true
    increasedTargetVal !: any
    progressbar !: any
    planOrReportTabStatus: any
    
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
            planOrReportTabStatus: null,
            lastPeriod: null,
            target: null,
            increased: null,
            decreased: null, 
            thisPeriod: null, 
            memberContact: null, 
            comment: null, 
            nameAndContactNumber: null, 
            action: null,
            increasedTargetVal: null,
            progressbar: false
        }
    }
    async created() {
      this.$store.state.reportStatusFromInput = 'manpower-section'
      this.planOrReportTabStatus = JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status
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
        document.querySelector('.navbar')!.classList.remove('hide')
        if(this.planOrReportTab === 'REPORT')
        this.$router.push('/report-landing-swip-report')        
        else if(this.$store.state.reportStatus === 'Draft' || JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }
    async onSubmit() {
      this.progressbar = true
      if(this.planOrReportTab === 'PLAN') {
        this.unitPlanModifiedData = await this.unitPlanReportService.getPlan(this.unitReportId);
        this.supporterMemberPlanData.upgradeTarget =  this.target! === '' ? 0 : this.target!;
        this.supporterMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.supporterMemberPlanData.action =  this.action!;
        this.unitPlanModifiedData.supporterMemberPlanData = this.supporterMemberPlanData;
        if (this.isPlanDirty()) {
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
              ons.notification.toast('Plan Updated',{ timeout: 1000, animation: 'fall' }); 
          } catch(error) {
            ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
              return;
          }
        }
        else{
          ons.notification.toast('Nothing to change',{ timeout: 1000, animation: 'fall' });
        }
        this.progressbar = false
      } if(this.planOrReportTab === 'REPORT') {
        this.unitReportModifiedData = await this.unitPlanReportService.getReport(this.unitReportId);
        this.supporterMemberReportData.upgradeTarget =  this.target! === '' ? 0 : this.target!;
        this.supporterMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.supporterMemberReportData.action =  this.action!;
        this.supporterMemberReportData.lastPeriod =  this.lastPeriod!;
        this.supporterMemberReportData.thisPeriod =  this.thisPeriod!;
        this.supporterMemberReportData.increased =  this.increased! === '' ? 0 : this.increased!;
        this.supporterMemberReportData.decreased =  this.decreased! === '' ? 0 : this.decreased!;
        this.supporterMemberReportData.comment =  this.comment!;
        this.supporterMemberReportData.personalContact =  this.memberContact! === '' ? 0 : this.memberContact!;
        this.unitReportModifiedData.supporterMemberData = this.supporterMemberReportData;
        if (this.isReportDirty()){
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
              ons.notification.toast('Report Updated',{ timeout: 1000, animation: 'fall' });
          } catch(error) {
            ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
              return;
          }
        }
        else{
          ons.notification.toast('Nothing to change',{ timeout: 1000, animation: 'fall' });
        }
        this.progressbar = false
      }
      // this.changeTab()
    }
    changeTab() {
      this.$router.push('/plan-and-report-edit/regular-and-special-meetings/worker-meetings')
    }
    isPlanDirty() { 
      const latestJson = JSON.stringify(planDataBuilder.getPlanData(this.unitPlanModifiedData));
      if(latestJson !== this.initialJson)
      {
        this.initialJson = latestJson;
        return true;
      }
      else return false;
    }
    isReportDirty() { 
      const latestJson = JSON.stringify(reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
      if(latestJson !== this.initialJson)
      {
        this.initialJson = latestJson;
        return true;
      }
      else return false;
    }
    onUnitPlanUpdated = async (id: number) => { 
    }
    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }
    isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'PlanPromoted' || JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Submitted')) {
        return true
      } else if (tabActivationForPlanOrReport === 'REPORT' && JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Submitted') {
        return true
      }
    }
    planOrReportTabStatusCreate(status: any) {
      if(status === 'Draft' && this.planOrReportTab === 'PLAN') return  "Edit Plan";
      else if(status === 'PlanPromoted' && this.planOrReportTab === 'PLAN') return  "View Plan";
      else if(status === 'PlanPromoted' && this.planOrReportTab === 'REPORT') return  "Edit Report";
      else if(status === 'Submitted' && this.planOrReportTab === 'PLAN') return  "View Plan";
      else if(status === 'Submitted' && this.planOrReportTab === 'REPORT') return  "View Report";
      else return '';
    }
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      this.$router.replace('/plan-and-report-edit/manpower-and-personal-contacts/preliminary-member')
      tab.click()
    }
    memberIncreasedEdit(i: any) {
      // this.defTarget = false
      // let upgradeTarget = this.target!
      // let increased = this.increased + i.key
      // let decreased = this.decreased!
      // let calc = upgradeTarget + (increased - decreased)
      // if(!isNaN(calc)) {
      //   this.thisPeriod = calc
      //   this.increasedTargetVal = calc
      // }
      // if(upgradeTarget === this.thisPeriod) this.defTarget = true
    }
    memberDecreasedEdit(i: any) {
      // this.defTarget = false
      // let upgradeTarget = this.target!
      // let increased = this.increased!
      // let decreased = this.decreased + i.key
      // let calc = upgradeTarget + (increased - decreased)
      // if(!isNaN(calc)) {
      //   this.thisPeriod = calc
      //   this.increasedTargetVal = calc
      // }
      // if(upgradeTarget === this.thisPeriod) this.defTarget = true
    }
    mounted() {
      if(window.location.pathname !== '/plan-and-report-edit/manpower-and-personal-contacts/supporter-member') this.$router.replace('/plan-and-report-edit/manpower-and-personal-contacts/supporter-member')
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
      if(document.getElementById('increased-sm')! && document.getElementById('decreased-sm')!) {
        // document.getElementById('increased-sm')!.addEventListener("keydown", (e) => {
        //   if(this.defTarget = true) this.defTarget = false
        //   if (e.code === 'Backspace') {
        //     let upgradeTarget = this.target!
        //     let increased = this.increased!
        //     let decreased = this.decreased!
        //     this.thisPeriod = upgradeTarget + (Math.floor(increased / 10) - decreased)
            
        //     this.increasedTargetVal = this.thisPeriod
        //   }
        // });
        // document.getElementById('decreased-sm')!.addEventListener("keydown", (e) => {
        //   if(this.defTarget = true) this.defTarget = false
        //   if (e.code === 'Backspace') {
        //     let upgradeTarget = this.target!
        //     let increased = this.increased!
        //     let decreased = this.decreased!
        //     this.thisPeriod = upgradeTarget + (increased - (Math.floor(decreased / 10)))
            
        //     this.increasedTargetVal = this.thisPeriod
        //   }
        // });
        $("#increased-sm").keyup( () => {
          let inc:any = $("#increased-sm").val()
          this.defTarget = false
          let upgradeTarget = this.target!
          let increased = inc
          let decreased = this.decreased!
          let calc = upgradeTarget + (increased - decreased)
          if(!isNaN(calc)) {
            this.thisPeriod = calc
            this.increasedTargetVal = calc
          }
          if(upgradeTarget === this.thisPeriod) this.defTarget = true
        });
        $("#decreased-sm").keyup( () => {
          let dec:any = $("#decreased-sm").val()
          this.defTarget = false
          let upgradeTarget = this.target!
          let increased = this.increased!
          let decreased = dec
          let calc = upgradeTarget + (increased - decreased)
          if(!isNaN(calc)) {
            this.thisPeriod = calc
            this.increasedTargetVal = calc
          }
          if(upgradeTarget === this.thisPeriod) this.defTarget = true
        });
      }
    }
}