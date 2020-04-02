import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-distribution.html';
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
export default class BookDistribution extends Vue {
    planOrReportTab !: null
    bookDistributionMaterialPlanData !: MaterialPlanData;
    bookDistributionMaterialData !: MaterialData;
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

    constructor() { 
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
      this.$store.state.reportStatusFromInput = 'dawah-section'
      this.planOrReportTabStatus = JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        this.unitPlan = await this.unitPlanReportService.getPlan(this.unitReportId);
        const initialData = planDataBuilder.getPlanData(this.unitPlan);
        this.unitPlanModifiedData = this.unitPlan;
        this.initialJson = JSON.stringify(initialData);
        this.bookDistributionMaterialPlanData = this.unitPlan.bookDistributionMaterialPlanData;
        this.target = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).target : this.unitPlan.bookDistributionMaterialPlanData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).dateAndAction : this.unitPlan.bookDistributionMaterialPlanData.dateAndAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.bookDistributionMaterialData = this.unitReport.bookDistributionMaterialData;

        this.target = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).target : this.unitReport.bookDistributionMaterialData.target;
        this.dateAndAction = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).dateAndAction : this.unitReport.bookDistributionMaterialData.dateAndAction;
        this.actual = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).actual : this.unitReport.bookDistributionMaterialData.actual;
        this.comment = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData') ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).comment : this.unitReport.bookDistributionMaterialData.comment;
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
        this.bookDistributionMaterialPlanData.target =  this.target!;
        this.bookDistributionMaterialPlanData.dateAndAction =  this.dateAndAction!;
        this.unitPlanModifiedData.bookDistributionMaterialPlanData = this.bookDistributionMaterialPlanData;
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
        this.bookDistributionMaterialData.target =  this.target!;
        this.bookDistributionMaterialData.dateAndAction =  this.dateAndAction!;
        this.bookDistributionMaterialData.actual =  this.actual!;
        this.bookDistributionMaterialData.comment =  this.comment!;
        this.unitReportModifiedData.bookDistributionMaterialData = this.bookDistributionMaterialData;
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
      this.$router.replace('/plan-and-report-edit/dawah-material-distribution/audio-sale')
      tab.click()
    }
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[0] as HTMLElement
      this.$router.replace('/plan-and-report-edit/dawah-material-distribution/book-sale')
      tab.click()
    }
    mounted() {
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
    }
}