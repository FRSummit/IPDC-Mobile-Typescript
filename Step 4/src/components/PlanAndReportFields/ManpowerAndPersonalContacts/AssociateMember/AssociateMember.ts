import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './associate-member.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class AssociateMember extends Vue {
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
        const associateMember = {
          associateMemberPlanData: {
            target: this.target,
            nameAndContactNumber: this.nameAndContactNumber,
            action: this.action,
          }
        };
        console.log(associateMember)
        // localStorage.setItem('manpowerAndPersonalContacts_associateMemberPlanData', JSON.stringify(associateMember))
      } if(this.planOrReportTab === 'REPORT') {
        const associateMember = {
          associateMemberData: {
            lastPeriod: this.lastPeriod,
            target: this.target,
            increased: this.increased,
            decreased: this.decreased,
            thisPeriod: this.thisPeriod,
            memberContact: this.memberContact,
            comment: this.comment
          }
        };
        console.log(associateMember)
        // localStorage.setItem('manpowerAndPersonalContacts_associateMemberData', JSON.stringify(associateMember))
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
                target.push(res.associateMemberPlanData.upgradeTarget)
                nameAndContactNumber.push(res.associateMemberPlanData.nameAndContactNumber)
                action.push(res.associateMemberPlanData.action)
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
                lastPeriod.push(res.associateMemberData.lastPeriod)
                target.push(res.associateMemberData.upgradeTarget)
                increased.push(res.associateMemberData.increased)
                decreased.push(res.associateMemberData.decreased)
                thisPeriod.push(res.associateMemberData.thisPeriod)
                memberContact.push(res.associateMemberData.personalContact)
                comment.push(res.associateMemberData.comment)
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