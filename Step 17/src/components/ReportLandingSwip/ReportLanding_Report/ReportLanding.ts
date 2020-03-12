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

@WithRender

@Component
export default class ReportLanding extends Vue {
    searchTerm = new ReportSearchTerms();
    unitReportData !: UnitReportViewModelDto;
    unitReportModifiedData !: UnitReportViewModelDto;
    unitPlanReportService = new UnitPlanReportService();
    initialJson = "";
    isSaving = false;
    isSubmitting = false;
    orgReport !: [];
    orgName !: [];
    orgReportStatus !: [];
    signalreventhandlers: any = {};
    reportId:any;
    data(){
        return {
            unit_items: [],
            orgReport: [],
        }
    };

    constructor() 
    { 
        super()
        this.signalreventhandlers = {
            "UnitReportUpdated": this.onUnitReportUpdated,
            "UnitReportUpdateFailed": this.onUnitReportUpdateFailed,
            "ReportSubmitted": this.onUnitReportSubmitted,
            "ReportSubmitFailed": this.onUnitReportSubmitFailed
        };
    }

    async created() {
        this.reportId = localStorage.getItem('planandreports_passing_unit_id')
        let a: any = []
        allReportService.search(this.searchTerm)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == this.reportId) {
                        a.push(res.items[i])
                    }
                }
            })
        this.orgReport = a
    await this.attached()
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
        this.setInitialData();
    }

    setInitialData() {
        const initialData = this.getMemberReportData(this.unitReportData);
        this.initialJson = JSON.stringify(initialData);
    }

    async saveReport() {
        if (!this.isDirty) return;
          try {
              await this.unitPlanReportService.updateReport(this.unitReportModifiedData.organization.id, this.reportId, this.getMemberReportData(this.unitReportModifiedData));
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
          this.isSaving = true;
          ons.notification.alert('Plan Saved',{title :''}); 
      }

      get isDirty() {
        this.localStorageData();  
        const latestJson = JSON.stringify(this.getMemberReportData(this.unitReportModifiedData));
        return latestJson !== this.initialJson;
    }

    async submitReport() {
        try {
            await this.unitPlanReportService.submitReport(this.unitReportModifiedData.organization.id, this.reportId);
        } catch(error) {
            ons.notification.alert('Error',{title :''});
        }
        this.isSubmitting = true;
        ons.notification.alert('Report Saved',{title :''}); 
    }
    
    getMemberReportData(unitReport : UnitReportViewModelDto): ReportUpdateData {
        return new ReportUpdateData(
            this.makeMemberData(unitReport.associateMemberData),
            this.makeMemberData(unitReport.preliminaryMemberData),
            this.makeMemberData(unitReport.supporterMemberData),
            this.makeMemberData(unitReport.memberMemberData),
            this.makeMeetingProgramData(unitReport.workerMeetingProgramData),
            this.makeMeetingProgramData(unitReport.cmsMeetingProgramData),
            this.makeMeetingProgramData(unitReport.smMeetingProgramData),
            this.makeMeetingProgramData(unitReport.memberMeetingProgramData),
            this.makeMeetingProgramData(unitReport.dawahMeetingProgramData),
            this.makeMeetingProgramData(unitReport.stateLeaderMeetingProgramData),
            this.makeMeetingProgramData(unitReport.stateOutingMeetingProgramData),
            this.makeMeetingProgramData(unitReport.iftarMeetingProgramData),
            this.makeMeetingProgramData(unitReport.learningMeetingProgramData),
            this.makeMeetingProgramData(unitReport.socialDawahMeetingProgramData),
            this.makeMeetingProgramData(unitReport.dawahGroupMeetingProgramData),
            this.makeMeetingProgramData(unitReport.nextGMeetingProgramData),
            this.makeMeetingProgramData(unitReport.tafsirMeetingProgramData),
            this.makeMeetingProgramData(unitReport.unitMeetingProgramData),
            this.makeMeetingProgramData(unitReport.bbqMeetingProgramData),
            this.makeMeetingProgramData(unitReport.gatheringMeetingProgramData),
            this.makeMeetingProgramData(unitReport.familyVisitMeetingProgramData),
            this.makeMeetingProgramData(unitReport.eidReunionMeetingProgramData),
            this.makeMeetingProgramData(unitReport.otherMeetingProgramData),
            this.makeTeachingLearningProgramData(unitReport.groupStudyTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.studyCircleForAssociateMemberTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.studyCircleTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.practiceDarsTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.stateLearningCampTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.quranStudyTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.hadithTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.quranClassTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.weekendIslamicSchoolTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.memorizingAyatTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.memorizingHadithTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.memorizingDoaTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.stateLearningSessionTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.stateQiyamulLailTeachingLearningProgramData),
            this.makeTeachingLearningProgramData(unitReport.otherTeachingLearningProgramData),
            this.makeSocialWelfareReportData(unitReport.qardeHasanaSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.patientVisitSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.socialVisitSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.transportSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.shiftingSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.shoppingSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.foodDistributionSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.cleanUpAustraliaSocialWelfareData),
            this.makeSocialWelfareReportData(unitReport.otherSocialWelfareData),
            this.makeMaterialData(unitReport.bookSaleMaterialData),
            this.makeMaterialData(unitReport.bookDistributionMaterialData),
            this.makeMaterialData(unitReport.vhsSaleMaterialData),
            this.makeMaterialData(unitReport.vhsDistributionMaterialData),
            this.makeMaterialData(unitReport.emailDistributionMaterialData),
            this.makeMaterialData(unitReport.ipdcLeafletDistributionMaterialData),
            this.makeMaterialData(unitReport.otherSaleMaterialData),
            this.makeMaterialData(unitReport.otherDistributionMaterialData),
            this.makeLibraryStockData(unitReport.bookLibraryStockData),
            this.makeLibraryStockData(unitReport.vhsLibraryStockData),
            this.makeLibraryStockData(unitReport.otherLibraryStockData),
            this.makeFinanceReportData(unitReport.baitulMalFinanceData),
            this.makeFinanceReportData(unitReport.aDayMasjidProjectFinanceData),
            this.makeFinanceReportData(unitReport.masjidTableBankFinanceData),
            unitReport.comment
        );
    }

    private makeMeetingProgramData(original: MeetingProgramData): MeetingProgramReportData {
        return new MeetingProgramReportData(original.actual, original.averageAttendance, original.comment);
    }

    private makeMemberData(original: MemberReportData): MemberReportData {
        return new MemberReportData(original.lastPeriod, original.increased, original.decreased, original.comment, original.personalContact);
    }

    private makeTeachingLearningProgramData(original: TeachingLearningProgramData): TeachingLearningProgramData {
        return new TeachingLearningProgramData(original.target, original.dateAndAction, original.actual, original.averageAttendance, original.comment);
    }
    
    private makeSocialWelfareReportData(original: SocialWelfareData): SocialWelfareReportData {
        return new SocialWelfareReportData(original.actual, original.comment);
    }

    private makeMaterialData(original: MaterialData): MaterialData {
        return new MaterialData(original.target, original.dateAndAction, original.actual, original.comment);
    }

    private makeLibraryStockData(original: LibraryStockData): LibraryStockData {
        return new LibraryStockData(original.lastPeriod, original.thisPeriod, original.increased, original.decreased, original.comment);
    }

    private makeFinanceReportData(original: FinanceData): FinanceReportData {
        return new FinanceReportData(original.workerPromiseLastPeriod,
            original.lastPeriod,
            original.workerPromiseIncreased,
            original.workerPromiseDecreased,
            original.collection,
            original.expense,
            original.nisabPaidToCentral,
            original.comment);
    }

    localStorageData() {
        this.unitReportModifiedData.memberMemberData = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!) : this.unitReportData.memberMemberData
        this.unitReportModifiedData.associateMemberData = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!) : this.unitReportData.associateMemberData
        this.unitReportModifiedData.preliminaryMemberData = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!) : this.unitReportData.preliminaryMemberData
        this.unitReportModifiedData.supporterMemberData = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!) : this.unitReportData.supporterMemberData
    }

    onUnitReportUpdated = async(id: number) => {
        this.isSaving = false;
    }

    onUnitReportUpdateFailed = (e: {$values: string[]}) => {
        this.isSaving = false;
    }

    onUnitReportSubmitted = (id: number) => {
    }

    onUnitReportSubmitFailed = (e: {$values: string[]}) => {
    }
}