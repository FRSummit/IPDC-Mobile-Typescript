import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './member.html';

@WithRender

@Component
export default class Member extends Vue {
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
            planOrReportTab: 'REPORT',
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
        const member = {
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
        console.log(member)
    }
}