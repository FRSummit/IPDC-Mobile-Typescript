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
    progressbar !: any

    data() {
        return {
            unit_reports: [],
            unit_reports_search: [],
            search: null,
            progressbar: false
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
        if(localStorage.getItem('planandreports_passing_unit_id') || localStorage.getItem('planandreports_passing_unit_org_id') || 
            localStorage.getItem('selected_plan') || localStorage.getItem('reportStatusDescriptionForInput')) {
            localStorage.removeItem('planandreports_passing_unit_id');
            localStorage.removeItem('planandreports_passing_unit_org_id');
            localStorage.removeItem('selected_plan');
            localStorage.removeItem('reportStatusDescriptionForInput');
        }
        let plan_reports: any = [];
        this.progressbar = true;
        let searchReport = allReportService.search(this.report)
        searchReport.then(res => {
            for(let i=0; i<res.items.length; i++) {
                plan_reports.push(res.items[i])
            }
            this.progressbar = false
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