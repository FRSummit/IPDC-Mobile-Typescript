import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other.html';

@WithRender

@Component
export default class Other extends Vue {
    planOrReportTab !: null
    dateAndAction !: null
    actual !: null
    averageAttendance !: null
    comment !: null
    
    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            averageAttendance: null,
            comment: null
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        const other = {
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            averageAttendance: this.averageAttendance,
            comment: this.comment
        }
        console.log(other)
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}