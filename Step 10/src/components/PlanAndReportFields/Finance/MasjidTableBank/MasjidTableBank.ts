import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './masjid-table-bank.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class MasjidTableBank extends Vue {
    planOrReportTab !: null
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
    unitPlanReportService = new UnitPlanReportService();
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
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        if(this.planOrReportTab === 'PLAN') {
            const masjidTableBank = {
                masjidTableBankFinancePlanData: {
                    workerPromiseIncreaseTarget: this.workerPromiseIncreaseTarget,
                    action: this.action,
                    otherSourceIncreaseTarget: this.otherSourceIncreaseTarget,
                    otherSourceAction: this.otherSourceAction
                },
            };
            console.log(masjidTableBank)
            localStorage.setItem('finance_masjidTableBankFinancePlanData', JSON.stringify(masjidTableBank))
          } else if(this.planOrReportTab === 'REPORT') {
            const masjidTableBank = {
                masjidTableBankFinanceData: {
                    workerPromiseIncreaseTarget: this.workerPromiseIncreaseTarget,
                    action: this.action,
                    otherSourceIncreaseTarget: this.otherSourceIncreaseTarget,
                    otherSourceAction: this.otherSourceAction,
                    totalIncreaseTarget: this.totalIncreaseTarget,
                    workerPromiseLastPeriod: this.workerPromiseLastPeriod,
                    workerPromiseThisPeriod: this.workerPromiseThisPeriod,
                    lastPeriod: this.lastPeriod,
                    collection: this.collection,
                    expense: this.expense,
                    nisabPaidToCentral: this.nisabPaidToCentral,
                    balance: this.balance,
                    workerPromiseIncreased: this.workerPromiseIncreased,
                    workerPromiseDecreased: this.workerPromiseDecreased,
                    comment: this.comment
                }
            };
            console.log(masjidTableBank)
            localStorage.setItem('finance_masjidTableBankFinanceData', JSON.stringify(masjidTableBank))
          }
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
        if(tabActivationForPlanOrReport === 'PLAN') {
          let workerPromiseIncreaseTarget: any = []
          let action: any = []
          let otherSourceIncreaseTarget: any = []
          let otherSourceAction: any = []
          if(localStorage.getItem('finance_masjidTableBankFinancePlanData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.otherSourceAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.masjidTableBankFinancePlanData.workerPromiseIncreaseTarget)
                    action.push(res.masjidTableBankFinancePlanData.action)
                    otherSourceIncreaseTarget.push(res.masjidTableBankFinancePlanData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.masjidTableBankFinancePlanData.otherSourceAction)
                  })
                  this.workerPromiseIncreaseTarget = workerPromiseIncreaseTarget
                  this.action = action
                  this.otherSourceIncreaseTarget = otherSourceIncreaseTarget
                  this.otherSourceAction = otherSourceAction
          }
        } else if(tabActivationForPlanOrReport === 'REPORT') {
          let workerPromiseIncreaseTarget: any = []
          let action: any = []
          let otherSourceIncreaseTarget: any = []
          let otherSourceAction: any = []
          let totalIncreaseTarget: any = []
          let workerPromiseLastPeriod: any = []
          let workerPromiseThisPeriod: any = []
          let lastPeriod: any = []
          let collection: any = []
          let expense: any = []
          let nisabPaidToCentral: any = []
          let balance: any = []
          let workerPromiseIncreased: any = []
          let workerPromiseDecreased: any = []
          let comment: any = []
          if(localStorage.getItem('finance_masjidTableBankFinanceData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.otherSourceAction
            this.totalIncreaseTarget = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.totalIncreaseTarget
            this.workerPromiseLastPeriod = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseLastPeriod
            this.workerPromiseThisPeriod = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseThisPeriod
            this.lastPeriod = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.lastPeriod
            this.collection = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.collection
            this.expense = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.expense
            this.nisabPaidToCentral = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.nisabPaidToCentral
            this.balance = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.balance
            this.workerPromiseIncreased = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseIncreased
            this.workerPromiseDecreased = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseDecreased
            this.comment = JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.masjidTableBankFinanceData.workerPromiseIncreaseTarget)
                    action.push(res.masjidTableBankFinanceData.action)
                    otherSourceIncreaseTarget.push(res.masjidTableBankFinanceData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.masjidTableBankFinanceData.otherSourceAction)
                    totalIncreaseTarget.push(res.masjidTableBankFinanceData.totalIncreaseTarget)
                    workerPromiseLastPeriod.push(res.masjidTableBankFinanceData.workerPromiseLastPeriod)
                    workerPromiseThisPeriod.push(res.masjidTableBankFinanceData.workerPromiseThisPeriod)
                    lastPeriod.push(res.masjidTableBankFinanceData.lastPeriod)
                    collection.push(res.masjidTableBankFinanceData.collection)
                    expense.push(res.masjidTableBankFinanceData.expense)
                    nisabPaidToCentral.push(res.masjidTableBankFinanceData.nisabPaidToCentral)
                    balance.push(res.masjidTableBankFinanceData.balance)
                    workerPromiseIncreased.push(res.masjidTableBankFinanceData.workerPromiseIncreased)
                    workerPromiseDecreased.push(res.masjidTableBankFinanceData.workerPromiseDecreased)
                    comment.push(res.masjidTableBankFinanceData.comment)
                  })
                  this.workerPromiseIncreaseTarget = workerPromiseIncreaseTarget
                  this.action = action
                  this.otherSourceIncreaseTarget = otherSourceIncreaseTarget
                  this.otherSourceAction = otherSourceAction
                  this.totalIncreaseTarget = totalIncreaseTarget
                  this.workerPromiseLastPeriod = workerPromiseLastPeriod
                  this.workerPromiseThisPeriod = workerPromiseThisPeriod
                  this.lastPeriod = lastPeriod
                  this.collection = collection
                  this.expense = expense
                  this.nisabPaidToCentral = nisabPaidToCentral
                  this.balance = balance
                  this.workerPromiseIncreased = workerPromiseIncreased
                  this.workerPromiseDecreased = workerPromiseDecreased
                  this.comment = comment
          }
        }
    }
}