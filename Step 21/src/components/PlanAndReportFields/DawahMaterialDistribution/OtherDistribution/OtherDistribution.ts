import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {MaterialPlanData} from "../../../../models/MaterialPlanData";
import {MaterialData} from "../../../../models/MaterialData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class OtherDistribution extends Vue {
    planOrReportTab !: null
    otherDistributionMaterialPlanData !: MaterialPlanData;
    otherDistributionMaterialData !: MaterialData;
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
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
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
        this.otherDistributionMaterialPlanData = this.unitPlan.otherDistributionMaterialPlanData;
        this.target = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).target : this.unitPlan.otherDistributionMaterialPlanData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).dateAndAction : this.unitPlan.otherDistributionMaterialPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherDistributionMaterialData = this.unitReport.otherDistributionMaterialData;

        this.target = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).target : this.unitReport.otherDistributionMaterialData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).dateAndAction : this.unitReport.otherDistributionMaterialData.dateAndAction;
        this.actual = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).actual : this.unitReport.otherDistributionMaterialData.actual;
        this.comment = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).comment : this.unitReport.otherDistributionMaterialData.comment;
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
        else if(this.$store.state.reportStatus === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.unitPlanModifiedData = await this.unitPlanReportService.getPlan(this.unitReportId);
        this.otherDistributionMaterialPlanData.target =  this.target!;
        this.otherDistributionMaterialPlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.otherDistributionMaterialPlanData = this.otherDistributionMaterialPlanData;
        if (this.isPlanDirty) {
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
              ons.notification.alert('Plan Updated',{title :''}); 
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
        }
        else{
          ons.notification.alert('Nothing to change',{title :''});
        }
      } if(this.planOrReportTab === 'REPORT') {
        this.unitReportModifiedData = await this.unitPlanReportService.getReport(this.unitReportId);
        this.otherDistributionMaterialData.target =  this.target!;
        this.otherDistributionMaterialData.dateAndAction =  this.dateAndAction!;
        this.otherDistributionMaterialData.actual =  this.actual!;
        this.otherDistributionMaterialData.comment =  this.comment!;
        this.unitReportModifiedData.otherDistributionMaterialData = this.otherDistributionMaterialData;
        if (this.isReportDirty){
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
              ons.notification.alert('Report Updated',{title :''});
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
        }
        else{
          ons.notification.alert('Nothing to change',{title :''});
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
      this.$router.push('/plan-and-report-edit/finance/baitul-mal')
    }

    onUnitPlanUpdated = async (id: number) => {
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }
    isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (this.$store.state.reportStatus === 'PlanPromoted' || this.$store.state.reportStatus === 'Submitted')) {
        return true
      } else if (tabActivationForPlanOrReport === 'REPORT' && this.$store.state.reportStatus === 'Submitted') {
        return true
      }
    }
}