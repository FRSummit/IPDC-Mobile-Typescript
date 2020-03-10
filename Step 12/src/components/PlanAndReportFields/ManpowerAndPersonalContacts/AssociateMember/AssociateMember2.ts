import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './associate-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import {MemberPlanData} from "../../../../models/MemberPlanData";
import {MemberData} from "../../../../models/MemberData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";

@WithRender

@Component
export default class AssociateMember extends Vue {
    planOrReportTab !: null
    associateMemberPlanData !: MemberPlanData;
    associatememberReportData !: MemberData;
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
        if(this.planOrReportTab === 'REPORT') this.$router.push('/report-landing-swip-report')        
        else if(this.unitPlan.reOpenedReportStatusDescription === 'Draft') this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {

        this.associateMemberPlanData.upgradeTarget =  this.target!;
        this.associateMemberPlanData.nameAndContactNumber =  this.nameAndContactNumber!;
        this.associateMemberPlanData.action =  this.action!;
        const associateMember = this.associateMemberPlanData;
        console.log(associateMember)
        localStorage.setItem('manpowerAndPersonalContacts_associateMemberPlanData', JSON.stringify(associateMember))
      } if(this.planOrReportTab === 'REPORT') {
        const associateMember = this.associatememberReportData;
        console.log(associateMember);
        localStorage.setItem('manpowerAndPersonalContacts_associateMemberData', JSON.stringify(associateMember))
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
          this.associateMemberPlanData = this.unitPlan.associateMemberPlanData;

          console.log(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData'))
          this.target = await localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.target : this.unitPlan.associateMemberPlanData.upgradeTarget;
          this.nameAndContactNumber = await localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.nameAndContactNumber : this.unitPlan.associateMemberPlanData.nameAndContactNumber;
          this.action = await localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.action : this.unitPlan.associateMemberPlanData.action;

          console.log(this.associateMemberPlanData);
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
          this.associatememberReportData = this.unitReport.associateMemberData;
          this.target = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).upgradeTarget : this.unitReport.associateMemberData.upgradeTarget;
          this.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).nameAndContactNumber : this.unitReport.associateMemberData.nameAndContactNumber;
          this.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).action : this.unitReport.associateMemberData.action;
          this.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).lastPeriod : this.unitReport.associateMemberData.lastPeriod;
          this.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).thisPeriod : this.unitReport.associateMemberData.thisPeriod;
          this.increased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).increased : this.unitReport.associateMemberData.increased;
          this.decreased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).decreased : this.unitReport.associateMemberData.decreased;
          this.comment = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).comment : this.unitReport.associateMemberData.comment;
          this.memberContact = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).personalContact : this.unitReport.associateMemberData.personalContact;
          console.log(this.associatememberReportData);
        }
    }
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      tab.click()
    }
}