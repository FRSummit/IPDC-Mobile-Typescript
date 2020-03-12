import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './masjid-table-bank.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {FinancePlanData} from "../../../../models/FinancePlanData";
import {FinanceData} from "../../../../models/FinanceData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class MasjidTableBank extends Vue {
    planOrReportTab !: null
    masjidTableBankFinancePlanData !: FinancePlanData;
    masjidTableBankFinanceData !: FinanceData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    workerPromiseIncreaseTarget !: null
    action !: null
    otherSourceIncreaseTarget !: null
    otherSourceAction !: null
    totalIncreaseTarget !: null
    workerPromiseLastPeriod !: null
    workerPromiseThisPeriod !: null
    lastPeriod !: null
    collection !: null
    expense !: null
    nisabPaidToCentral !: null
    balance !: null
    workerPromiseIncreased !: null
    workerPromiseDecreased !: null
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
            workerPromiseIncreaseTarget: null,
            action: null,
            otherSourceIncreaseTarget: null,
            otherSourceAction: null, 
            totalIncreaseTarget: null, 
            workerPromiseLastPeriod: null, 
            workerPromiseThisPeriod: null, 
            lastPeriod: null, 
            collection: null,
            expense: null,
            nisabPaidToCentral: null,
            balance: null,
            workerPromiseIncreased: null,
            workerPromiseDecreased: null,
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
        this.masjidTableBankFinancePlanData = this.unitPlan.masjidTableBankFinancePlanData;
        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_masjidTableBankFinancePlanData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).workerPromiseIncreaseTarget : this.unitPlan.masjidTableBankFinancePlanData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_masjidTableBankFinancePlanData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).action : this.unitPlan.masjidTableBankFinancePlanData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_masjidTableBankFinancePlanData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).otherSourceIncreaseTarget : this.unitPlan.masjidTableBankFinancePlanData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_masjidTableBankFinancePlanData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).otherSourceAction : this.unitPlan.masjidTableBankFinancePlanData.otherSourceAction;
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.masjidTableBankFinanceData = this.unitReport.masjidTableBankFinanceData;
        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).workerPromiseIncreaseTarget : this.unitReport.masjidTableBankFinanceData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).action : this.unitReport.masjidTableBankFinanceData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).otherSourceIncreaseTarget : this.unitReport.masjidTableBankFinanceData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).otherSourceAction : this.unitReport.masjidTableBankFinanceData.otherSourceAction;
        this.totalIncreaseTarget = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).totalIncreaseTarget : this.unitReport.masjidTableBankFinanceData.totalIncreaseTarget.amount;
        this.workerPromiseLastPeriod = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).workerPromiseLastPeriod : this.unitReport.masjidTableBankFinanceData.workerPromiseLastPeriod.amount;
        this.workerPromiseThisPeriod = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).workerPromiseThisPeriod : this.unitReport.masjidTableBankFinanceData.workerPromiseThisPeriod.amount;
        this.lastPeriod = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).lastPeriod : this.unitReport.masjidTableBankFinanceData.lastPeriod.amount;
        this.collection = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).collection : this.unitReport.masjidTableBankFinanceData.collection.amount;
        this.expense = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).expense : this.unitReport.masjidTableBankFinanceData.expense.amount;
        this.nisabPaidToCentral = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).nisabPaidToCentral : this.unitReport.masjidTableBankFinanceData.nisabPaidToCentral.amount;
        this.balance = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).balance : this.unitReport.masjidTableBankFinanceData.balance.amount;
        this.workerPromiseIncreased = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).workerPromiseIncreased : this.unitReport.masjidTableBankFinanceData.workerPromiseIncreased.amount;
        this.workerPromiseDecreased = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).workerPromiseDecreased : this.unitReport.masjidTableBankFinanceData.workerPromiseDecreased.amount;
        this.comment = localStorage.getItem('finance_masjidTableBankFinanceData') ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).comment : this.unitReport.masjidTableBankFinanceData.comment;
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
        if(this.planOrReportTab === 'REPORT') 
        this.$router.push('/report-landing-swip-report')        
        else if(this.$store.state.reportStatus === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.unitPlanModifiedData = await this.unitPlanReportService.getPlan(this.unitReportId);
        this.masjidTableBankFinancePlanData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.masjidTableBankFinancePlanData.action =  this.action!;
        this.masjidTableBankFinancePlanData.otherSourceIncreaseTarget.amount =  this.otherSourceIncreaseTarget!;
        this.masjidTableBankFinancePlanData.otherSourceAction =  this.otherSourceAction!;
        this.unitPlanModifiedData.masjidTableBankFinancePlanData = this.masjidTableBankFinancePlanData;
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

        this.masjidTableBankFinanceData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.masjidTableBankFinanceData.action = this.action!;
        this.masjidTableBankFinanceData.otherSourceIncreaseTarget.amount = this.otherSourceIncreaseTarget!;
        this.masjidTableBankFinanceData.otherSourceAction = this.otherSourceAction!;
        this.masjidTableBankFinanceData.totalIncreaseTarget.amount =  this.totalIncreaseTarget!;
        this.masjidTableBankFinanceData.workerPromiseLastPeriod.amount = this.workerPromiseLastPeriod!;
        this.masjidTableBankFinanceData.workerPromiseThisPeriod.amount = this.workerPromiseThisPeriod!;
        this.masjidTableBankFinanceData.lastPeriod.amount = this.lastPeriod!;
        this.masjidTableBankFinanceData.collection.amount = this.collection!;
        this.masjidTableBankFinanceData.expense.amount = this.expense!;
        this.masjidTableBankFinanceData.nisabPaidToCentral.amount = this.nisabPaidToCentral!;
        this.masjidTableBankFinanceData.balance.amount = this.balance!;
        this.masjidTableBankFinanceData.workerPromiseIncreased.amount =  this.workerPromiseIncreased!;
        this.masjidTableBankFinanceData.workerPromiseDecreased.amount =  this.workerPromiseDecreased!;
        this.masjidTableBankFinanceData.comment = this.comment!;
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
      this.$router.push('/plan-and-report-edit/social-welfare/Qard-e-Hasana')
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