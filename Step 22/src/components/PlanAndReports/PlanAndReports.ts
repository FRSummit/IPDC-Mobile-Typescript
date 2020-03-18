import { Component, Vue } from 'vue-property-decorator';
import WithRender from './plan-and-reports.html';
import { allReportService } from "../../services/AllReportsService";
import { ReportSearchTerms } from "../../models/ReportSearchTerms"
import { clearStorage } from "../../ClearStorage";



@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    report = new ReportSearchTerms();

    unit_reports !: [];
    unit_reports_search !: [];
    search !: null

    data(){
        return {
            unit_reports: [],
            unit_reports_search: [],
            search: null
        }
    };

    createPlanBtnClick() {    
        this.$router.push('/admin/create-plan')
    }

    unitItemClick(id: any, orgId: any, status: any) {
        localStorage.setItem('planandreports_passing_unit_id', id);
        localStorage.setItem('planandreports_passing_unit_org_id', orgId);
        if(status === 'Draft')  this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }
    created() {

        clearStorage.clear();
        if(localStorage.getItem('planandreports_passing_unit_id') || localStorage.getItem('planandreports_passing_unit_org_id') || localStorage.getItem('selected_plan')) {
            localStorage.removeItem('planandreports_passing_unit_id');
            localStorage.removeItem('planandreports_passing_unit_org_id');
            localStorage.removeItem('selected_plan');
        }

        let plan_reports: any = []
        allReportService.search(this.report)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    plan_reports.push(res.items[i])
                }
            })
            
        this.unit_reports = plan_reports;
    }
    formatreports(status: any) {
        if(status === "Draft")
            return  "Plan Not Submitted";
        else if(status === "PlanPromoted")
            return  "Plan Submitted, Report Not Submitted";
        else if(status === "Submitted")
            return  "Plan Submitted, Report Submitted";
        else return '';
    }
	copyPlan(id: any) {
        localStorage.setItem('unit_id_copy', id);
        this.$router.push('/admin/create-plan') 
	}
};