import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import {OrganizationViewModelDto} from "src/models/OrganizationViewModelDto";
import {OrganizationType} from "../../models/OrganizationType";
import {OrganizationService} from "../../services/OrganizationService";
import { ReportingPeriodService } from "../../services/ReportingPeriodService";
import { ReportingPeriodViewModel } from "src/models/ReportingPeriodViewModel";
import { SignalrWrapper } from "../../signalrwrapper";

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    
    signalreventhandlers: any = {};
    selectedOrgReportingPeriod : any = [];
    organizationItems: OrganizationViewModelDto[] = [];
    reportingPeriods: ReportingPeriodViewModel[] = [];
    organizationService = new OrganizationService();
    nodatafound = false;
    selectOrganization : any;
    reportingPeriodService = new ReportingPeriodService();

    constructor() 
        { super()
            this.signalreventhandlers = {
                "UnitPlanCreated": this.onUnitPlanCreated,
                "UnitPlanCreateFailed": this.onUnitPlanCreateFailed,
        };
        }

    data(){
        return {
            createdPlanStatus: 'I\'m an alligator!',
            // organizationItems: [
            //     {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
            //     {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
            //     {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
            //     {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'}
            // ],
            lists: [
                {name: 'Item 1'},
                {name: 'Item 2'}
            ],
        }
    };
    async created() {
        this.loadOrganizations();
        //// SignaLr Start
        await this.attached()
    }

    async attached() {
        const signalr = new SignalrWrapper();
        signalr.start();
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                signalr.on(key, this.signalreventhandlers[key]);
            }
        }
    }

    async loadOrganizations() {
        const organizations  = (await this.organizationService.myorganizations()).filter(org => org.organizationType === OrganizationType.Unit);
        this.nodatafound = organizations.length == 0;
        this.organizationItems.splice(0, this.organizationItems.length);
        organizations.forEach(org => this.organizationItems.push(org));
        console.log(this.organizationItems);
    }

    async selectedOrganization(id: any) {
        this.reportingPeriods = await this.reportingPeriodService.getReportingPeriodsToCreatePlan(id);
        console.log(this.reportingPeriods);
        this.formatePeriods(this.reportingPeriods);
    }

    formatePeriods(reportingPeriods : ReportingPeriodViewModel[]) {  
        let reportingPeriodList: any = [];
        for(let i=0; i<reportingPeriods.length; i++) {
            // reportingPeriodList.push(reportingPeriods[i].year + ' ' + reportingPeriods[i].organizationReference + ' ' + reportingPeriods[i].startDate + ' ' + reportingPeriods[i].endDate + ' ' + reportingPeriods[i].isActive)
            reportingPeriodList.push(reportingPeriods[i].year + '-' 
                    + this.reportingFrequencySelectionString(reportingPeriods[i].reportingFrequency) + ' ' 
                    + this.datePrepare(reportingPeriods[i].startDate) + ' to ' 
                    + this.datePrepare(reportingPeriods[i].endDate) + ' ' 
                    + this.activityPrepare(reportingPeriods[i].isActive))
        }
        this.selectedOrgReportingPeriod = reportingPeriodList;
    }
    reportingFrequencySelectionString(reportingFrequency: any) {
        if(reportingFrequency == '1') return 'Monthly'
        if(reportingFrequency == '2') return 'EveryTwoMonth'
        if(reportingFrequency == '3') return 'Quarterly'
        if(reportingFrequency == '4') return 'EveryFourMonth'
        if(reportingFrequency == '6') return 'HalfYearly'
        if(reportingFrequency == '12') return 'Yearly'
    }
    datePrepare(date: any) {
        console.log(date)
        let month
        let year
        year = date.split('T')[0].split('-')[0]
        console.log(year)
        month = this.monthPrepare(date.split('T')[0].split('-')[1])
        console.log(month)
        return month + ' ' + year
    }
    monthPrepare(month: any){
        if(month == '01') return 'Oct'
        if(month == '02') return 'Nov'
        if(month == '03') return 'Dec'
        if(month == '04') return 'Jan'
        if(month == '05') return 'Feb'
        if(month == '06') return 'Mar'
        if(month == '07') return 'Apr'
        if(month == '08') return 'May'
        if(month == '09') return 'Jun'
        if(month == '10') return 'Jul'
        if(month == '11') return 'Aug'
        if(month == '12') return 'Sep'
    }
    activityPrepare(activity: any) {
        return activity == true ? '(Active)' : ''
    }
    createPlan() {
        console.log('plan created')
        this.$router.push('/plan-and-reports')
    }
    onUnitPlanCreated = (planid: number) => {
        // toastr.success("Plan Created");
        // this.router.navigate(`unit-plan-edit/${planid}`);
     }
 
     onUnitPlanCreateFailed = (e: {$values: string[]}) => {
         //this.isCreatingPlan = false;
         //toastr.error(e.$values.join(", "));
     } 

    baz(){
        console.log('clicked!');
    }
};