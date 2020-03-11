import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './baitul-mal.html';
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
export default class BaitulMal extends Vue {
    planOrReportTab !: null
    baitulMalFinancePlanData !: FinancePlanData;
    baitulMalFinanceData !: FinanceData;
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
        this.baitulMalFinancePlanData = this.unitPlan.baitulMalFinancePlanData;

        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_baitulMalFinancePlanData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).workerPromiseIncreaseTarget : this.unitPlan.baitulMalFinancePlanData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_baitulMalFinancePlanData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).action : this.unitPlan.baitulMalFinancePlanData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_baitulMalFinancePlanData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).otherSourceIncreaseTarget : this.unitPlan.baitulMalFinancePlanData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_baitulMalFinancePlanData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).otherSourceAction : this.unitPlan.baitulMalFinancePlanData.otherSourceAction;
        if(this.unitPlan.reportStatusDescription === 'PlanPromoted' || this.unitPlan.reportStatusDescription === 'Submitted'){
          this.planInputReadable()
        }

      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.baitulMalFinanceData = this.unitReport.baitulMalFinanceData;

        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).workerPromiseIncreaseTarget : this.unitReport.baitulMalFinanceData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).action : this.unitReport.baitulMalFinanceData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).otherSourceIncreaseTarget : this.unitReport.baitulMalFinanceData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).otherSourceAction : this.unitReport.baitulMalFinanceData.otherSourceAction;
        this.totalIncreaseTarget = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).totalIncreaseTarget : this.unitReport.baitulMalFinanceData.totalIncreaseTarget.amount;
        this.workerPromiseLastPeriod = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).workerPromiseLastPeriod : this.unitReport.baitulMalFinanceData.workerPromiseLastPeriod.amount;
        this.workerPromiseThisPeriod = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).workerPromiseThisPeriod : this.unitReport.baitulMalFinanceData.workerPromiseThisPeriod.amount;
        this.lastPeriod = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).lastPeriod : this.unitReport.baitulMalFinanceData.lastPeriod.amount;
        this.collection = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).collection : this.unitReport.baitulMalFinanceData.collection.amount;
        this.expense = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).expense : this.unitReport.baitulMalFinanceData.expense.amount;
        this.nisabPaidToCentral = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).nisabPaidToCentral : this.unitReport.baitulMalFinanceData.nisabPaidToCentral.amount;
        this.balance = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).balance : this.unitReport.baitulMalFinanceData.balance.amount;
        this.workerPromiseIncreased = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).workerPromiseIncreased : this.unitReport.baitulMalFinanceData.workerPromiseIncreased.amount;
        this.workerPromiseDecreased = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).workerPromiseDecreased : this.unitReport.baitulMalFinanceData.workerPromiseDecreased.amount;
        this.comment = localStorage.getItem('finance_baitulMalFinanceData') ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).comment : this.unitReport.baitulMalFinanceData.comment;
        if(this.unitReport.reportStatusDescription === 'Submitted'){
          this.reportInputReadable()
        }
        //
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
        else if(this.unitPlan.reOpenedReportStatusDescription === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.baitulMalFinancePlanData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.baitulMalFinancePlanData.action =  this.action!;
        this.baitulMalFinancePlanData.otherSourceIncreaseTarget.amount =  this.otherSourceIncreaseTarget!;
        this.baitulMalFinancePlanData.otherSourceAction =  this.otherSourceAction!;
        this.unitPlanModifiedData.baitulMalFinancePlanData = this.baitulMalFinancePlanData;

        if (!this.isPlanDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
            ons.notification.alert('Plan Updated',{title :''}); 
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
        }

      } if(this.planOrReportTab === 'REPORT') {

        this.baitulMalFinanceData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.baitulMalFinanceData.action = this.action!;
        this.baitulMalFinanceData.otherSourceIncreaseTarget.amount = this.otherSourceIncreaseTarget!;
        this.baitulMalFinanceData.otherSourceAction = this.otherSourceAction!;
        this.baitulMalFinanceData.totalIncreaseTarget.amount =  this.totalIncreaseTarget!;
        this.baitulMalFinanceData.workerPromiseLastPeriod.amount = this.workerPromiseLastPeriod!;
        this.baitulMalFinanceData.workerPromiseThisPeriod.amount = this.workerPromiseThisPeriod!;
        this.baitulMalFinanceData.lastPeriod.amount = this.lastPeriod!;
        this.baitulMalFinanceData.collection.amount = this.collection!;
        this.baitulMalFinanceData.expense.amount = this.expense!;
        this.baitulMalFinanceData.nisabPaidToCentral.amount = this.nisabPaidToCentral!;
        this.baitulMalFinanceData.balance.amount = this.balance!;
        this.baitulMalFinanceData.workerPromiseIncreased.amount =  this.workerPromiseIncreased!;
        this.baitulMalFinanceData.workerPromiseDecreased.amount =  this.workerPromiseDecreased!;
        this.baitulMalFinanceData.comment = this.comment!;
        
        //this.unitReportModifiedData.baitulMalFinanceData = this.baitulMalFinanceData;

        if (!this.isReportDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
            ons.notification.alert('Report Updated',{title :''});
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
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
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      tab.click()
    }

    onUnitPlanUpdated = async (id: number) => {
  }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }

    planInputReadable() {
    }

    reportInputReadable() {
    }
   
}