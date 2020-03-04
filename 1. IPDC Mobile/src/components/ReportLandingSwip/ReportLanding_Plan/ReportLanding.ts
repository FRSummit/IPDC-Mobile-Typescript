import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './report-landing.html';

@WithRender

@Component
export default class ReportLanding extends Vue {
    savePlan() {
        console.log('savePlan')
    }
    submitPlan() {
        console.log('submitPlan')
    }
}