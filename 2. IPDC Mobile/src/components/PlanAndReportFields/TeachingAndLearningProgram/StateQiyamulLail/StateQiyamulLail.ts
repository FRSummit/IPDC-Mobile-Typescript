import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './state-qiyamul-lail.html';

@WithRender

@Component
export default class StateQiyamulLail extends Vue {
    dateAndAction !: null
    actual !: null
    averageAttendance !: null
    comment !: null
    
    data() {
        return {
            planOrReportTab: 'REPORT',
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
        const StateQiyamulLail = {
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            averageAttendance: this.averageAttendance,
            comment: this.comment
        }
        console.log(StateQiyamulLail)
    }
}