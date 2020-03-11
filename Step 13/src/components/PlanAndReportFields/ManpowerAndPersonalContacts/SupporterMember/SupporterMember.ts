import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './supporter-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";

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
        this.supporterMemberPlanData.upgradeTarget =  this.target!;
        this.supporterMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.supporterMemberPlanData.action =  this.action!;
        localStorage.setItem('manpowerAndPersonalContacts_supporterMemberPlanData', JSON.stringify(this.supporterMemberPlanData))
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
        localStorage.setItem('manpowerAndPersonalContacts_supporterMemberData', JSON.stringify(this.supporterMemberReportData))
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
          this.supporterMemberPlanData = this.unitPlan.supporterMemberPlanData;
          this.target = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).upgradeTarget : this.unitPlan.supporterMemberPlanData.upgradeTarget;
          this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).nameAndContactNumber : this.unitPlan.supporterMemberPlanData.nameAndContactNumber;
          this.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).action : this.unitPlan.supporterMemberPlanData.action;
          console.log(this.supporterMemberPlanData);
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
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
          console.log(this.supporterMemberReportData);
        }
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[3] as HTMLElement
      tab.click()
    }
}