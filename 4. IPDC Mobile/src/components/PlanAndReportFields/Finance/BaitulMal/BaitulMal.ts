import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './baitul-mal.html';

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
        const baitulMal = {
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
        console.log(baitulMal)
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}