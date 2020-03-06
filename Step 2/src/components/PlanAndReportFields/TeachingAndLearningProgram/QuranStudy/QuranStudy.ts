import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './quran-study.html';

@WithRender

@Component
export default class QuranStudy extends Vue {
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
        const QuranStudy = {
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            averageAttendance: this.averageAttendance,
            comment: this.comment
        }
        console.log(QuranStudy)
    }
}