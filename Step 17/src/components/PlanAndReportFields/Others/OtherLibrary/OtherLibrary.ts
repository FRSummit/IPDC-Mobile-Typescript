import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './other-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {LibraryStockData} from "../../../../models/LibraryStockData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class OtherLibrary extends Vue {
    planOrReportTab !: null
    otherLibraryStockData !: LibraryStockData;
    unitPlan !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitReport !: UnitReportViewModelDto;
    signalreventhandlers: any = {};
    unitReportId:any;
    initialJson = "";
    lastPeriod !: null
    increased !: null
    decreased !: null
    thisPeriod !: null
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
            lastPeriod: null,
            thisPeriod: null,
            increased: null,
            decreased: null,
            comment: null,
        }
    }

    async created() {
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.otherLibraryStockData = this.unitReport.otherLibraryStockData;
        this.lastPeriod = localStorage.getItem('others_otherLibraryStockData') ? JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).lastPeriod : this.unitReport.otherLibraryStockData.lastPeriod;
        this.thisPeriod = localStorage.getItem('others_otherLibraryStockData') ? JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).thisPeriod : this.unitReport.otherLibraryStockData.thisPeriod;
        this.increased = localStorage.getItem('others_otherLibraryStockData') ? JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).increased : this.unitReport.otherLibraryStockData.increased;
        this.decreased = localStorage.getItem('others_otherLibraryStockData') ? JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).decreased : this.unitReport.otherLibraryStockData.decreased;
        this.comment = localStorage.getItem('others_otherLibraryStockData') ? JSON.parse(localStorage.getItem('others_otherLibraryStockData')!).comment : this.unitReport.otherLibraryStockData.comment;
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

      } if(this.planOrReportTab === 'REPORT') {
        this.otherLibraryStockData.lastPeriod =  this.lastPeriod!;
        this.otherLibraryStockData.thisPeriod =  this.thisPeriod!;
        this.otherLibraryStockData.increased =  this.increased!;
        this.otherLibraryStockData.decreased =  this.decreased!;
        this.otherLibraryStockData.comment =  this.comment!;

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

    get isReportDirty() { 
      const latestJson = JSON.stringify(reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
      return latestJson !== this.initialJson;;
    }
    
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[2] as HTMLElement
      tab.click()
    }

    onUnitPlanUpdated = async (id: number) => {
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }
    isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (this.$store.state.reportStatus === 'PlanPromoted' || this.$store.state.reportStatus === 'Submitted')) {
        return true
      } else if (tabActivationForPlanOrReport === 'REPORT' && this.$store.state.reportStatus === 'Submitted') {
        return true
      }
    }
}