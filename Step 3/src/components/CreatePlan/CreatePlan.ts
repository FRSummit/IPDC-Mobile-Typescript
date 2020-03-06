import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';
import { SignalrWrapper } from "../../signalrwrapper";

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
    
    signalreventhandlers: any = {};
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
            itemsMyOrganizations: [
                {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
                {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
                {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'},
                {description: 'Item 1', description2: 'Item 1', description3: 'Item 1', description4: 'Item 1', organizationTypeDescription: '1'}
            ],
        }
    };
    async created() {
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