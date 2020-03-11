import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './vhs-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {LibraryStockData} from "../../../../models/LibraryStockData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class VHSLibrary extends Vue {
    planOrReportTab !: null
    vhsLibraryStockData !: LibraryStockData;
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
        if(this.unitPlan.reportStatusDescription === 'PlanPromoted' || this.unitPlan.reportStatusDescription === 'Submitted'){
          this.planInputReadable()
        }
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.vhsLibraryStockData = this.unitReport.vhsLibraryStockData;
        this.lastPeriod = localStorage.getItem('others_vhsLibraryStockData') ? JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).lastPeriod : this.unitReport.vhsLibraryStockData.lastPeriod;
        this.thisPeriod = localStorage.getItem('others_vhsLibraryStockData') ? JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).thisPeriod : this.unitReport.vhsLibraryStockData.thisPeriod;
        this.increased = localStorage.getItem('others_vhsLibraryStockData') ? JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).increased : this.unitReport.vhsLibraryStockData.increased;
        this.decreased = localStorage.getItem('others_vhsLibraryStockData') ? JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).decreased : this.unitReport.vhsLibraryStockData.decreased;
        this.comment = localStorage.getItem('others_vhsLibraryStockData') ? JSON.parse(localStorage.getItem('others_vhsLibraryStockData')!).comment : this.unitReport.vhsLibraryStockData.comment;
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

      } if(this.planOrReportTab === 'REPORT') {
        this.vhsLibraryStockData.lastPeriod =  this.lastPeriod!;
        this.vhsLibraryStockData.thisPeriod =  this.thisPeriod!;
        this.vhsLibraryStockData.increased =  this.increased!;
        this.vhsLibraryStockData.decreased =  this.decreased!;
        this.vhsLibraryStockData.comment =  this.comment!;

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

    planInputReadable() {
    }

    reportInputReadable() {
    }
}