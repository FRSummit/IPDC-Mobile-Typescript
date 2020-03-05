import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './report-landing.html';
import { allReportService } from "../../../services/AllReportsService";
import { ReportSearchTerms } from "../../../models/ReportSearchTerms"

@WithRender

@Component
export default class ReportLanding extends Vue {
    report = new ReportSearchTerms();
    orgReport !: []
    orgName !: []
    orgReportStatus !: []
    data(){
        return {
            unit_items: [],
            orgReport: [],
        }
    };
    saveReport() {
        console.log('save Report')
    }
    submitReport() {
        console.log('submit Report')
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        console.log(unitReportId)
        let a: any = []
        allReportService.search(this.report)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == unitReportId) {
                        a.push(res.items[i])
                    }
                }
            })
        this.orgReport = a
        console.log(a)
    }
}