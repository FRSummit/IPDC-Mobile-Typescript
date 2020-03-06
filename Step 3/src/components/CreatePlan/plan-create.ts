import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import VueRouter from 'vue-router'
import {OrganizationType} from "src/models//OrganizationType";
import {OrganizationService} from "src/services/OrganizationService";
import {OrganizationViewModelDto} from "src/models/OrganizationViewModelDto";
import {UnitPlanReportService} from "src/services/UnitPlanReportService";
import { SignalrWrapper } from "src/signalrwrapper";
import {OrganizationReference} from "src/models/OrganizationReference";
import { ReportingPeriodViewModel } from "src/models/ReportingPeriodViewModel";
import { ReportingPeriodService } from "src/services/ReportingPeriodService";

@WithRender
export default class DashboardTypeScript extends Vue {
    selectedOrganization!: OrganizationViewModelDto;
    reportingPeriods: ReportingPeriodViewModel[] = [];
    selectedReportingPeriod!: ReportingPeriodViewModel;
    organizationService!: OrganizationService;
    unitPlanReportService!: UnitPlanReportService;
    reportingPeriodService!: ReportingPeriodService;
    signalr!: SignalrWrapper;
    router!: VueRouter;
    isCreatingPlan = false;
    signalreventhandlers: any = {};
    
    isSearching = false;
    items: OrganizationViewModelDto[] = [];
    nodatafound = false;

    constructor() 
        { super()
            this.signalreventhandlers = {
                "UnitPlanCreated": this.onUnitPlanCreated,
                "UnitPlanCreateFailed": this.onUnitPlanCreateFailed,
        };
        }

    async attached() {
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                this.signalr.on(key, this.signalreventhandlers[key]);
            }
        }
        await this.search();
    }

    search = async () => {
        this.isSearching = true;
        const organizations  = await this.organizationService.myorganizations();
        this.isSearching = false;
        this.nodatafound = organizations.length == 0;
        this.items.splice(0, this.items.length);
        organizations.forEach(org => this.items.push(org));
        await this.afterSearching();
    }

    async afterSearching() {
        this.selectOrganization(undefined!);
        let itemindex=-1;
        if(this.items.length === 1) {
          await this.selectOrganization(this.items[0]);
          return;
        }

        if((itemindex = this.items.findIndex(item => item.organizationType === OrganizationType.Central)) !== -1){
          await this.selectOrganization(this.items[itemindex]);
          return;
        }
        else if((itemindex = this.items.findIndex(item => item.organizationType === OrganizationType.State)) !== -1){
          await this.selectOrganization(this.items[itemindex]);
          return;
        }
        else if((itemindex = this.items.findIndex(item => item.organizationType === OrganizationType.Zone)) !== -1){
          await this.selectOrganization(this.items[itemindex]);
          return;
        }
        else if(this.items.length === 1) {
          await this.selectOrganization(this.items[0]);
          return;
        }
    }

    detached() {
        for(const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                this.signalr.off(key, this.signalreventhandlers[key]);
            }
        }
    }
    
    getOrganizationServiceForSelectedOrganization() : UnitPlanReportService {
        
        if(this.selectedOrganization.organizationType == OrganizationType.Unit)
        {
            return this.unitPlanReportService;
        }
        
        else throw new Error("Not Implemented");
    }

    createPlan = async () => {
        try {
            const orgService = this.getOrganizationServiceForSelectedOrganization();
            await orgService.createPlan2(this.getOrganizationReference(this.selectedOrganization, this.selectedReportingPeriod), 
                this.selectedReportingPeriod.year, this.selectedReportingPeriod.reportingTerm, this.selectedReportingPeriod.reportingFrequency);
        } catch(error) {
            //toastr.error(error);
            return;
        }
        this.isCreatingPlan = true;
    }

    selectOrganization = async (item: OrganizationViewModelDto) => {
        this.reportingPeriods = [];
        this.selectedOrganization = item;
        await this.loadOrganizationReportingPeriods();
    }

    loadOrganizationReportingPeriods = async () => {
        if(!this.selectedOrganization) return;
        this.reportingPeriods = await this.reportingPeriodService.getReportingPeriodsToCreatePlan(this.selectedOrganization.id);
    }

    getOrganizationReference(org: OrganizationViewModelDto, selectedReportingPeriod: ReportingPeriodViewModel) {
        return new OrganizationReference(org.id, org.organizationType, org.description, selectedReportingPeriod.reportingFrequency, org.details);
    }

    onUnitPlanCreated = (planid: number) => {
       // toastr.success("Plan Created");
       // this.router.navigate(`unit-plan-edit/${planid}`);
    }

    onUnitPlanCreateFailed = (e: {$values: string[]}) => {
        this.isCreatingPlan = false;
        //toastr.error(e.$values.join(", "));
    } 
}
