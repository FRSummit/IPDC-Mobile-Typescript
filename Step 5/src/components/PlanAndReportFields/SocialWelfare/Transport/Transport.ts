import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './transport.html';

@WithRender

@Component
export default class Transport extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null
    
    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        const transport = {
            transportPlanData: {
            target: this.target,
            dateAndAction: this.dateAndAction,
          },
        };
        console.log(transport)
        // localStorage.setItem('manpowerAndPersonalContacts_memberMemberPlanData', JSON.stringify(member))
      } else if(this.planOrReportTab === 'REPORT') {
        const transport = {
            transportData: {
            target: this.target,
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            comment: this.comment
          }
        };
        console.log(transport)
        // localStorage.setItem('manpowerAndPersonalContacts_memberMemberData', JSON.stringify(member))
      }
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}