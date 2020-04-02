import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './associate-member.html';
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
export default class AssociateMember extends Vue {
    planOrReportTab !: null
    associateMemberPlanData !: MemberPlanData;
    associateMemberReportData !: MemberData;
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
        this.associateMemberPlanData = this.unitPlan.associateMemberPlanData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).upgradeTarget : this.unitPlan.associateMemberPlanData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).nameAndContactNumber : this.unitPlan.associateMemberPlanData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).action : this.unitPlan.associateMemberPlanData.action;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.associateMemberReportData = this.unitReport.associateMemberData;
        this.target = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).upgradeTarget : this.unitReport.associateMemberData.upgradeTarget;
        this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).nameAndContactNumber : this.unitReport.associateMemberData.nameAndContactNumber;
        this.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).action : this.unitReport.associateMemberData.action;
        this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).lastPeriod : this.unitReport.associateMemberData.lastPeriod;
        this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).thisPeriod : this.unitReport.associateMemberData.thisPeriod;
        this.increased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).increased : this.unitReport.associateMemberData.increased;
        this.decreased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).decreased : this.unitReport.associateMemberData.decreased;
        this.comment = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).comment : this.unitReport.associateMemberData.comment;
        this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).personalContact : this.unitReport.associateMemberData.personalContact;
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
        this.associateMemberPlanData.upgradeTarget =  this.target! === '' ? 0 : this.target!;
        this.associateMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.associateMemberPlanData.action =  this.action!;
        this.unitPlanModifiedData.associateMemberPlanData = this.associateMemberPlanData;
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
        this.associateMemberReportData.upgradeTarget =  this.target! === '' ? 0 : this.target!;
        this.associateMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.associateMemberReportData.action =  this.action!;
        this.associateMemberReportData.lastPeriod =  this.lastPeriod!;
        this.associateMemberReportData.thisPeriod =  this.thisPeriod!;
        this.associateMemberReportData.increased =  this.increased! === '' ? 0 : this.increased!;
        this.associateMemberReportData.decreased =  this.decreased! === '' ? 0 : this.decreased!;
        this.associateMemberReportData.comment =  this.comment!;
        this.associateMemberReportData.personalContact =  this.memberContact! === '' ? 0 : this.memberContact!;
        this.unitReportModifiedData.associateMemberData = this.associateMemberReportData;
        console.log(this.unitReportModifiedData.associateMemberData)
        if (!this.isReportDirty()) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
            ons.notification.toast('Report Updated',{ timeout: 1000, animation: 'fall' });
        } catch(error) {
          ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
            return;
        }
        this.progressbar = false
      }
      // this.changeTab()
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
    
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      tab.click()
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
    nextBtn() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      this.$router.replace('/plan-and-report-edit/manpower-and-personal-contacts/preliminary-member')
      tab.click()
    }
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[0] as HTMLElement
      this.$router.replace('/plan-and-report-edit/manpower-and-personal-contacts/member')
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
      if(window.location.pathname !== '/plan-and-report-edit/manpower-and-personal-contacts/associate-member') this.$router.replace('/plan-and-report-edit/manpower-and-personal-contacts/associate-member')
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
      if(document.getElementById('increased-am')! && document.getElementById('decreased-am')!) {
        // document.getElementById('increased-am')!.addEventListener("keydown", (e) => {
        //   if(this.defTarget = true) this.defTarget = false
        //   if (e.code === 'Backspace') {
        //     let upgradeTarget = this.target!
        //     let increased = this.increased!
        //     let decreased = this.decreased!
        //     this.thisPeriod = upgradeTarget + (Math.floor(increased / 10) - decreased)
            
        //     this.increasedTargetVal = this.thisPeriod
        //   }
        // });
        // document.getElementById('decreased-am')!.addEventListener("keydown", (e) => {
        //   if(this.defTarget = true) this.defTarget = false
        //   if (e.code === 'Backspace') {
        //     let upgradeTarget = this.target!
        //     let increased = this.increased!
        //     let decreased = this.decreased!
        //     this.thisPeriod = upgradeTarget + (increased - (Math.floor(decreased / 10)))
            
        //     this.increasedTargetVal = this.thisPeriod
        //   }
        // });
        $("#increased-am").keyup( () => {
          let inc:any = $("#increased-am").val()
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
        $("#decreased-am").keyup( () => {
          let dec:any = $("#decreased-am").val()
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