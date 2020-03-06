import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './shifting.html';

@WithRender

@Component
export default class Shifting extends Vue {
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
        const shifting = {
            shiftingPlanData: {
            target: this.target,
            dateAndAction: this.dateAndAction,
          },
        };
        console.log(shifting)
        // localStorage.setItem('manpowerAndPersonalContacts_memberMemberPlanData', JSON.stringify(member))
      } else if(this.planOrReportTab === 'REPORT') {
        const shifting = {
            shiftingData: {
            target: this.target,
            dateAndAction: this.dateAndAction,
            actual: this.actual,
            comment: this.comment
          }
        };
        console.log(shifting)
        // localStorage.setItem('manpowerAndPersonalContacts_memberMemberData', JSON.stringify(member))
      }
    }
    created() {
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        console.log(tabActivationForPlanOrReport)
        this.planOrReportTab = tabActivationForPlanOrReport
    }
}