import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import VueRouter from 'vue-router'
import {OrganizationViewModelDto} from "src/models/OrganizationViewModelDto";
import { authService } from '../../auth-service'
import {OrganizationService} from "../../services/OrganizationService";
import { ReportingPeriodService } from "../../services/ReportingPeriodService";
import { ReportingPeriodViewModel } from "src/models/ReportingPeriodViewModel";
import {OrganizationReference} from "../../models/OrganizationReference";
import {UnitPlanReportService} from "../../services/UnitPlanReportService";
import { UnitPlanViewModelDto } from "../../models/UnitPlanViewModelDto"
import { SignalrWrapper } from "../../signalrwrapper";
import moment from "moment";
import ons from 'onsenui';

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    
    router = new VueRouter();
    signalreventhandlers: any = {};
    selectedReportingPeriods: any = '';
    isCreatingPlan = false;
    selectedOrgReportingPeriod : any = [];
    organizationItems: OrganizationViewModelDto[] = [];
    reportingPeriods: ReportingPeriodViewModel[] = [];
    organizationReference!: OrganizationReference;
    organizationService = new OrganizationService();
    nodatafound = false;
    selectOrganization : any;
    unitPlan !: UnitPlanViewModelDto;
    service = new UnitPlanReportService();
    reportingPeriodService = new ReportingPeriodService();
    signalr = new SignalrWrapper();

    constructor() 
        { super()
            this.signalreventhandlers = {
                "UnitPlanCopied": this.onUnitPlanCopied,
                "UnitPlanCopyFailed": this.onUnitPlanCopyFailed
            };
        }

    data(){
        return {
            //selectedReportingPeriods: this.selectedReportingPeriods,
        }
    };
    async created() {
       this.selectedOrganization();
        //// SignaLr Start
        await this.attached()
    }

    async attached() {
        this.signalr.start();
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                this.signalr.on(key, this.signalreventhandlers[key]);
            }
        }
    }

    async selectedOrganization() {
        const unitid:any = localStorage.getItem('unit_id_copy');
        this.unitPlan = await this.service.getPlan(unitid);

        if (authService.isSystemAdmin) {
            const allReportingPeriods = await this.reportingPeriodService.getReportingPeriodsToCreatePlan(this.unitPlan.organization.id);
            this.reportingPeriods = allReportingPeriods.filter(r => r.reportingFrequency === this.unitPlan.reportingPeriod.reportingFrequency);
        } else {
            const nextReportingPeriod = await this.reportingPeriodService.getNextReportingPeriod(this.unitPlan.id);
            this.reportingPeriods = [nextReportingPeriod];
        }

        this.formatePeriods(this.reportingPeriods);
    }

    formatePeriods(reportingPeriods : ReportingPeriodViewModel[]) {  
        let reportingPeriodList: any = [];
        for(let i=0; i<reportingPeriods.length; i++) {
            reportingPeriodList.push(reportingPeriods[i].year + '-' 
                    + 'Monthly' + ' ' 
                    + this.datePrepare(reportingPeriods[i].startDate) + ' to ' 
                    + this.datePrepare(reportingPeriods[i].endDate) + ' ' 
                    + (reportingPeriods[i].isActive == true ? '(Active)' : ''))
        }
        this.selectedOrgReportingPeriod = reportingPeriodList;
        console.log(this.selectedOrgReportingPeriod);
    }

    datePrepare(date: any) {
        const formatedate = moment(date);
        return `${formatedate.format("MMM")}` + ' ' + `${formatedate.format("YYYY")}`
    }

    onChange() {
        console.log(this.selectedReportingPeriods);
    }

    async createPlan() {
        this.organizationReference  = this.reportingPeriods[0].organizationReference;
        const year = this.selectedReportingPeriods.split('-')[0];
        const reportingmonth = this.selectedReportingPeriods.split(' ')[1];
        console.log(reportingmonth);
        const reportingterm : any = this.getReportingTerm(reportingmonth);
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.service.copy(this.unitPlan.id, this.unitPlan.organization, year, reportingterm, this.organizationReference.reportingFrequency);
            this.isCreatingPlan = true;
            
        } catch(error) {
            ons.notification.alert('Error',{title :''}); 
            return;
        }
    }

    getReportingTerm(month : any) {
        if(month == 'Oct') return '1'
        if(month == 'Nov') return '2'
        if(month == 'Dec') return '3'
        if(month == 'Jan') return '4'
        if(month == 'Feb') return '5'
        if(month == 'Mar') return '6'
        if(month == 'Apr') return '7'
        if(month == 'May') return '8'
        if(month == 'Jun') return '9'
        if(month == 'Jul') return '10'
        if(month == 'Aug') return '11'
        if(month == 'Sep') return '12'
    }

    onUnitPlanCopied = (planid: number) => {
        ons.notification.alert('Plan copied',{title :''}); 
        this.navigate(planid);
    }

    onUnitPlanCopyFailed = (e: {$values: string[]}) => {

    } 
    navigate(planid: number){
        localStorage.setItem('planandreports_passing_unit_id', <string> <unknown>planid);
        localStorage.setItem('planandreports_passing_unit_org_id', <string> <unknown>this.unitPlan.organization.id);
        if(this.unitPlan.reportStatusDescription === 'Draft')  
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }
};