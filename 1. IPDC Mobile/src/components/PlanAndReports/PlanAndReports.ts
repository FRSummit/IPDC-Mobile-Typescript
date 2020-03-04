import { Component, Vue } from 'vue-property-decorator';
import WithRender from './plan-and-reports.html';
import { allReportService } from "../../services/AllReportsService";
import { ReportSearchTerms } from "../../models/ReportSearchTerms"
import { ReportViewModelDto } from "../../models/ReportViewModelDto";

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {

   report = new ReportSearchTerms();

   //reportView = new ReportViewModelDto();

    data(){
        return {
            text: 'I\'m an alligator!',
            unit_items: [
                {description: 'Item 1 get from google list', id: '1'},
                {description: 'Item 2 get from google list', id: '2'},
                {description: 'Item 3 get from google list', id: '3'},
                {description: 'Item 4 get from google list', id: '4'},
                {description: 'Item 5 get from google list', id: '5'}
            ],
        }
    };
    createPlanBtnClick(){
        // console.log(allReportService.search(this.report)); 
        this.$router.push('/admin/create-plan')
    }
    unitItemClick(id: any) {
        console.log(id);
        // this.$router.push('/report-landing')
        this.$router.push({ path: '/report-landing-swip', params: { id: '1234' }})
    }
    bind()
    {
        //console.log(allReportService.search(this.reportSearchTerm));  
    }

  baz(){
    console.log('clicked!');
  }
};