import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './supporter-member.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class SupporterMember extends Vue {
    planOrReportTab !: null
    lastPeriod !: null
    target !: null
    increased !: null
    decreased !: null
    thisPeriod !: null
    memberContact !: null
    comment !: null
    nameAndContactNumber !: null
    action !: null
    
    data() {
        return {
            planOrReportTab: null,
            lastPeriod: null,
            target: null,
            increased: null,
            decreased: null, 
            thisPeriod: null, 
            memberContact: null, 
            comment: null, 
            nameAndContactNumber: null, 
            action: null,
        }
    }
    backButton() {
        this.$router.push('/report-landing-swip')
    }
    onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        const supporterMember = {
          supporterMemberPlanData: {
            target: this.target,
            nameAndContactNumber: this.nameAndContactNumber,
            action: this.action,
          }
        };
        console.log(supporterMember)
        // localStorage.setItem('manpowerAndPersonalContacts_supporterMemberPlanData', JSON.stringify(supporterMember))
      } if(this.planOrReportTab === 'REPORT') {
        const supporterMember = {
          supporterMemberData: {
            lastPeriod: this.lastPeriod,
            target: this.target,
            increased: this.increased,
            decreased: this.decreased,
            thisPeriod: this.thisPeriod,
            memberContact: this.memberContact,
            comment: this.comment
          }
        };
        console.log(supporterMember)
        // localStorage.setItem('manpowerAndPersonalContacts_supporterMemberData', JSON.stringify(supporterMember))
      }
    }
    created() {
      const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      console.log(tabActivationForPlanOrReport)
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        let target: any = []
        let nameAndContactNumber: any = []
        let action: any = []
        unitPlanReportService
          .getPlan(unitReportId)
            .then(res => {
              target.push(res.supporterMemberPlanData.upgradeTarget)
              nameAndContactNumber.push(res.supporterMemberPlanData.nameAndContactNumber)
              action.push(res.supporterMemberPlanData.action)
            })
            this.target = target
            this.nameAndContactNumber = nameAndContactNumber
            this.action = action
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let lastPeriod: any = []
        let target: any = []
        let increased: any = []
        let decreased: any = []
        let thisPeriod: any = []
        let memberContact: any = []
        let comment: any = []
        unitPlanReportService
          .getReport(unitReportId)
            .then(res => {
              lastPeriod.push(res.supporterMemberData.lastPeriod)
              target.push(res.supporterMemberData.upgradeTarget)
              increased.push(res.supporterMemberData.increased)
              decreased.push(res.supporterMemberData.decreased)
              thisPeriod.push(res.supporterMemberData.thisPeriod)
              memberContact.push(res.supporterMemberData.personalContact)
              comment.push(res.supporterMemberData.comment)
            })
            this.lastPeriod = lastPeriod
            this.target = target
            this.increased = increased
            this.decreased = decreased
            this.thisPeriod = thisPeriod
            this.memberContact = memberContact
            this.comment = comment
      }
    }
}