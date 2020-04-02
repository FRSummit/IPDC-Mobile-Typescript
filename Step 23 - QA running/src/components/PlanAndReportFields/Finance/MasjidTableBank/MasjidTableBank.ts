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
        this.masjidTableBankFinancePlanData.workerPromiseIncreaseTarget.amount =  this.workerPromiseIncreaseTarget!;
        this.masjidTableBankFinancePlanData.action =  this.action!;
        this.masjidTableBankFinancePlanData.otherSourceIncreaseTarget.amount =  this.otherSourceIncreaseTarget!;
        this.masjidTableBankFinancePlanData.otherSourceAction =  this.otherSourceAction!;
        this.unitPlanModifiedData.masjidTableBankFinancePlanData = this.masjidTableBankFinancePlanData;
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
        this.unitReportModifiedData.masjidTableBankFinanceData = this.masjidTableBankFinanceData;
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
      this.$router.push('/plan-and-report-edit/social-welfare/Qard-e-Hasana')
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
    previousBtn() {
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      this.$router.replace('/plan-and-report-edit/finance/masjid-project')
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