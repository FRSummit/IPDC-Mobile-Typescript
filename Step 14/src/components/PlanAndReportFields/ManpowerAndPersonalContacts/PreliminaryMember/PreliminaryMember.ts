import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './preliminary-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";

@WithRender

@Component
export default class PreliminaryMember extends Vue {
    planOrReportTab !: null
    preliminaryMemberPlanData !: MemberPlanData;
    preliminaryMemberReportData !: MemberData;
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

        this.preliminaryMemberPlanData.upgradeTarget =  this.target!;
        this.preliminaryMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.preliminaryMemberPlanData.action =  this.action!;
        localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberPlanData', JSON.stringify(this.preliminaryMemberPlanData))
      } if(this.planOrReportTab === 'REPORT') {
        this.preliminaryMemberReportData.upgradeTarget =  this.target!;
        this.preliminaryMemberReportData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.preliminaryMemberReportData.action =  this.action!;
        this.preliminaryMemberReportData.lastPeriod =  this.lastPeriod!;
        this.preliminaryMemberReportData.thisPeriod =  this.thisPeriod!;
        this.preliminaryMemberReportData.increased =  this.increased!;
        this.preliminaryMemberReportData.decreased =  this.decreased!;
        this.preliminaryMemberReportData.comment =  this.comment!;
        this.preliminaryMemberReportData.personalContact =  this.memberContact!;
        localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberData', JSON.stringify(this.preliminaryMemberReportData))
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
          this.preliminaryMemberPlanData = this.unitPlan.preliminaryMemberPlanData;
          this.target = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).upgradeTarget : this.unitPlan.preliminaryMemberPlanData.upgradeTarget;
          this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).nameAndContactNumber : this.unitPlan.preliminaryMemberPlanData.nameAndContactNumber;
          this.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).action : this.unitPlan.preliminaryMemberPlanData.action;
          console.log(this.preliminaryMemberPlanData);
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
          this.preliminaryMemberReportData = this.unitReport.preliminaryMemberData;
          this.target = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).upgradeTarget : this.unitReport.preliminaryMemberData.upgradeTarget;
          this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).nameAndContactNumber : this.unitReport.preliminaryMemberData.nameAndContactNumber;
          this.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).action : this.unitReport.preliminaryMemberData.action;
          this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).lastPeriod : this.unitReport.preliminaryMemberData.lastPeriod;
          this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).thisPeriod : this.unitReport.preliminaryMemberData.thisPeriod;
          this.increased = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).increased : this.unitReport.preliminaryMemberData.increased;
          this.decreased = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).decreased : this.unitReport.preliminaryMemberData.decreased;
          this.comment = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).comment : this.unitReport.preliminaryMemberData.comment;
          this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).personalContact : this.unitReport.preliminaryMemberData.personalContact;
          console.log(this.preliminaryMemberReportData);
        }
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      tab.click()
    }
}