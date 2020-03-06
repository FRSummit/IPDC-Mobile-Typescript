import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import { SignalrWrapper } from "../../signalrwrapper";
import { organizationService } from "../../services/OrganizationService2"
import { reportingPeriodService } from "../../services/ReportingPeriodService2"

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    signalreventhandlers: any = {};
    itemsMyOrganizations !: []
    selectedOrgReportingPeriod !: []
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
            itemsMyOrganizations: [],
            selectedOrgReportingPeriod: [],
            lists: [
                {name: 'Item 1'},
                {name: 'Item 2'}
            ],
        }
    };
    async created() {
        let orgList: any = []
        organizationService
            .myorganizations()
            .then(res => {
                // orgList.push(res)
                console.log(res)
                console.log(res.length)
                for(let i=0; i<res.length; i++) {
                    if(res[i].organizationType == 1) {
                        orgList.push(res[i])
                    }
                }
            })
        this.itemsMyOrganizations = orgList

        console.log("SignalR test");
        const signalr = new SignalrWrapper();
        signalr.start();
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                signalr.on(key, this.signalreventhandlers[key]); 
            }
        }
       // await this.search();
    }
    myOrganizationSelection(id: any) {
        console.log(id);
        let reportingPeriodList: any = []
        reportingPeriodService
            .getReportingPeriodsToCreatePlan(id)
            .then(res => {
                console.log(res)
                // reportingPeriodList.push(res)
                for(let i=0; i<res.length; i++) {
                    reportingPeriodList.push(res[i].year + '-' 
                    + this.reportingFrequencySelectionString(res[i].reportingFrequency) + ' ' 
                    + this.datePrepare(res[i].startDate) + ' to ' 
                    + this.datePrepare(res[i].endDate) + ' ' 
                    + this.activityPrepare(res[i].isActive))
                }
            })
        this.selectedOrgReportingPeriod = reportingPeriodList
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
};