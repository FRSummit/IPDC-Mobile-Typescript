import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './preliminary-member.html';

@WithRender

@Component
export default class PreliminaryMember extends Vue {
    planOrReportTab !: ''
    lastPeriod !: ''
    target !: ''
    increased !: ''
    decreased !: ''
    thisPeriod !: ''
    memberContact !: ''
    comment !: ''
    nameAndContactNumber !: ''
    action !: ''
    
    data() {
        return {
            planOrReportTab: '',
            lastPeriod: null,
            target: null,
            increased: null,
            decreased: null, 
            thisPeriod: null, 
            memberContact: null, 
            comment: null, 
            nameAndContactNumber: null, 
            action: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
        const preliminaryMember = {
            lastPeriod: this.lastPeriod,
            target: this.lastPeriod,
            increased: this.lastPeriod,
            decreased: this.lastPeriod,
            thisPeriod: this.lastPeriod,
            memberContact: this.lastPeriod,
            comment: this.lastPeriod,
            nameAndContactNumber: this.lastPeriod,
            action: this.lastPeriod
        }
        console.log(preliminaryMember)
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}