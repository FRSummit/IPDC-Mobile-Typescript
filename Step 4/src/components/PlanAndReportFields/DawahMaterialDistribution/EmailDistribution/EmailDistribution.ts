import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './email-distribution.html';

@WithRender

@Component
export default class EmailDistribution extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null

    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
        }
    }
    
    backButton() {
        this.$router.push('/report-landing-swip')
    }

    onSubmit() {
        const emailDistribution = {
            target: this.target,
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            comment: this.comment,
        }
        console.log(emailDistribution)
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}