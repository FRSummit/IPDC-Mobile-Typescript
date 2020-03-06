import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './baitul-mal.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class BaitulMal extends Vue {
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
            const baitulMal = {
                baitulMalFinancePlanData: {
                    workerPromiseIncreaseTarget: this.workerPromiseIncreaseTarget,
                    action: this.action,
                    otherSourceIncreaseTarget: this.otherSourceIncreaseTarget,
                    otherSourceAction: this.otherSourceAction
                },
            };
            console.log(baitulMal)
            localStorage.setItem('finance_baitulMalFinancePlanData', JSON.stringify(baitulMal))
          } else if(this.planOrReportTab === 'REPORT') {
            const baitulMal = {
                baitulMalFinanceData: {
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
            console.log(baitulMal)
            localStorage.setItem('finance_baitulMalFinanceData', JSON.stringify(baitulMal))
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
          if(localStorage.getItem('finance_baitulMalFinancePlanData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.otherSourceAction
          } else {
              this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.baitulMalFinancePlanData.workerPromiseIncreaseTarget)
                    action.push(res.baitulMalFinancePlanData.action)
                    otherSourceIncreaseTarget.push(res.baitulMalFinancePlanData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.baitulMalFinancePlanData.otherSourceAction)
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
          if(localStorage.getItem('finance_baitulMalFinanceData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.otherSourceAction
            this.totalIncreaseTarget = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.totalIncreaseTarget
            this.workerPromiseLastPeriod = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseLastPeriod
            this.workerPromiseThisPeriod = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseThisPeriod
            this.lastPeriod = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.lastPeriod
            this.collection = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.collection
            this.expense = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.expense
            this.nisabPaidToCentral = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.nisabPaidToCentral
            this.balance = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.balance
            this.workerPromiseIncreased = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseIncreased
            this.workerPromiseDecreased = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseDecreased
            this.comment = JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.baitulMalFinanceData.workerPromiseIncreaseTarget)
                    action.push(res.baitulMalFinanceData.action)
                    otherSourceIncreaseTarget.push(res.baitulMalFinanceData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.baitulMalFinanceData.otherSourceAction)
                    totalIncreaseTarget.push(res.baitulMalFinanceData.totalIncreaseTarget)
                    workerPromiseLastPeriod.push(res.baitulMalFinanceData.workerPromiseLastPeriod)
                    workerPromiseThisPeriod.push(res.baitulMalFinanceData.workerPromiseThisPeriod)
                    lastPeriod.push(res.baitulMalFinanceData.lastPeriod)
                    collection.push(res.baitulMalFinanceData.collection)
                    expense.push(res.baitulMalFinanceData.expense)
                    nisabPaidToCentral.push(res.baitulMalFinanceData.nisabPaidToCentral)
                    balance.push(res.baitulMalFinanceData.balance)
                    workerPromiseIncreased.push(res.baitulMalFinanceData.workerPromiseIncreased)
                    workerPromiseDecreased.push(res.baitulMalFinanceData.workerPromiseDecreased)
                    comment.push(res.baitulMalFinanceData.comment)
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