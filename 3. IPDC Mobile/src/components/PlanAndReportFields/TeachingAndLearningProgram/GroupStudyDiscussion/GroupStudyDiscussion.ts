import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './group-study-discussion.html';

@WithRender

@Component
export default class GroupStudyDiscussion extends Vue {
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
        const groupStudyDiscussion = {
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            averageAttendance: this.averageAttendance,
            comment: this.comment
        }
        console.log(groupStudyDiscussion)
    }
}