import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './member.html';
import { unitPlanReportService } from "../../../../services/UnitPlanReportService2"

@WithRender

@Component
export default class Member extends Vue {
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
        const member = {
          memberMemberPlanData: {
            target: this.target,
            nameAndContactNumber: this.nameAndContactNumber,
            action: this.action,
          },
        };
        console.log(member)
        localStorage.setItem('manpowerAndPersonalContacts_memberMemberPlanData', JSON.stringify(member))
      } else if(this.planOrReportTab === 'REPORT') {
        const member = {
          memberMemberData: {
            lastPeriod: this.lastPeriod,
            target: this.target,
            increased: this.increased,
            decreased: this.decreased,
            thisPeriod: this.thisPeriod,
            memberContact: this.memberContact,
            comment: this.comment
          }
        };
        console.log(member)
        localStorage.setItem('manpowerAndPersonalContacts_memberMemberData', JSON.stringify(member))
      }
      // this.$emit('changeTab', 'member')
      this.$emit('postCreated', 'member')
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
          if(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')) {
            this.target = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.target
            this.nameAndContactNumber = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.nameAndContactNumber
            this.action = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.action
          } else {
              unitPlanReportService
                .getPlan(unitReportId)
                  .then(res => {
                    target.push(res.memberMemberPlanData.upgradeTarget)
                    nameAndContactNumber.push(res.memberMemberPlanData.nameAndContactNumber)
                    action.push(res.memberMemberPlanData.action)
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
          if(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')) {
            this.lastPeriod = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.lastPeriod
            this.target = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.target
            this.increased = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.increased
            this.decreased = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.decreased
            this.thisPeriod = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.thisPeriod
            this.memberContact = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.memberContact
            this.comment = JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.comment
          } else {
              unitPlanReportService
                .getReport(unitReportId)
                  .then(res => {
                    lastPeriod.push(res.memberMemberData.lastPeriod)
                    target.push(res.memberMemberData.upgradeTarget)
                    increased.push(res.memberMemberData.increased)
                    decreased.push(res.memberMemberData.decreased)
                    thisPeriod.push(res.memberMemberData.thisPeriod)
                    memberContact.push(res.memberMemberData.personalContact)
                    comment.push(res.memberMemberData.comment)
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
}