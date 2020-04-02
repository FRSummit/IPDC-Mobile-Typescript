import { Component, Vue } from 'vue-property-decorator';
import ons from 'onsenui';
import WithRender from './report-landing.html';
import { SignalrWrapper } from "../../../signalrwrapper";
import { allReportService } from "../../../services/AllReportsService";
import { UnitPlanReportService } from "../../../services/UnitPlanReportService"
import { ReportSearchTerms } from "../../../models/ReportSearchTerms"
import { PlanData } from "../../../models/PlanData"
import { UnitPlanViewModelDto } from "../../../models/UnitPlanViewModelDto"
import { MemberPlanData } from "../../../models/MemberPlanData";
import { MeetingProgramPlanData } from "../../../models/MeetingProgramPlanData";
import { SocialWelfarePlanData } from "../../../models/SocialWelfarePlanData";
import { TeachingLearningProgramPlanData } from "../../../models/TeachingLearningProgramPlanData";
import { MaterialPlanData } from "../../../models/MaterialPlanData";
import { FinancePlanData } from "../../../models/FinancePlanData";
import $ from 'jquery'

@WithRender
@Component
export default class ReportLanding extends Vue {
    planOrReportTab !: null
    searchTerm = new ReportSearchTerms()
    unitPlanData !: UnitPlanViewModelDto
    unitPlanModifiedData !: UnitPlanViewModelDto
    unitPlanReportService = new UnitPlanReportService()
    isSaving = false
    isSubmitting = false
    orgReport !: []
    orgName !: []
    orgReportStatus !: []
    signalreventhandlers: any = {}
    planId:any
    signalr = new SignalrWrapper()
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
            helpInfo: false,
            progressbar: false,
            popoverVisible: false,
            popoverTarget: null,
            popoverDirection: 'up',
            coverTarget: false,
            flag: false,
            isExpanded: false,
            regular: false
        }
    };
    constructor() { 
        super()
        this.signalreventhandlers = {
            "UnitPlanSubmitted": this.onUnitPlanSubmitted,
            "UnitPlanSubmitFailed": this.onUnitPlanSubmitFailed
        };
    }
    async created() {
        this.progressbar = true
        this.planId = localStorage.getItem('planandreports_passing_unit_id')
        let tabActivationForPlanOrReport = JSON.parse(localStorage.getItem('reportingLanding_tab_activation')!).Tab
        this.planOrReportTab = tabActivationForPlanOrReport
        let a: any = []
        allReportService.search(this.searchTerm)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == this.planId) {
                        a.push(res.items[i])
                    }
                    this.progressbar = false
                }
            })
        this.orgReport = a
        this.unitPlanReportService
            .getPlan(this.planId)
            .then(res => {
                localStorage.setItem('selected_plan', JSON.stringify(res))
            })
        await this.attached()
        this.unit_items.push(this.unitPlanData)

        this.navbarInit()
    }
    navbarInit() {
        if(document.querySelector('.navbar')) {
          let navbar = document.querySelector('.navbar') as HTMLElement
          navbar.classList.remove('hide')
        }
    }
    async attached() {
        this.signalr.start();
        for (const key in this.signalreventhandlers) {
            if (this.signalreventhandlers.hasOwnProperty(key)) {
                this.signalr.on(key, this.signalreventhandlers[key]);
            }
        }
        await this.loadPlan();
    }
    async loadPlan() {
        const unitPlan = await this.unitPlanReportService.getPlan(this.planId);
        this.unitPlanData = unitPlan;
        this.unitPlanModifiedData = unitPlan;
    }
   async submitPlan() {
        try {
            await this.unitPlanReportService.submitPlan(this.unitPlanModifiedData.organization.id, this.planId);
            ons.notification.toast('Plan Submitted',{ timeout: 1000, animation: 'fall' }); 
        } catch(error) {
            ons.notification.toast('Error',{ timeout: 1000, animation: 'fall' });
        }
        this.isSubmitting = true;
        this.$store.state.reportStatus = 'PlanPromoted';
        let reportStatusDescriptionForInput = {'Status': 'PlanPromoted'};
        localStorage.setItem('reportStatusDescriptionForInput', JSON.stringify(reportStatusDescriptionForInput))
        window.location.replace('/report-landing-swip-report');
    }

    onUnitPlanSubmitted = (id: number) => {

    }
    onUnitPlanSubmitFailed = (e: {$values: string[]}) => {

    }
    
    formatreports(status: any) {
        if(status === "Draft")
            return  "Plan Not Submitted";
        else if(status === "PlanPromoted")
            return  "Plan Submitted, Report Not Submitted";
        else if(status === "Submitted")
            return  "Plan Submitted, Report Submitted";
        else return '';
    }
    removeUnderLine(description: any) {
        let descParts = description.split('_')
        description = descParts[0] + ' ' + descParts[2] + ' ' + descParts[3] + ' ' + descParts[4]
        return description
    }
    updated() {
        // $('.plan-section').insertBefore('.v-tabs')
        // if($('.report-section')) {
        //     document.querySelector('.report-section')?.classList.add('hide')
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
        console.log("test");
        
        if(this.$store.state.reportStatusFromInput) {
             let el = window.document.getElementById(this.$store.state.reportStatusFromInput)! as HTMLElement
            // el.classList.add('Page-MT')
            // window.location.href = '#' + this.$store.state.reportStatusFromInput

            // el.scrollIntoView(true)
            // document.querySelector('#regular-section')!.scrollIntoView(true);
            el.scrollIntoView(true);

            // el.scrollIntoView({behavior: 'smooth'});
            // console.log(el.getBoundingClientRect().y)
            // el.style.top = "100px";
            // let pgMT = document.querySelector('.Page-MT')! as HTMLElement
            // pgMT.style.position = 'absolute !important'
            // console.log(pgMT)
        }
    }
    mounted() {
        // let man = document.getElementById('manpower-section') as HTMLElement
        // man.scrollIntoView
        // document.getElementById('manpower-section')!.onclick = function () {
        //     // scrollTo(0, 100);
        //     console.log('jj')
        // }
    }
    test() {
        console.log('test')

        let manPower = document.getElementById('manpower-section') as HTMLElement
        manPower.scrollIntoView(true)


        // this.scrollTo(document.body, 0, 100);

        // $('html, body').animate({
        //     scrollTop: $('#manpower-section').offset()!.top
        // }, 1000)
    }
    // scrollTo(element: any, to: any, duration: any) {
    //     if (duration < 0) return;
    //     var difference = to - element.scrollTop;
    //     var perTick = difference / duration * 2;
    //     console.log(element + ' ' + to + ' ' + duration)

    //     setTimeout(function() {
    //         element.scrollTop = element.scrollTop + perTick;
    //         scrollTo(element, to, duration - 2);
    //     }, 10);
    // }
}