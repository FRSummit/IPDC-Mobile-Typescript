import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";

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

    backButton() {
        // this.$router.push('/report-landing-swip')
        let id: any = localStorage.getItem('planandreports_passing_unit_id');
        this.unitPlanReportService
          .getPlan(id)
          .then(res => {
            if(res.reportStatusDescription === 'Draft') this.$router.push('/report-landing-plan')
            else if(this.planOrReportTab === 'REPORT') this.$router.push('/report-landing-swip-report')
            else this.$router.push('/report-landing-swip')
          })
    }

    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {

        this.memberMemberPlanData.upgradeTarget =  this.target!;
        this.memberMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.memberMemberPlanData.action =  this.action!;
        localStorage.setItem('manpowerAndPersonalContacts_memberMemberPlanData', JSON.stringify(this.memberMemberPlanData))
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
        localStorage.setItem('manpowerAndPersonalContacts_memberMemberData', JSON.stringify(this.memberMemberReportData))
      }
      this.changeTab()
    }
    async created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          this.unitPlan = await this.unitPlanReportService.getPlan(unitReportId);
          this.memberMemberPlanData = this.unitPlan.memberMemberPlanData;
          this.target = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).upgradeTarget : this.unitPlan.memberMemberPlanData.upgradeTarget;
          this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).nameAndContactNumber : this.unitPlan.memberMemberPlanData.nameAndContactNumber;
          this.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).action : this.unitPlan.memberMemberPlanData.action;
          console.log(this.memberMemberPlanData);
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
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
          console.log(this.memberMemberReportData);
        }
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      tab.click()
    }
}