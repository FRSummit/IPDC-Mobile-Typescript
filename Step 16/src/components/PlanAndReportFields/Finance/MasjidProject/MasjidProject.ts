import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './masjid-project.html';
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
export default class MasjidProject extends Vue {
    planOrReportTab !: null
    aDayMasjidProjectFinancePlanData !: FinancePlanData;
    aDayMasjidProjectFinanceData !: FinanceData;
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
        this.aDayMasjidProjectFinancePlanData = this.unitPlan.aDayMasjidProjectFinancePlanData;

        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).workerPromiseIncreaseTarget : this.unitPlan.aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).action : this.unitPlan.aDayMasjidProjectFinancePlanData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).otherSourceIncreaseTarget : this.unitPlan.aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).otherSourceAction : this.unitPlan.aDayMasjidProjectFinancePlanData.otherSourceAction;
        if(this.unitPlan.reportStatusDescription === 'PlanPromoted' || this.unitPlan.reportStatusDescription === 'Submitted'){
          this.planInputReadable()
        }

      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.aDayMasjidProjectFinanceData = this.unitReport.aDayMasjidProjectFinanceData;

        this.workerPromiseIncreaseTarget = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).workerPromiseIncreaseTarget : this.unitReport.aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget.amount;
        this.action = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).action : this.unitReport.aDayMasjidProjectFinanceData.action;
        this.otherSourceIncreaseTarget = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).otherSourceIncreaseTarget : this.unitReport.aDayMasjidProjectFinanceData.otherSourceIncreaseTarget.amount;
        this.otherSourceAction = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).otherSourceAction : this.unitReport.aDayMasjidProjectFinanceData.otherSourceAction;
        this.totalIncreaseTarget = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).totalIncreaseTarget : this.unitReport.aDayMasjidProjectFinanceData.totalIncreaseTarget.amount;
        this.workerPromiseLastPeriod = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).workerPromiseLastPeriod : this.unitReport.aDayMasjidProjectFinanceData.workerPromiseLastPeriod.amount;
        this.workerPromiseThisPeriod = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).workerPromiseThisPeriod : this.unitReport.aDayMasjidProjectFinanceData.workerPromiseThisPeriod.amount;
        this.lastPeriod = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).lastPeriod : this.unitReport.aDayMasjidProjectFinanceData.lastPeriod.amount;
        this.collection = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).collection : this.unitReport.aDayMasjidProjectFinanceData.collection.amount;
        this.expense = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).expense : this.unitReport.aDayMasjidProjectFinanceData.expense.amount;
        this.nisabPaidToCentral = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).nisabPaidToCentral : this.unitReport.aDayMasjidProjectFinanceData.nisabPaidToCentral.amount;
        this.balance = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).balance : this.unitReport.aDayMasjidProjectFinanceData.balance.amount;
        this.workerPromiseIncreased = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).workerPromiseIncreased : this.unitReport.aDayMasjidProjectFinanceData.workerPromiseIncreased.amount;
        this.workerPromiseDecreased = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).workerPromiseDecreased : this.unitReport.aDayMasjidProjectFinanceData.workerPromiseDecreased.amount;
        this.comment = localStorage.getItem('finance_aDayMasjidProjectFinanceData') ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).comment : this.unitReport.aDayMasjidProjectFinanceData.comment;
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
        this.aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.aDayMasjidProjectFinancePlanData.action =  this.action!;
        this.aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget.amount =  this.otherSourceIncreaseTarget!;
        this.aDayMasjidProjectFinancePlanData.otherSourceAction =  this.otherSourceAction!;
        this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = this.aDayMasjidProjectFinancePlanData;

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

        this.aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.aDayMasjidProjectFinanceData.action = this.action!;
        this.aDayMasjidProjectFinanceData.otherSourceIncreaseTarget.amount = this.otherSourceIncreaseTarget!;
        this.aDayMasjidProjectFinanceData.otherSourceAction = this.otherSourceAction!;
        this.aDayMasjidProjectFinanceData.totalIncreaseTarget.amount =  this.totalIncreaseTarget!;
        this.aDayMasjidProjectFinanceData.workerPromiseLastPeriod.amount = this.workerPromiseLastPeriod!;
        this.aDayMasjidProjectFinanceData.workerPromiseThisPeriod.amount = this.workerPromiseThisPeriod!;
        this.aDayMasjidProjectFinanceData.lastPeriod.amount = this.lastPeriod!;
        this.aDayMasjidProjectFinanceData.collection.amount = this.collection!;
        this.aDayMasjidProjectFinanceData.expense.amount = this.expense!;
        this.aDayMasjidProjectFinanceData.nisabPaidToCentral.amount = this.nisabPaidToCentral!;
        this.aDayMasjidProjectFinanceData.balance.amount = this.balance!;
        this.aDayMasjidProjectFinanceData.workerPromiseIncreased.amount =  this.workerPromiseIncreased!;
        this.aDayMasjidProjectFinanceData.workerPromiseDecreased.amount =  this.workerPromiseDecreased!;
        this.aDayMasjidProjectFinanceData.comment = this.comment!;
        
        //this.unitReportModifiedData.aDayMasjidProjectFinanceData = this.aDayMasjidProjectFinanceData;

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
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
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