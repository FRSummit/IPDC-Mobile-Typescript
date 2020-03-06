import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './report-landing.html';

@WithRender

@Component
export default class ReportLanding extends Vue {
    data() {
        return {
            tab: null,
            items: ['Plan', 'Report'],
            text: 'Lorem ipsum dolor'
        }
    }
}