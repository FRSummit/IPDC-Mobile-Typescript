import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './preliminary-member.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

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
    unitPlanReportService = new UnitPlanReportService();
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
        localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberPlanData', JSON.stringify(preliminaryMember))
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
        localStorage.setItem('manpowerAndPersonalContacts_preliminaryMemberData', JSON.stringify(preliminaryMember))
      }
      this.changeTab()
    }
    created() {
      const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      console.log(tabActivationForPlanOrReport)
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        let target: any = []
        let nameAndContactNumber: any = []
        let action: any = []
        if(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')) {
          this.target = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.target
          this.nameAndContactNumber = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.nameAndContactNumber
          this.action = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.action
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.preliminaryMemberPlanData.upgradeTarget)
                  nameAndContactNumber.push(res.preliminaryMemberPlanData.nameAndContactNumber)
                  action.push(res.preliminaryMemberPlanData.action)
                })
                this.target = target
                this.nameAndContactNumber = nameAndContactNumber
                this.action = action
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let lastPeriod: any = []
        let target: any = []
        let increased: any = []
        let decreased: any = []
        let thisPeriod: any = []
        let memberContact: any = []
        let comment: any = []
        if(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')) {
          this.lastPeriod = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.lastPeriod
          this.target = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.target
          this.increased = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.increased
          this.decreased = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.decreased
          this.thisPeriod = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.thisPeriod
          this.memberContact = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.memberContact
          this.comment = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.comment
        } else {
            this.unitPlanReportService
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
    changeTab() {
      let associateMember = document.querySelectorAll('.my_tab')[3] as HTMLElement
      associateMember.click()
    }
}