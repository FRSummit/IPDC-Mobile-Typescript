import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './book-library.html';
import { UnitPlanReportService } from "../../../../services/UnitPlanReportService"
import ons from 'onsenui';
import {LibraryStockData} from "../../../../models/LibraryStockData";
import { UnitPlanViewModelDto } from "../../../../models/UnitPlanViewModelDto";
import { UnitReportViewModelDto } from "../../../../models/UnitReportViewModelDto";
import { reportDataBuilder } from "../../../../ReportDataBuilder";
import { SignalrWrapper } from "../../../../signalrwrapper";

@WithRender

@Component
export default class BookLibrary extends Vue {
    planOrReportTab !: null
    bookLibraryStockData !: LibraryStockData;
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
    thisPeriod !: any
    comment !: null
    progressbar !: any
    signalr = new SignalrWrapper();

    unitPlanReportService = new UnitPlanReportService();
    planOrReportTabStatus: any

    defTarget = true
    increasedTargetVal !: any

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
            planOrReportTabStatus: null,
            lastPeriod: null,
            increased: null,
            decreased: null, 
            thisPeriod: null, 
            comment: null,
            progressbar: false,
            increasedTargetVal: null,
        }
    }

    async created() {
      this.$store.state.reportStatusFromInput = 'library-section'
      this.planOrReportTabStatus = JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status
      this.unitReportId= localStorage.getItem('planandreports_passing_unit_id')
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      this.planOrReportTab = tabActivationForPlanOrReport
      if(tabActivationForPlanOrReport === 'PLAN') {
      } else if(tabActivationForPlanOrReport === 'REPORT') {
        this.unitReport = await this.unitPlanReportService.getReport(this.unitReportId);
        this.unitReportModifiedData = this.unitReport;
        const initialData = reportDataBuilder.getMemberReportData(this.unitReport);
        this.initialJson = JSON.stringify(initialData);
        this.bookLibraryStockData = this.unitReport.bookLibraryStockData;
        this.lastPeriod = localStorage.getItem('others_bookLibraryStockData') ? JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).lastPeriod : this.unitReport.bookLibraryStockData.lastPeriod;
        this.thisPeriod = localStorage.getItem('others_bookLibraryStockData') ? JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).thisPeriod : this.unitReport.bookLibraryStockData.thisPeriod;
        this.increased = localStorage.getItem('others_bookLibraryStockData') ? JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).increased : this.unitReport.bookLibraryStockData.increased;
        this.decreased = localStorage.getItem('others_bookLibraryStockData') ? JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).decreased : this.unitReport.bookLibraryStockData.decreased;
        this.comment = localStorage.getItem('others_bookLibraryStockData') ? JSON.parse(localStorage.getItem('others_bookLibraryStockData')!).comment : this.unitReport.bookLibraryStockData.comment;
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
      document.querySelector('.navbar')!.classList.remove('hide')
      if(this.planOrReportTab === 'REPORT')
      this.$router.push('/report-landing-swip-report')        
      else if(this.$store.state.reportStatus === 'Draft' || JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Draft') 
      this.$router.push('/report-landing-plan')
      else this.$router.push('/report-landing-swip')
    }

    async onSubmit() {
      this.progressbar = true
      if(this.planOrReportTab === 'PLAN') {
        this.unitPlanModifiedData = await this.unitPlanReportService.getPlan(this.unitReportId);
        this.progressbar = false

      } if(this.planOrReportTab === 'REPORT') {
        this.unitReportModifiedData = await this.unitPlanReportService.getReport(this.unitReportId);
        this.bookLibraryStockData.lastPeriod =  this.lastPeriod!;
        this.bookLibraryStockData.thisPeriod =  this.thisPeriod!;
        this.bookLibraryStockData.increased =  this.increased!;
        this.bookLibraryStockData.decreased =  this.decreased!;
        this.bookLibraryStockData.comment =  this.comment!;
        this.unitReportModifiedData.bookLibraryStockData = this.bookLibraryStockData;

        if (this.isReportDirty()){
          try {
              window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.unitReportId, reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
              ons.notification.toast('Report Updated',{ timeout: 1000, animation: 'fall' });
          } catch(error) {
            ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
              return;
          }
        }
        else{
          ons.notification.toast('Nothing to change',{ timeout: 1000, animation: 'fall' });
        }
        this.progressbar = false
      }
      // this.changeTab()
    }

    isReportDirty() { 
      const latestJson = JSON.stringify(reportDataBuilder.getMemberReportData(this.unitReportModifiedData));
      if(latestJson !== this.initialJson)
      {
        this.initialJson = latestJson;
        return true;
      }
      else return false;
    }
    
    changeTab() {
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      tab.click()
    }

    onUnitPlanUpdated = async (id: number) => {
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
    }
    isEditable() {
      let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
      if(tabActivationForPlanOrReport === 'PLAN' && (JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'PlanPromoted' || JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Submitted')) {
        return true
      } else if (tabActivationForPlanOrReport === 'REPORT' && JSON.parse(localStorage.getItem('reportStatusDescriptionForInput')!).Status === 'Submitted') {
        return true
      }
    }
    planOrReportTabStatusCreate(status: any) {
      if(status === 'Draft' && this.planOrReportTab === 'PLAN') return  "Edit Plan";
      else if(status === 'PlanPromoted' && this.planOrReportTab === 'PLAN') return  "View Plan";
      else if(status === 'PlanPromoted' && this.planOrReportTab === 'REPORT') return  "Edit Report";
      else if(status === 'Submitted' && this.planOrReportTab === 'PLAN') return  "View Plan";
      else if(status === 'Submitted' && this.planOrReportTab === 'REPORT') return  "View Report";
      else return '';
    }
    nextBtn() {
      let tab = document.querySelectorAll('.my_tab')[1] as HTMLElement
      this.$router.replace('/plan-and-report-edit/other/audio-library')
      tab.click()
    }
    memberIncreasedEdit(i: any) {
      this.defTarget = false
      let upgradeTarget = this.lastPeriod!
      let increased = this.increased + i.key
      let decreased = this.decreased!
      let calc = upgradeTarget + (increased - decreased)
      this.thisPeriod = calc
      this.increasedTargetVal = calc
      if(upgradeTarget === this.thisPeriod) this.defTarget = true
    }
    memberDecreasedEdit(i: any) {
      this.defTarget = false
      let upgradeTarget = this.lastPeriod!
      let increased = this.increased!
      let decreased = this.decreased + i.key
      let calc = upgradeTarget + (increased - decreased)
      this.thisPeriod = calc

      this.increasedTargetVal = calc
      if(upgradeTarget === this.thisPeriod) this.defTarget = true
    }
    mounted() {
      if(document.querySelector('.navbar')) {
        let navbar = document.querySelector('.navbar') as HTMLElement
        navbar.classList.add('hide')
      }
      if(document.getElementById('increased')! && document.getElementById('decreased')!) {
        document.getElementById('increased')!.addEventListener("keydown", (e) => {
          if(this.defTarget = true) this.defTarget = false
          if (e.code === 'Backspace') {
            console.log(this.thisPeriod + ' ' + this.increased + ' ' + this.decreased)
            let upgradeTarget = this.lastPeriod!
            let increased = this.increased!
            let decreased = this.decreased!
            this.thisPeriod = upgradeTarget + (Math.floor(increased / 10) - decreased)
            
            this.increasedTargetVal = this.thisPeriod
          }
        });
        document.getElementById('decreased')!.addEventListener("keydown", (e) => {
          if(this.defTarget = true) this.defTarget = false
          if (e.code === 'Backspace') {
            let upgradeTarget = this.lastPeriod!
            let increased = this.increased!
            let decreased = this.decreased!
            this.thisPeriod = upgradeTarget + (increased - (Math.floor(decreased / 10)))
            
            this.increasedTargetVal = this.thisPeriod
          }
        });
      }
    }
}