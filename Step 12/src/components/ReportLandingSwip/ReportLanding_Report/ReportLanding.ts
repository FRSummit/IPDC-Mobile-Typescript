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
        console.log(this.reportId)
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
        console.log(a)
        
    // Signar Start
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
            console.log('Save Report')
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
        console.log('submitReport')
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
         // Load the local storage data
        // this.unitReportModifiedData.associateMemberData.nameAndContactNumber = '01564454'
        
        // MemberPlanData

        this.unitReportModifiedData.memberMemberData = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!) : this.unitReportData.memberMemberData
        this.unitReportModifiedData.associateMemberData = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!) : this.unitReportData.associateMemberData
        this.unitReportModifiedData.preliminaryMemberData = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!) : this.unitReportData.preliminaryMemberData
        this.unitReportModifiedData.supporterMemberData = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!) : this.unitReportData.supporterMemberData
        
        // this.unitReportModifiedData.memberMemberData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.target : this.unitReportData.memberMemberData.upgradeTarget
        // this.unitReportModifiedData.memberMemberData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.nameAndContactNumber : this.unitReportData.memberMemberData.nameAndContactNumber
        // this.unitReportModifiedData.memberMemberData.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!).memberMemberData.action : this.unitReportData.memberMemberData.action
        
        // this.unitReportModifiedData.associateMemberData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.target : this.unitReportData.associateMemberData.upgradeTarget
        // this.unitReportModifiedData.associateMemberData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.nameAndContactNumber : this.unitReportData.associateMemberData.nameAndContactNumber
        // this.unitReportModifiedData.associateMemberData.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberData')!).associateMemberData.action : this.unitReportData.associateMemberData.action
        
        // this.unitReportModifiedData.preliminaryMemberData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.target : this.unitReportData.preliminaryMemberData.upgradeTarget
        // this.unitReportModifiedData.preliminaryMemberData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.nameAndContactNumber : this.unitReportData.preliminaryMemberData.nameAndContactNumber
        // this.unitReportModifiedData.preliminaryMemberData.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberData')!).preliminaryMemberData.action : this.unitReportData.preliminaryMemberData.action
        
        // this.unitReportModifiedData.supporterMemberData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).supporterMemberData.target : this.unitReportData.supporterMemberData.upgradeTarget
        // this.unitReportModifiedData.supporterMemberData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).supporterMemberData.nameAndContactNumber : this.unitReportData.supporterMemberData.nameAndContactNumber
        // this.unitReportModifiedData.supporterMemberData.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberData')!).supporterMemberData.action : this.unitReportData.supporterMemberData.action
        

        // // MeetingProgramData
        // this.unitReportModifiedData.workerMeetingProgramData =  localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramData')!).workerMeetingProgramData.target : this.unitReportData.workerMeetingProgramData.target
        // this.unitReportModifiedData.workerMeetingProgramData =  localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramData')!).workerMeetingProgramData.dateAndAction : this.unitReportData.workerMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.cmsMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramData')!).cmsMeetingProgramData.target : this.unitReportData.cmsMeetingProgramData.target
        // this.unitReportModifiedData.cmsMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramData')!).cmsMeetingProgramData.dateAndAction : this.unitReportData.cmsMeetingProgramData.dateAndAction

        // this.unitReportModifiedData.smMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramData')!).smMeetingProgramData.target : this.unitReportData.smMeetingProgramData.target
        // this.unitReportModifiedData.smMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramData')!).smMeetingProgramData.dateAndAction : this.unitReportData.smMeetingProgramData.dateAndAction

        // this.unitReportModifiedData.memberMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramData')!).memberMeetingProgramData.target : this.unitReportData.memberMeetingProgramData.target
        // this.unitReportModifiedData.memberMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramData')!).memberMeetingProgramData.dateAndAction : this.unitReportData.memberMeetingProgramData.dateAndAction

        // this.unitReportModifiedData.dawahMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).dawahMeetingProgramData.target : this.unitReportData.dawahMeetingProgramData.target
        // this.unitReportModifiedData.dawahMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramData')!).dawahMeetingProgramData.dateAndAction : this.unitReportData.dawahMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.stateLeaderMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.target : this.unitReportData.stateLeaderMeetingProgramData.target
        // this.unitReportModifiedData.stateLeaderMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramData')!).stateLeaderMeetingProgramData.dateAndAction : this.unitReportData.stateLeaderMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.stateOutingMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramData')!).stateOutingMeetingProgramData.target : this.unitReportData.stateOutingMeetingProgramData.target
        // this.unitReportModifiedData.stateOutingMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramData')!).stateOutingMeetingProgramData.dateAndAction : this.unitReportData.stateOutingMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.iftarMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramData')!).iftarMeetingProgramData.target : this.unitReportData.iftarMeetingProgramData.target
        // this.unitReportModifiedData.iftarMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramData')!).iftarMeetingProgramData.dateAndAction : this.unitReportData.iftarMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.learningMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.target : this.unitReportData.learningMeetingProgramData.target
        // this.unitReportModifiedData.learningMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramData')!).learningMeetingProgramData.dateAndAction : this.unitReportData.learningMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.socialDawahMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.target : this.unitReportData.socialDawahMeetingProgramData.target
        // this.unitReportModifiedData.socialDawahMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramData')!).socialDawahMeetingProgramData.dateAndAction : this.unitReportData.socialDawahMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.dawahGroupMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.target : this.unitReportData.dawahGroupMeetingProgramData.target
        // this.unitReportModifiedData.dawahGroupMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramData')!).dawahGroupMeetingProgramData.dateAndAction : this.unitReportData.dawahGroupMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.nextGMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramData')!).nextGMeetingProgramData.target : this.unitReportData.nextGMeetingProgramData.target
        // this.unitReportModifiedData.nextGMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramData')!).nextGMeetingProgramData.dateAndAction : this.unitReportData.nextGMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.tafsirMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.target : this.unitReportData.tafsirMeetingProgramData.target
        // this.unitReportModifiedData.tafsirMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramData')!).tafsirMeetingProgramData.dateAndAction : this.unitReportData.tafsirMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.unitMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramData')!).unitMeetingProgramData.target : this.unitReportData.unitMeetingProgramData.target
        // this.unitReportModifiedData.unitMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramData')!).unitMeetingProgramData.dateAndAction : this.unitReportData.unitMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.bbqMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramData')!).bbqMeetingProgramData.target : this.unitReportData.bbqMeetingProgramData.target
        // this.unitReportModifiedData.bbqMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramData')!).bbqMeetingProgramData.dateAndAction : this.unitReportData.bbqMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.gatheringMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramData')!).gatheringMeetingProgramData.target : this.unitReportData.gatheringMeetingProgramData.target
        // this.unitReportModifiedData.gatheringMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramData')!).gatheringMeetingProgramData.dateAndAction : this.unitReportData.gatheringMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.familyVisitMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramData')!).familyVisitMeetingProgramData.target : this.unitReportData.familyVisitMeetingProgramData.target
        // this.unitReportModifiedData.familyVisitMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramData')!).familyVisitMeetingProgramData.dateAndAction : this.unitReportData.familyVisitMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.eidReunionMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.target : this.unitReportData.eidReunionMeetingProgramData.target
        // this.unitReportModifiedData.eidReunionMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramData')!).eidReunionMeetingProgramData.dateAndAction : this.unitReportData.eidReunionMeetingProgramData.dateAndAction
        
        // this.unitReportModifiedData.otherMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.target : this.unitReportData.otherMeetingProgramData.target
        // this.unitReportModifiedData.otherMeetingProgramData = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramData')!).otherMeetingProgramData.dateAndAction : this.unitReportData.otherMeetingProgramData.dateAndAction
        

        // // TeachingLearningProgramData
        // this.unitReportModifiedData.groupStudyTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.target : this.unitReportData.groupStudyTeachingLearningProgramData.target
        // this.unitReportModifiedData.groupStudyTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramData')!).groupStudyTeachingLearningProgramData.dateAndAction : this.unitReportData.groupStudyTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.studyCircleForAssociateMemberTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.target : this.unitReportData.studyCircleForAssociateMemberTeachingLearningProgramData.target
        // this.unitReportModifiedData.studyCircleForAssociateMemberTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramData')!).studyCircleForAssociateMemberTeachingLearningProgramData.dateAndAction : this.unitReportData.studyCircleForAssociateMemberTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.studyCircleTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.target : this.unitReportData.studyCircleTeachingLearningProgramData.target
        // this.unitReportModifiedData.studyCircleTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramData')!).studyCircleTeachingLearningProgramData.dateAndAction : this.unitReportData.studyCircleTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.practiceDarsTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.target : this.unitReportData.practiceDarsTeachingLearningProgramData.target
        // this.unitReportModifiedData.practiceDarsTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramData')!).practiceDarsTeachingLearningProgramData.dateAndAction : this.unitReportData.practiceDarsTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.stateLearningCampTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.target : this.unitReportData.stateLearningCampTeachingLearningProgramData.target
        // this.unitReportModifiedData.stateLearningCampTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramData')!).stateLearningCampTeachingLearningProgramData.dateAndAction : this.unitReportData.stateLearningCampTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.quranStudyTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.target : this.unitReportData.quranStudyTeachingLearningProgramData.target
        // this.unitReportModifiedData.quranStudyTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramData')!).quranStudyTeachingLearningProgramData.dateAndAction : this.unitReportData.quranStudyTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.hadithTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.target : this.unitReportData.hadithTeachingLearningProgramData.target
        // this.unitReportModifiedData.hadithTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramData')!).hadithTeachingLearningProgramData.dateAndAction : this.unitReportData.hadithTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.quranClassTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.target : this.unitReportData.quranClassTeachingLearningProgramData.target
        // this.unitReportModifiedData.quranClassTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramData')!).quranClassTeachingLearningProgramData.dateAndAction : this.unitReportData.quranClassTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.weekendIslamicSchoolTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.target : this.unitReportData.weekendIslamicSchoolTeachingLearningProgramData.target
        // this.unitReportModifiedData.weekendIslamicSchoolTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramData')!).weekendIslamicSchoolTeachingLearningProgramData.dateAndAction : this.unitReportData.weekendIslamicSchoolTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.memorizingAyatTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.target : this.unitReportData.memorizingAyatTeachingLearningProgramData.target
        // this.unitReportModifiedData.memorizingAyatTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramData')!).memorizingAyatTeachingLearningProgramData.dateAndAction : this.unitReportData.memorizingAyatTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.memorizingHadithTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.target : this.unitReportData.memorizingHadithTeachingLearningProgramData.target
        // this.unitReportModifiedData.memorizingHadithTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramData')!).memorizingHadithTeachingLearningProgramData.dateAndAction : this.unitReportData.memorizingHadithTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.memorizingDoaTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.target : this.unitReportData.memorizingDoaTeachingLearningProgramData.target
        // this.unitReportModifiedData.memorizingDoaTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramData')!).memorizingDoaTeachingLearningProgramData.dateAndAction : this.unitReportData.memorizingDoaTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.stateLearningSessionTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.target : this.unitReportData.stateLearningSessionTeachingLearningProgramData.target
        // this.unitReportModifiedData.stateLearningSessionTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramData')!).stateLearningSessionTeachingLearningProgramData.dateAndAction : this.unitReportData.stateLearningSessionTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.stateQiyamulLailTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.target : this.unitReportData.stateQiyamulLailTeachingLearningProgramData.target
        // this.unitReportModifiedData.stateQiyamulLailTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramData')!).stateQiyamulLailTeachingLearningProgramData.dateAndAction : this.unitReportData.stateQiyamulLailTeachingLearningProgramData.dateAndAction
        
        // this.unitReportModifiedData.otherTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).otherTeachingLearningProgramData.target : this.unitReportData.otherTeachingLearningProgramData.target
        // this.unitReportModifiedData.otherTeachingLearningProgramData = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramData')!).otherTeachingLearningProgramData.dateAndAction : this.unitReportData.otherTeachingLearningProgramData.dateAndAction


        // // SocialWelfareData
        // this.unitReportModifiedData.qardeHasanaSocialWelfareData = localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.target : this.unitReportData.qardeHasanaSocialWelfareData.target
        // this.unitReportModifiedData.qardeHasanaSocialWelfareData = localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfareData')!).qardeHasanaSocialWelfareData.dateAndAction : this.unitReportData.qardeHasanaSocialWelfareData.dateAndAction

        // this.unitReportModifiedData.patientVisitSocialWelfareData = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.target : this.unitReportData.patientVisitSocialWelfareData.target
        // this.unitReportModifiedData.patientVisitSocialWelfareData = localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfareData')!).patientVisitSocialWelfareData.dateAndAction : this.unitReportData.patientVisitSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.socialVisitSocialWelfareData = localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.target : this.unitReportData.socialVisitSocialWelfareData.target
        // this.unitReportModifiedData.socialVisitSocialWelfareData = localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfareData')!).socialVisitSocialWelfareData.dateAndAction : this.unitReportData.socialVisitSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.transportSocialWelfareData = localStorage.getItem('socialWelfare_transportSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.target : this.unitReportData.transportSocialWelfareData.target
        // this.unitReportModifiedData.transportSocialWelfareData = localStorage.getItem('socialWelfare_transportSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfareData')!).transportSocialWelfareData.dateAndAction : this.unitReportData.transportSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.shiftingSocialWelfareData = localStorage.getItem('socialWelfare_shiftingSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.target : this.unitReportData.shiftingSocialWelfareData.target
        // this.unitReportModifiedData.shiftingSocialWelfareData = localStorage.getItem('socialWelfare_shiftingSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfareData')!).shiftingSocialWelfareData.dateAndAction : this.unitReportData.shiftingSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.shoppingSocialWelfareData = localStorage.getItem('socialWelfare_shoppingSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.target : this.unitReportData.shoppingSocialWelfareData.target
        // this.unitReportModifiedData.shoppingSocialWelfareData = localStorage.getItem('socialWelfare_shoppingSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfareData')!).shoppingSocialWelfareData.dateAndAction : this.unitReportData.shoppingSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.foodDistributionSocialWelfareData = localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.target : this.unitReportData.foodDistributionSocialWelfareData.target
        // this.unitReportModifiedData.foodDistributionSocialWelfareData = localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfareData')!).foodDistributionSocialWelfareData.dateAndAction : this.unitReportData.foodDistributionSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.cleanUpAustraliaSocialWelfareData = localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.target : this.unitReportData.cleanUpAustraliaSocialWelfareData.target
        // this.unitReportModifiedData.cleanUpAustraliaSocialWelfareData = localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfareData')!).cleanUpAustraliaSocialWelfareData.dateAndAction : this.unitReportData.cleanUpAustraliaSocialWelfareData.dateAndAction
        
        // this.unitReportModifiedData.otherSocialWelfareData = localStorage.getItem('socialWelfare_otherSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.target : this.unitReportData.otherSocialWelfareData.target
        // this.unitReportModifiedData.otherSocialWelfareData = localStorage.getItem('socialWelfare_otherSocialWelfareData')! ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfareData')!).otherSocialWelfareData.dateAndAction : this.unitReportData.otherSocialWelfareData.dateAndAction


        // // Dawa MaterialData
        // this.unitReportModifiedData.bookSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.target : this.unitReportData.bookSaleMaterialData.target
        // this.unitReportModifiedData.bookSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialData')!).bookSaleMaterialData.dateAndAction : this.unitReportData.bookSaleMaterialData.dateAndAction
        
        // this.unitReportModifiedData.bookDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.target : this.unitReportData.bookDistributionMaterialData.target
        // this.unitReportModifiedData.bookDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialData')!).bookDistributionMaterialData.dateAndAction : this.unitReportData.bookDistributionMaterialData.dateAndAction
        
        // this.unitReportModifiedData.vhsSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.target : this.unitReportData.vhsSaleMaterialData.target
        // this.unitReportModifiedData.vhsSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialData')!).vhsSaleMaterialData.dateAndAction : this.unitReportData.vhsSaleMaterialData.dateAndAction
        
        // this.unitReportModifiedData.vhsDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.target : this.unitReportData.vhsDistributionMaterialData.target
        // this.unitReportModifiedData.vhsDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialData')!).vhsDistributionMaterialData.dateAndAction : this.unitReportData.vhsDistributionMaterialData.dateAndAction
        
        // this.unitReportModifiedData.emailDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.target : this.unitReportData.emailDistributionMaterialData.target
        // this.unitReportModifiedData.emailDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialData')!).emailDistributionMaterialData.dateAndAction : this.unitReportData.emailDistributionMaterialData.dateAndAction
        
        // this.unitReportModifiedData.ipdcLeafletDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.target : this.unitReportData.ipdcLeafletDistributionMaterialData.target
        // this.unitReportModifiedData.ipdcLeafletDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialData')!).ipdcLeafletDistributionMaterialData.dateAndAction : this.unitReportData.ipdcLeafletDistributionMaterialData.dateAndAction
        
        // this.unitReportModifiedData.otherSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.target : this.unitReportData.otherSaleMaterialData.target
        // this.unitReportModifiedData.otherSaleMaterialData = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialData')!).otherSaleMaterialData.dateAndAction : this.unitReportData.otherSaleMaterialData.dateAndAction

        // this.unitReportModifiedData.otherDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.target : this.unitReportData.otherDistributionMaterialData.target
        // this.unitReportModifiedData.otherDistributionMaterialData = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialData')!).otherDistributionMaterialData.dateAndAction : this.unitReportData.otherDistributionMaterialData.dateAndAction


        // // FInance
        // this.unitReportModifiedData.baitulMalFinanceData = localStorage.getItem('finance_baitulMalFinanceData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.workerPromiseIncreaseTarget : this.unitReportData.baitulMalFinanceData.workerPromiseIncreaseTarget
        // this.unitReportModifiedData.baitulMalFinanceData = localStorage.getItem('finance_baitulMalFinanceData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.action : this.unitReportData.baitulMalFinanceData.action
        // this.unitReportModifiedData.baitulMalFinanceData = localStorage.getItem('finance_baitulMalFinanceData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.otherSourceIncreaseTarget : this.unitReportData.baitulMalFinanceData.otherSourceIncreaseTarget
        // this.unitReportModifiedData.baitulMalFinanceData = localStorage.getItem('finance_baitulMalFinanceData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinanceData')!).baitulMalFinanceData.otherSourceAction : this.unitReportData.baitulMalFinanceData.otherSourceAction
        
        // this.unitReportModifiedData.aDayMasjidProjectFinanceData = localStorage.getItem('finance_aDayMasjidProjectFinanceData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget : this.unitReportData.aDayMasjidProjectFinanceData.workerPromiseIncreaseTarget
        // this.unitReportModifiedData.aDayMasjidProjectFinanceData = localStorage.getItem('finance_aDayMasjidProjectFinanceData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.action : this.unitReportData.aDayMasjidProjectFinanceData.action
        // this.unitReportModifiedData.aDayMasjidProjectFinanceData = localStorage.getItem('finance_aDayMasjidProjectFinanceData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.otherSourceIncreaseTarget : this.unitReportData.aDayMasjidProjectFinanceData.otherSourceIncreaseTarget
        // this.unitReportModifiedData.aDayMasjidProjectFinanceData = localStorage.getItem('finance_aDayMasjidProjectFinanceData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinanceData')!).aDayMasjidProjectFinanceData.otherSourceAction : this.unitReportData.aDayMasjidProjectFinanceData.otherSourceAction
        
        // this.unitReportModifiedData.masjidTableBankFinanceData = localStorage.getItem('finance_masjidTableBankFinanceData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.workerPromiseIncreaseTarget : this.unitReportData.masjidTableBankFinanceData.workerPromiseIncreaseTarget
        // this.unitReportModifiedData.masjidTableBankFinanceData = localStorage.getItem('finance_masjidTableBankFinanceData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.action : this.unitReportData.masjidTableBankFinanceData.action
        // this.unitReportModifiedData.masjidTableBankFinanceData = localStorage.getItem('finance_masjidTableBankFinanceData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.otherSourceIncreaseTarget : this.unitReportData.masjidTableBankFinanceData.otherSourceIncreaseTarget
        // this.unitReportModifiedData.masjidTableBankFinanceData = localStorage.getItem('finance_masjidTableBankFinanceData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinanceData')!).masjidTableBankFinanceData.otherSourceAction : this.unitReportData.masjidTableBankFinanceData.otherSourceAction
        

    }

    onUnitReportUpdated = async(id: number) => {
        this.isSaving = false;
        // toastr.success("Report Saved");
        // await this.loadReport();
        // if(this.afterSave.length === 0) return;
        // await this.afterSave.pop()();
    }

    onUnitReportUpdateFailed = (e: {$values: string[]}) => {
        this.isSaving = false;
        // toastr.error(e.$values.join("\n"), "Error Saving Report");
        // if(this.afterSave.length === 0) return;
        // this.afterSave.pop();
    }

    onUnitReportSubmitted = (id: number) => {
        // this.isSubmitting = false;
        // toastr.success("Report Submitted");
        // this.router.navigate(`unit-report-view/${id}`);
    }

    onUnitReportSubmitFailed = (e: {$values: string[]}) => {
        // this.isSubmitting = false;
        // toastr.error(e.$values.join("\n"), "Error Submitting Report");
    }
}