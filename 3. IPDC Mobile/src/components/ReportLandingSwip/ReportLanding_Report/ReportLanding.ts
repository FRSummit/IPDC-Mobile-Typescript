import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './report-landing.html';

@WithRender

@Component
export default class ReportLanding extends Vue {
    saveReport() {
        console.log('save Report')
    }
    submitReport() {
        console.log('submit Report')
    }
}