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
    unitReport !: UnitReportViewModelDto
    
    unitPlanReportService = new UnitPlanReportService();
    data() {
        return {
            planOrReportTab: null,
            lastPeriod: this.associatememberReportData.lastPeriod,
            target: this.associatememberReportData.upgradeTarget,
            increased: this.associatememberReportData.increased,
            decreased: this.associatememberReportData.decreased, 
            thisPeriod: this.associatememberReportData.thisPeriod, 
            memberContact: this.associatememberReportData.personalContact, 
            comment: this.associatememberReportData.comment, 
            nameAndContactNumber: this.associatememberReportData.nameAndContactNumber, 
            action: this.associateMemberPlanData.action,
        }
    }

    backButton() {
        this.$router.push('/report-landing-swip')
    }

    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        const associateMember = this.associateMemberPlanData;
        console.log(associateMember)
        localStorage.setItem('manpowerAndPersonalContacts_associateMemberPlanData', JSON.stringify(associateMember))
      } if(this.planOrReportTab === 'REPORT') {
        const associateMember = this.associatememberReportData;
        console.log(associateMember);
        localStorage.setItem('manpowerAndPersonalContacts_associateMemberData', JSON.stringify(associateMember))
      }
    }
    async created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          this.unitPlan = await this.unitPlanReportService.getPlan(unitReportId);
          this.associateMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.target : this.unitPlan.associateMemberPlanData.upgradeTarget;
          this.associateMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.nameAndContactNumber : this.unitPlan.associateMemberPlanData.nameAndContactNumber;
          this.associateMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.action : this.unitPlan.associateMemberPlanData.action;
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          this.unitReport = await this.unitPlanReportService.getReport(unitReportId);
          this.associatememberReportData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.target : this.unitReport.associateMemberData.upgradeTarget;
          this.associatememberReportData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.nameAndContactNumber : this.unitReport.associateMemberData.nameAndContactNumber;
          this.associatememberReportData.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.action : this.unitReport.associateMemberData.action;
          this.associatememberReportData.lastPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.lastPeriod : this.unitReport.associateMemberData.lastPeriod;
          this.associatememberReportData.thisPeriod = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.thisPeriod : this.unitReport.associateMemberData.thisPeriod;
          this.associatememberReportData.increased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.increased : this.unitReport.associateMemberData.increased;
          this.associatememberReportData.decreased = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.decreased : this.unitReport.associateMemberData.decreased;
          this.associatememberReportData.comment = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.comment : this.unitReport.associateMemberData.comment;
          this.associatememberReportData.personalContact = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData') ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.memberContact : this.unitReport.associateMemberData.personalContact;
        }
    }
}