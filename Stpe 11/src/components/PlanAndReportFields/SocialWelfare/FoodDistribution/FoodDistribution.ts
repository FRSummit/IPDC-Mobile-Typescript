import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './food-distribution.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"

@WithRender

@Component
export default class FoodDistribution extends Vue {
    planOrReportTab !: null
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null
    unitPlanReportService = new UnitPlanReportService();
    
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
          const foodDistribution = {
              foodDistributionSocialWelfarePlanData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
              },
          };
          console.log(foodDistribution)
          localStorage.setItem('socialWelfare_foodDistributionSocialWelfarePlanData', JSON.stringify(foodDistribution))
        } else if(this.planOrReportTab === 'REPORT') {
          const foodDistribution = {
              foodDistributionSocialWelfareData: {
                  target: this.target,
                  dateAndAction: this.dateAndAction,
                  actual: this.actual,
                  comment: this.comment,
              }
          };
          console.log(foodDistribution)
          localStorage.setItem('socialWelfare_foodDistributionSocialWelfareData', JSON.stringify(foodDistribution))
        }
    }
    created() {
      const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      console.log(tabActivationForPlanOrReport)
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        let target: any = []
        let dateAndAction: any = []
        if(localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')!).foodDistributionSocialWelfarePlanData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')!).foodDistributionSocialWelfarePlanData.dateAndAction
        } else {
            this.unitPlanReportService
              .getPlan(unitReportId)
                .then(res => {
                  target.push(res.foodDistributionSocialWelfarePlanData.target)
                  dateAndAction.push(res.foodDistributionSocialWelfarePlanData.dateAndAction)
                })
                this.target = target
                this.dateAndAction = dateAndAction
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        let target: any = []
        let dateAndAction: any = []
        let actual: any = []
        let comment: any = []
        if(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')) {
          this.target = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.target
          this.dateAndAction = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.dateAndAction
          this.actual = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.actual
          this.comment = JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.comment
        } else {
          this.unitPlanReportService
              .getReport(unitReportId)
                .then(res => {
                  target.push(res.foodDistributionSocialWelfareData.target)
                  dateAndAction.push(res.foodDistributionSocialWelfareData.dateAndAction)
                  actual.push(res.foodDistributionSocialWelfareData.actual)
                  comment.push(res.foodDistributionSocialWelfareData.comment)
                })
                this.target = target
                this.dateAndAction = dateAndAction
                this.actual = actual
                this.comment = comment
        }
      }
    }
}