import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {SocialWelfarePlanData} from "../../../../models/SocialWelfarePlanData";
import {SocialWelfareData} from "../../../../models/SocialWelfareData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { planDataBuilder } from "../../../../PlanDataBuilder";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class Other extends Vue {
    planOrReportTab !: null
    otherSocialWelfarePlanData !: SocialWelfarePlanData;
    otherSocialWelfareData !: SocialWelfareData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    target !: null
    dateAndAction !: null
    actual !: null
    comment !: null
    signalr = new SignalrWrapper();

    unitPlanReportService = new UnitPlanReportService();

    constructor() 
    { 
        super()
        this.signalreventhandlers = {
            "UnitPlanUpdated": this.onUnitPlanUpdated,
            "UnitPlanUpdateFailed": this.onUnitPlanUpdateFailed,
        };
    }
    
    data() {
        return {
            planOrReportTab: null,
            target: null,
            dateAndAction: null,
            actual: null,
            comment: null,
        }
    }

    async created() {
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
        this.unitPlan = await this.unitPlanReportService.getPlan(this.unitReportId);
        const initialData = planDataBuilder.getPlanData(this.unitPlan);
        this.unitPlanModifiedData = this.unitPlan;
        this.initialJson = JSON.stringify(initialData);
        this.otherSocialWelfarePlanData = this.unitPlan.otherSocialWelfarePlanData;
        this.target = localStorage.getItem('socialWelfare_otherSocialWelfarePlanData') ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).target : this.unitPlan.otherSocialWelfarePlanData.target;
        this.dateAndAction = localStorage.getItem('socialWelfare_otherSocialWelfarePlanData') ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).dateAndAction : this.unitPlan.otherSocialWelfarePlanData.dateAndAction;
        if(this.unitPlan.reportStatusDescription === 'PlanPromoted' || this.unitPlan.reportStatusDescription === 'Submitted'){
          this.planInputReadable()
        }

      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherSocialWelfareData = this.unitReport.transportSocialWelfareData;

        this.target = localStorage.getItem('socialWelfare_transportSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).target : this.unitReport.transportSocialWelfareData.target;
        this.dateAndAction = localStorage.getItem('socialWelfare_transportSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).dateAndAction : this.unitReport.transportSocialWelfareData.dateAndAction;
        this.actual = localStorage.getItem('socialWelfare_transportSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).actual : this.unitReport.transportSocialWelfareData.actual;
        this.comment = localStorage.getItem('socialWelfare_transportSocialWelfareData') ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).comment : this.unitReport.transportSocialWelfareData.comment;
        if(this.unitReport.reportStatusDescription === 'Submitted'){
          this.reportInputReadable()
        }
      }
      await this.signalrStart();
    }

    async signalrStart() {
      this.signalr.start();
      for (const key in this.signalreventhandlers) {
          if (this.signalreventhandlers.hasOwnProperty(key)) {
              this.signalr.on(key, this.signalreventhandlers[key]);
          }
       }
    }

    backButton() {
        if(this.planOrReportTab === 'REPORT') 
        this.$router.push('/report-landing-swip-report')        
        else if(this.unitPlan.reOpenedReportStatusDescription === 'Draft') 
        this.$router.push('/report-landing-plan')
        else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      if(this.planOrReportTab === 'PLAN') {
        this.otherSocialWelfarePlanData.target =  this.target!;
        this.otherSocialWelfarePlanData.dateAndAction =  this.dateAndAction!;
      
        if (!this.isPlanDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.unitReportId, planDataBuilder.getPlanData(this.unitPlanModifiedData));
            ons.notification.alert('Plan Updated',{title :''}); 
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
        }

      } if(this.planOrReportTab === 'REPORT') {
        this.otherSocialWelfareData.target =  this.target!;
        this.otherSocialWelfareData.dateAndAction =  this.dateAndAction!;
        this.otherSocialWelfareData.actual =  this.actual!;
        this.otherSocialWelfareData.comment =  this.comment!;

        if (!this.isReportDirty) return;
        try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
            await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
            ons.notification.alert('Report Updated',{title :''});
        } catch(error) {
          ons.notification.alert('Error',{title :''});
            return;
        }
      }
      this.changeTab()
    }

    get isPlanDirty() { 
      const latestJson = JSON.stringify(planDataBuilder.getPlanData(this.unitPlanModifiedData));
      return latestJson !== this.initialJson;
    }

    get isReportDirty() { 
      const latestJson = JSON.stringify(reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
      return latestJson !== this.initialJson;;
    }
    
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[9] as HTMLElement
      tab.click()
    }

    onUnitPlanUpdated = async (id: number) => {
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }

    planInputReadable() {
    }

    reportInputReadable() {
    }
}