import { Component, Vue } from 'vue-property-decorator';
import WithRender from './create-plan.html';

@WithRender

@Component({})
export default class DashboardTypeScript extends Vue {
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
    myOrganizationSelection(id: any) {
        console.log(id);
    }
    createPlan() {
        console.log('plan created')
        this.$router.push('/plan-and-reports')
    }

  baz(){
    console.log('clicked!');
  }
};