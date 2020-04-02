import { Component, Vue } from 'vue-property-decorator';
import WithRender from './report-landing.html';
import ons from 'onsenui';
import { SignalrWrapper } from "../../../signalrwrapper";
import { allReportService } from "../../../services/AllReportsService";
import { UnitPlanReportService } from "../../../services/UnitPlanReportService"
import { ReportSearchTerms } from "../../../models/ReportSearchTerms"
import { UnitReportViewModelDto } from "../../../models/UnitReportViewModelDto";
import { MemberReportData } from "../../../models/MemberReportData";
import { ReportUpdateData } from "../../../models/ReportUpdateData";
import { MeetingProgramData } from "../../../models/MeetingProgramData";
import { MeetingProgramReportData } from "../../../models/MeetingProgramReportData";
import { SocialWelfareData } from "../../../models/SocialWelfareData";
import { TeachingLearningProgramData } from "../../../models/TeachingLearningProgramData";
import { LibraryStockData } from "../../../models/LibraryStockData";
import { MaterialData } from "../../../models/MaterialData";
import { SocialWelfareReportData } from "../../../models/SocialWelfareReportData";
import { FinanceReportData } from "../../../models/FinanceReportData";
import { FinanceData } from "../../../models/FinanceData";
import $ from 'jquery'

@WithRender
@Component
export default class ReportLanding extends Vue {
    planOrReportTab !: null
    searchTerm = new ReportSearchTerms();
    unitReportData !: UnitReportViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitPlanReportService = new UnitPlanReportService();
    isSaving = false;
    isSubmitting = false;
    orgReport !: [];
    orgName !: [];
    orgReportStatus !: [];
    signalreventhandlers: any = {};
    reportId:any;
    unit_items: any
    progressbar !: any
    popoverVisible!: any
    popoverTarget!: null
    popoverDirection!: 'up'
    coverTarget!: false
    flag!: any
    data() {
        return {
            planOrReportTab: null,
            unit_items: [],
            orgReport: [],
            progressbar: false,
            popoverVisible: false,
            popoverTarget: null,
            popoverDirection: 'up',
            coverTarget: false,
            flag: false
        }
    };
    constructor() { 
        super()
        this.signalreventhandlers = {
            "ReportSubmitted": this.onUnitReportSubmitted,
            "ReportSubmitFailed": this.onUnitReportSubmitFailed
        };
    }

    async created() {
        this.progressbar = true
        this.reportId = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        this.planOrReportTab = tabActivationForPlanOrReport
        let a: any = []
        allReportService.search(this.searchTerm)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == this.reportId) {
                        a.push(res.items[i])
                    }
                    this.progressbar = false
                }
            })
        this.orgReport = a
        await this.attached()
        this.unit_items.push(this.unitReportData)

        this.navbarInit()
    }
    navbarInit() {
        if(document.querySelector('.navbar')) {
          let navbar = document.querySelector('.navbar') as HTMLElement
          navbar.classList.remove('hide')
        }
    }
    async attached() {
        const signalr = new SignalrWrapper();
        signalr.start();
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                signalr.on(key, this.signalreventhandlers[key]);
            }
        }
        await this.loadPlan();
    }

    async loadPlan() {
        const unitReportData = await this.unitPlanReportService.getReport(this.reportId);
        this.unitReportData = unitReportData;
        this.unitReportModifiedData = unitReportData;
    }

    async submitReport() {
        try {
            await this.unitPlanReportService.submitReport(this.unitReportModifiedData.organization.id, this.reportId);
            ons.notification.toast('Report Submitted',{ timeout: 1000, animation: 'fall' }); 
        } catch(error) {
            ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
        }
        this.isSubmitting = true;
        this.$store.state.reportStatus = 'Submitted'
        window.location.reload()
    }
    
    onUnitReportSubmitted = (id: number) => {
    }

    onUnitReportSubmitFailed = (e: {$values: string[]}) => {
    }
    formatreports(status: any) {
        if(this.$store.state.reportStatus === 'Submitted') return  "Plan Submitted, Report Submitted";
        else {
            if(status === "Draft")
                return  "Plan Not Submitted";
            else if(status === "PlanPromoted")
                return  "Plan Submitted, Report Not Submitted";
            else if(status === "Submitted")
                return  "Plan Submitted, Report Submitted";
            else return '';
        }
    }
    removeUnderLine(description: any) {
        let descParts = description.split('_')
        description = descParts[0] + ' ' + descParts[2] + ' ' + descParts[3] + ' ' + descParts[4]
        return description
    }
    updated() {
        // $('.report-section').insertBefore('.v-tabs')
        // if($('.plan-section')) {
        //     document.querySelector('.plan-section')?.classList.add('hide')
        // }
        // if(document.getElementById('manpower-section') && !this.flag) {
        //     this.navigateSection()
        // }
    }
    showPopover(event:any, direction:any, coverTarget:false) {
        this.flag = true
        if(event.clientY + 260 + 10 > window.innerHeight) direction = 'up'
        this.popoverTarget = event;
        this.popoverDirection = direction;
        this.coverTarget = coverTarget;
        this.popoverVisible = true;
    }
    navigateSection() {
        if(this.$store.state.reportStatusFromInput) {
            let el = window.document.getElementById(this.$store.state.reportStatusFromInput)! as HTMLElement
            el.scrollIntoView(true);
            // window.location.href = '#' + this.$store.state.reportStatusFromInput
            // el.scrollIntoView({behavior: 'smooth'});
            // let pgMT = document.querySelector('.Page-MT')! as HTMLElement
            // pgMT.style.marginTop = '56px'
        }
    }
}