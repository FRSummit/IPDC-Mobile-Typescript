import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './masjid-project.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class MasjidProject extends Vue {
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
            const masjidProject = {
                aDayMasjidProjectFinancePlanData: {
                    workerPromiseIncreaseTarget: this.workerPromiseIncreaseTarget,
                    action: this.action,
                    otherSourceIncreaseTarget: this.otherSourceIncreaseTarget,
                    otherSourceAction: this.otherSourceAction
                },
            };
            console.log(masjidProject)
            localStorage.setItem('finance_aDayMasjidProjectFinancePlanData', JSON.stringify(masjidProject))
          } else if(this.planOrReportTab === 'REPORT') {
            const masjidProject = {
                aDayMasjidProjectFinanceData: {
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
            console.log(masjidProject)
            localStorage.setItem('finance_aDayMasjidProjectFinanceData', JSON.stringify(masjidProject))
          }
          this.changeTab()
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
          if(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.otherSourceAction
          } else {
            this.unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget)
                    action.push(res.aDayMasjidProjectFinancePlanData.action)
                    otherSourceIncreaseTarget.push(res.aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.aDayMasjidProjectFinancePlanData.otherSourceAction)
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
          if(localStorage.getItem('finance_aDayMasjidProjectFinanceData')) {
            this.workerPromiseIncreaseTarget = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget
            this.action = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.action
            this.otherSourceIncreaseTarget = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.otherSourceIncreaseTarget
            this.otherSourceAction = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.otherSourceAction
            this.totalIncreaseTarget = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.totalIncreaseTarget
            this.workerPromiseLastPeriod = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseLastPeriod
            this.workerPromiseThisPeriod = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseThisPeriod
            this.lastPeriod = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.lastPeriod
            this.collection = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.collection
            this.expense = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.expense
            this.nisabPaidToCentral = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.nisabPaidToCentral
            this.balance = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.balance
            this.workerPromiseIncreased = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseIncreased
            this.workerPromiseDecreased = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseDecreased
            this.comment = JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.comment
          } else {
            this.unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    workerPromiseIncreaseTarget.push(res.aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget)
                    action.push(res.aDayMasjidProjectFinanceData.action)
                    otherSourceIncreaseTarget.push(res.aDayMasjidProjectFinanceData.otherSourceIncreaseTarget)
                    otherSourceAction.push(res.aDayMasjidProjectFinanceData.otherSourceAction)
                    totalIncreaseTarget.push(res.aDayMasjidProjectFinanceData.totalIncreaseTarget)
                    workerPromiseLastPeriod.push(res.aDayMasjidProjectFinanceData.workerPromiseLastPeriod)
                    workerPromiseThisPeriod.push(res.aDayMasjidProjectFinanceData.workerPromiseThisPeriod)
                    lastPeriod.push(res.aDayMasjidProjectFinanceData.lastPeriod)
                    collection.push(res.aDayMasjidProjectFinanceData.collection)
                    expense.push(res.aDayMasjidProjectFinanceData.expense)
                    nisabPaidToCentral.push(res.aDayMasjidProjectFinanceData.nisabPaidToCentral)
                    balance.push(res.aDayMasjidProjectFinanceData.balance)
                    workerPromiseIncreased.push(res.aDayMasjidProjectFinanceData.workerPromiseIncreased)
                    workerPromiseDecreased.push(res.aDayMasjidProjectFinanceData.workerPromiseDecreased)
                    comment.push(res.aDayMasjidProjectFinanceData.comment)
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
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      tab.click()
    }
}