import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-sale.html';
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
export default class OtherSale extends Vue {
    planOrReportTab !: null
    otherSaleMaterialPlanData !: MaterialPlanData;
    otherSaleMaterialData !: MaterialData;
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
        this.otherSaleMaterialPlanData = this.unitPlan.otherSaleMaterialPlanData;
        this.target = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).target : this.unitPlan.otherSaleMaterialPlanData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).dateAndAction : this.unitPlan.otherSaleMaterialPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherSaleMaterialData = this.unitReport.otherSaleMaterialData;

        this.target = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).target : this.unitReport.otherSaleMaterialData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).dateAndAction : this.unitReport.otherSaleMaterialData.dateAndAction;
        this.actual = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).actual : this.unitReport.otherSaleMaterialData.actual;
        this.comment = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).comment : this.unitReport.otherSaleMaterialData.comment;
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
        this.otherSaleMaterialPlanData.target =  this.target!;
        this.otherSaleMaterialPlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.otherSaleMaterialPlanData = this.otherSaleMaterialPlanData;
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
        this.otherSaleMaterialData.target =  this.target!;
        this.otherSaleMaterialData.dateAndAction =  this.dateAndAction!;
        this.otherSaleMaterialData.actual =  this.actual!;
        this.otherSaleMaterialData.comment =  this.comment!;
        this.unitReportModifiedData.otherSaleMaterialData = this.otherSaleMaterialData;
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
      let tab = document.querySelectorAll('.my_tab')[7] as HTMLElement
      tab.click()
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