import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './masjid-project.html';

@WithRender

@Component
export default class MasjidProject extends Vue {
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
            planOrReportTab: 'REPORT',
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
        const masjidProject = {
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
        console.log(masjidProject)
    }
}