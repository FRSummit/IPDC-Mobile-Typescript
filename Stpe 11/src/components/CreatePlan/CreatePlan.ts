import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import VueRouter from 'vue-router'
import {OrganizationViewModelDto} from "src/models/OrganizationViewModelDto";
import {OrganizationType} from "../../models/OrganizationType";
import {OrganizationService} from "../../services/OrganizationService";
import { ReportingPeriodService } from "../../services/ReportingPeriodService";
import { ReportingPeriodViewModel } from "src/models/ReportingPeriodViewModel";
import {OrganizationReference} from "../../models/OrganizationReference";
import {UnitPlanReportService} from "../../services/UnitPlanReportService";
import { SignalrWrapper } from "../../signalrwrapper";
import moment from "moment";

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
    service = new UnitPlanReportService();
    reportingPeriodService = new ReportingPeriodService();
    signalr = new SignalrWrapper();

    constructor() 
        { super()
            this.signalreventhandlers = {
                "UnitPlanCreated": this.onUnitPlanCreated,
                "UnitPlanCreateFailed": this.onUnitPlanCreateFailed,
        };
        }

    data(){
        return {
            //selectedReportingPeriods: this.selectedReportingPeriods,
        }
    };
    async created() {
        this.loadOrganizations();
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

    async loadOrganizations() {
        const organizations  = (await this.organizationService.myorganizations()).filter(org => org.organizationType === OrganizationType.Unit);
        this.nodatafound = organizations.length == 0;
        this.organizationItems.splice(0, this.organizationItems.length);
        organizations.forEach(org => this.organizationItems.push(org));
    }

    async selectedOrganization(id: any) {
        this.reportingPeriods = await this.reportingPeriodService.getReportingPeriodsToCreatePlan(id);
        console.log(this.reportingPeriods);
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
        console.log('for save' + this.organizationReference, year, reportingterm, this.organizationReference.reportingFrequency)
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.service.createPlan2(this.organizationReference, year, reportingterm, this.organizationReference.reportingFrequency);
        } catch(error) {
            //toastr.error(error);
            return;
        }

        this.isCreatingPlan = true;
        this.$router.push('/plan-and-reports');
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

    onUnitPlanCreated = (planid: number) => {
        console.log(planid);
        console.log('plan created');
     }
 
     onUnitPlanCreateFailed = (e: {$values: string[]}) => {
         //this.isCreatingPlan = false;
         //toastr.error(e.$values.join(", "));
     } 

    baz(){
        console.log('clicked!');
    }
};