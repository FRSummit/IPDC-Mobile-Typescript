import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './preliminary-member.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class PreliminaryMember extends Vue {
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
        const preliminaryMember = {
          preliminaryMemberPlanData: {
            target: this.target,
            nameAndContactNumber: this.nameAndContactNumber,
            action: this.action,
          }
        };
        console.log(preliminaryMember)
        // localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberPlanData', JSON.stringify(preliminaryMember))
      } if(this.planOrReportTab === 'REPORT') {
        const preliminaryMember = {
          preliminaryMemberData: {
            lastPeriod: this.lastPeriod,
            target: this.target,
            increased: this.increased,
            decreased: this.decreased,
            thisPeriod: this.thisPeriod,
            memberContact: this.memberContact,
            comment: this.comment
          }
        };
        console.log(preliminaryMember)
        // localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberData', JSON.stringify(preliminaryMember))
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
              target.push(res.preliminaryMemberPlanData.upgradeTarget)
              nameAndContactNumber.push(res.preliminaryMemberPlanData.nameAndContactNumber)
              action.push(res.preliminaryMemberPlanData.action)
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
              lastPeriod.push(res.preliminaryMemberData.lastPeriod)
              target.push(res.preliminaryMemberData.upgradeTarget)
              increased.push(res.preliminaryMemberData.increased)
              decreased.push(res.preliminaryMemberData.decreased)
              thisPeriod.push(res.preliminaryMemberData.thisPeriod)
              memberContact.push(res.preliminaryMemberData.personalContact)
              comment.push(res.preliminaryMemberData.comment)
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