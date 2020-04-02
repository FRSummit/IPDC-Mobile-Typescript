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
    workerPromiseThisPeriod !: any
    lastPeriod !: null
    collection !: null
    expense !: null
    nisabPaidToCentral !: null
    balance !: any
    workerPromiseIncreased !: null
    workerPromiseDecreased !: null
    comment !: null
    signalr = new SignalrWrapper();

    unitPlanReportService = new UnitPlanReportService();
    
    lastPeriodBalanceFlag = true
    workerPromiseFlag = true
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
            progressbar: false
        }
    }

    async created() {
      this.$store.state.reportStatusFromInput = 'finance-section'
      this.planOrReportTabStatus = JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status
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
        this.aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.aDayMasjidProjectFinancePlanData.action =  this.action!;
        this.aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget.amount =  this.otherSourceIncreaseTarget!;
        this.aDayMasjidProjectFinancePlanData.otherSourceAction =  this.otherSourceAction!;
        this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = this.aDayMasjidProjectFinancePlanData;
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
        this.unitReportModifiedData.aDayMasjidProjectFinanceData = this.aDayMasjidProjectFinanceData;
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
      this.$router.replace('/plan-and-report-edit/finance/masjid-table-bank')
      tab.click()
    }
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[0] as HTMLElement
      this.$router.replace('/plan-and-report-edit/finance/baitul-mal')
      tab.click()
    }
    collectedKeyEvent(i: any) {
      this.lastPeriodBalanceFlag = false
      let collected = this.collection + i.key
      let expense = this.expense!
      let nisab = this.nisabPaidToCentral!
      this.balance = collected - expense - nisab
      if(this.balance === this.lastPeriod) this.lastPeriodBalanceFlag = true
    }
    expenseKeyEvent(i: any) {
      this.lastPeriodBalanceFlag = false
      let collected = this.collection!
      let expense = this.expense + i.key
      let nisab = this.nisabPaidToCentral!
      this.balance = collected - expense - nisab
      if(this.balance === this.lastPeriod) this.lastPeriodBalanceFlag = true
    }
    nisabKeyEvent(i: any) {
      this.lastPeriodBalanceFlag = false
      let collected = this.collection!
      let expense = this.expense!
      let nisab = this.nisabPaidToCentral + i.key
      this.balance = collected - expense - nisab
      if(this.balance === this.lastPeriod) this.lastPeriodBalanceFlag = true
    }
    WorkerIncreaseKeyEvent(i: any) {
      this.workerPromiseFlag = false
      let increase = this.workerPromiseIncreased + i.key
      let decrease = this.workerPromiseDecreased!
      this.workerPromiseThisPeriod = increase - decrease
      if(this.workerPromiseIncreaseTarget === this.workerPromiseThisPeriod) this.workerPromiseFlag = true
    }
    workerDecreaseKeyEvent(i: any) {
      this.workerPromiseFlag = false
      let increase = this.workerPromiseIncreased!
      let decrease = this.workerPromiseDecreased + i.key
      this.workerPromiseThisPeriod = increase - decrease
      if(this.workerPromiseIncreaseTarget === this.workerPromiseThisPeriod) this.workerPromiseFlag = true
    }
    mounted() {
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
      if(document.getElementById('collection')!) {
        document.getElementById('collection')!.addEventListener("keydown", (e) => {
          if(this.lastPeriodBalanceFlag = true) this.lastPeriodBalanceFlag = false
          if (e.code === 'Backspace') {
            let collection = Math.floor(this.collection! / 10)
            let expense = parseFloat(this.expense!)
            let nisab = parseFloat(this.nisabPaidToCentral!)
            this.balance = collection - (expense + nisab)
          }
        });
      }
      if(document.getElementById('expense')!){
        document.getElementById('expense')!.addEventListener("keydown", (e) => {
          if(this.lastPeriodBalanceFlag = true) this.lastPeriodBalanceFlag = false
          if (e.code === 'Backspace') {
            let collection = parseFloat(this.collection!)
            let expense = Math.floor(this.expense! / 10)
            let nisab = parseFloat(this.nisabPaidToCentral!)
            this.balance = collection - (expense + nisab)
          }
        });
      }
      if(document.getElementById('nisabPaidToCentral')!){
        document.getElementById('nisabPaidToCentral')!.addEventListener("keydown", (e) => {
          if(this.lastPeriodBalanceFlag = true) this.lastPeriodBalanceFlag = false
          if (e.code === 'Backspace') {
            let collection = parseFloat(this.collection!)
            let expense = parseFloat(this.expense!)
            let nisab = Math.floor(this.nisabPaidToCentral! / 10)
            this.balance = collection - (expense + nisab)
          }
        });
      }
      if(document.getElementById('workerPromiseIncreased')!){
        document.getElementById('workerPromiseIncreased')!.addEventListener("keydown", (e) => {
          if(this.workerPromiseFlag = true) this.workerPromiseFlag = false
          if (e.code === 'Backspace') {
            let increase = Math.floor(this.workerPromiseIncreased! / 10)
            let decrease = this.workerPromiseDecreased!
            this.workerPromiseThisPeriod = increase - decrease
          }
        });}
      if(document.getElementById('workerPromiseDecreased')!){
        document.getElementById('workerPromiseDecreased')!.addEventListener("keydown", (e) => {
          if(this.workerPromiseFlag = true) this.workerPromiseFlag = false
          if (e.code === 'Backspace') {
            let increase = this.workerPromiseIncreased!
            let decrease = Math.floor(this.workerPromiseDecreased! / 10)
            this.workerPromiseThisPeriod = increase - decrease
          }
        });
      }
    }
}