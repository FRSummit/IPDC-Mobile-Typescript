import { Component, Vue } from 'vue-property-decorator';
import WithRender from './plan-and-reports.html';
import { allReportService } from "../../services/AllReportsService";
import { ReportSearchTerms } from "../../models/ReportSearchTerms"
import { clearStorage } from "../../ClearStorage";

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    report = new ReportSearchTerms();
    unit_items !: []
    data(){
        return {
            unit_items: [],
        }
    };
    createPlanBtnClick() { 
        this.$router.push('/admin/create-plan')
    }
    unitItemClick(id: any, orgId: any) {
        localStorage.setItem('planandreports_passing_unit_id', id);
        localStorage.setItem('planandreports_passing_unit_org_id', orgId);
        this.$router.push('/report-landing-swip')
    }
    baz() {
        console.log('clicked!');
    }
    created() {
        clearStorage.clear()
        if(localStorage.getItem('planandreports_passing_unit_id') || localStorage.getItem('planandreports_passing_unit_org_id') || localStorage.getItem('selected_plan')) {
            localStorage.removeItem('planandreports_passing_unit_id');
            localStorage.removeItem('planandreports_passing_unit_org_id');
            localStorage.removeItem('selected_plan');
        }
        let a: any = []
        allReportService.search(this.report)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    a.push(res.items[i])
                }
            })
        this.unit_items = a
    }
};