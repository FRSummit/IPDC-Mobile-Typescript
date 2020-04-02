import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './patient-visit.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {SocialWelfarePlanData} from "../../../../models/SocialWelfarePlanData";
import {SocialWelfareData} from "../../../../models/SocialWelfareData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class PatientVisit extends Vue {
    planOrReportTab !: null
    patientVisitSocialWelfarePlanData !: SocialWelfarePlanData;
    patientVisitSocialWelfareData !: SocialWelfareData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null
    signalr = new SignalrWrapper();
    unitPlanReportService = new UnitPlanReportService();

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
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
            progressbar: false
        }
    }
    async created() {
      this.$store.state.reportStatusFromInput = 'social-section'
      this.planOrReportTabStatus = JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        this.unitPlan = await this.unitPlanReportService.getPlan(this.unitReportId);
        const initialData = planDataBuilder.getPlanData(this.unitPlan);
        this.unitPlanModifiedData = this.unitPlan;
        this.initialJson = JSON.stringify(initialData);
        this.patientVisitSocialWelfarePlanData = this.unitPlan.patientVisitSocialWelfarePlanData;
        this.target = localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).target : this.unitPlan.patientVisitSocialWelfarePlanData.target;
        this.dateAndAction = localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).dateAndAction : this.unitPlan.patientVisitSocialWelfarePlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.patientVisitSocialWelfareData = this.unitReport.patientVisitSocialWelfareData;
        this.target = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).target : this.unitReport.patientVisitSocialWelfareData.target;
        this.dateAndAction = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).dateAndAction : this.unitReport.patientVisitSocialWelfareData.dateAndAction;
        this.actual = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).actual : this.unitReport.patientVisitSocialWelfareData.actual;
        this.comment = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).comment : this.unitReport.patientVisitSocialWelfareData.comment;
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
        this.patientVisitSocialWelfarePlanData.target =  this.target!;
        this.patientVisitSocialWelfarePlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.patientVisitSocialWelfarePlanData = this.patientVisitSocialWelfarePlanData;
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
        this.patientVisitSocialWelfareData.target =  this.target!;
        this.patientVisitSocialWelfareData.dateAndAction =  this.dateAndAction!;
        this.patientVisitSocialWelfareData.actual =  this.actual!;
        this.patientVisitSocialWelfareData.comment =  this.comment!;
        this.unitReportModifiedData.patientVisitSocialWelfareData = this.patientVisitSocialWelfareData;
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
      this.$router.replace('/plan-and-report-edit/social-welfare/Social-Visit')
      tab.click()
    }
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[0] as HTMLElement
      this.$router.replace('/plan-and-report-edit/social-welfare/Qard-e-Hasana')
      tab.click()
    }
    mounted() {
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
    }
}