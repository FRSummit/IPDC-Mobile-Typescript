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


@WithRender

@Component
export default class ReportLanding extends Vue {
    searchTerm = new ReportSearchTerms();
    unitPlanData !: UnitPlanViewModelDto;
    unitPlanModifiedData !: UnitPlanViewModelDto;
    unitPlanReportService = new UnitPlanReportService();
    initialJson = "";
    isSaving = false;
    isSubmitting = false;
    orgReport !: [];
    orgName !: [];
    orgReportStatus !: [];
    signalreventhandlers: any = {};
    planId:any;
    signalr = new SignalrWrapper();
    
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
            "UnitPlanUpdated": this.onUnitPlanUpdated,
            "UnitPlanUpdateFailed": this.onUnitPlanUpdateFailed,
            "UnitPlanSubmitted": this.onUnitPlanSubmitted,
            "UnitPlanSubmitFailed": this.onUnitPlanSubmitFailed
        };
    }

    async created() {
        this.planId = localStorage.getItem('planandreports_passing_unit_id')
        let a: any = []
        allReportService.search(this.searchTerm)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == this.planId) {
                        a.push(res.items[i])
                    }
                }
            })
        this.orgReport = a
        this.unitPlanReportService
            .getPlan(this.planId)
            .then(res => {
                localStorage.setItem('selected_plan', JSON.stringify(res))
            })
        await this.attached()
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
        this.setInitialData();
    }

    setInitialData() {
        const initialData = this.getPlanData(this.unitPlanData);
        this.initialJson = JSON.stringify(initialData);
    }

    async savePlan() {
        if (!this.isDirty) return;
          try {
            window.localStorage.setItem('signalR_connectionId', this.signalr.signalrConnection.id);
              await this.unitPlanReportService.updatePlan(this.unitPlanModifiedData.organization.id, this.planId, this.getPlanData(this.unitPlanModifiedData));
          } catch(error) {
            ons.notification.alert('Error',{title :''});
              return;
          }
          this.isSaving = true;
          ons.notification.alert('Plan Saved',{title :''}); 
      }

      get isDirty() {
        this.localStorageData();  
        const latestJson = JSON.stringify(this.getPlanData(this.unitPlanModifiedData));
        return latestJson !== this.initialJson;
    }

    async submitPlan() {
        try {
            await this.unitPlanReportService.submitPlan(this.unitPlanModifiedData.organization.id, this.planId);
        } catch(error) {
            ons.notification.alert('Error',{title :''});
        }
        this.isSubmitting = true;
        ons.notification.alert('Plan Submitted',{title :''}); 
    }
    
    getPlanData(unitPlanData: UnitPlanViewModelDto): PlanData {
        return new PlanData(
            this.makeMemberPlanData(unitPlanData.associateMemberPlanData),
            this.makeMemberPlanData(unitPlanData.preliminaryMemberPlanData),
            this.makeMemberPlanData(unitPlanData.supporterMemberPlanData),
            this.makeMemberPlanData(unitPlanData.memberMemberPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.workerMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.cmsMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.smMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.memberMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.dawahMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.stateLeaderMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.stateOutingMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.iftarMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.learningMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.socialDawahMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.dawahGroupMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.nextGMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.tafsirMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.unitMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.bbqMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.gatheringMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.familyVisitMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.eidReunionMeetingProgramPlanData),
            this.makeMeetingProgramPlanData(unitPlanData.otherMeetingProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.groupStudyTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.studyCircleForAssociateMemberTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.studyCircleTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.practiceDarsTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.stateLearningCampTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.quranStudyTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.hadithTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.quranClassTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.weekendIslamicSchoolTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.memorizingAyatTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.memorizingHadithTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.memorizingDoaTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.stateLearningSessionTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.stateQiyamulLailTeachingLearningProgramPlanData),
            this.makeTeachingLearningProgramPlanData(unitPlanData.otherTeachingLearningProgramPlanData),
            this.makeSocialWelfarePlanData(unitPlanData.qardeHasanaSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.patientVisitSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.socialVisitSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.transportSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.shiftingSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.shoppingSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.foodDistributionSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.cleanUpAustraliaSocialWelfarePlanData),
            this.makeSocialWelfarePlanData(unitPlanData.otherSocialWelfarePlanData),
            this.makeMaterialPlanData(unitPlanData.bookSaleMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.bookDistributionMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.vhsSaleMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.vhsDistributionMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.emailDistributionMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.ipdcLeafletDistributionMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.otherSaleMaterialPlanData),
            this.makeMaterialPlanData(unitPlanData.otherDistributionMaterialPlanData),
            this.makeFinancePlanData(unitPlanData.baitulMalFinancePlanData),
            this.makeFinancePlanData(unitPlanData.aDayMasjidProjectFinancePlanData),
            this.makeFinancePlanData(unitPlanData.masjidTableBankFinancePlanData));
    }

    private makeMemberPlanData(original: MemberPlanData): MemberPlanData {
        return new MemberPlanData(original.nameAndContactNumber, original.action, original.upgradeTarget);
    }

    private makeMeetingProgramPlanData(original: MeetingProgramPlanData): MeetingProgramPlanData {
        return new MeetingProgramPlanData(original.target, original.dateAndAction);
    }

    private makeTeachingLearningProgramPlanData(original: TeachingLearningProgramPlanData): TeachingLearningProgramPlanData {
        return new TeachingLearningProgramPlanData(original.target, original.dateAndAction);
    }
    
    private makeSocialWelfarePlanData(original: SocialWelfarePlanData) {
        return new SocialWelfarePlanData(original.target, original.dateAndAction);
    }

    private makeMaterialPlanData(original: MaterialPlanData) {
        return new MaterialPlanData(original.target, original.dateAndAction);
    }

    private makeFinancePlanData(original: FinancePlanData) {
        return new FinancePlanData(original.action, original.workerPromiseIncreaseTarget, original.otherSourceAction, original.otherSourceIncreaseTarget);
    }

    localStorageData() {
        this.unitPlanModifiedData.memberMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!) : this.unitPlanData.memberMemberPlanData;
        this.unitPlanModifiedData.associateMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!) : this.unitPlanData.associateMemberPlanData;
        this.unitPlanModifiedData.preliminaryMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!) : this.unitPlanData.preliminaryMemberPlanData;
        this.unitPlanModifiedData.supporterMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!) : this.unitPlanData.supporterMemberPlanData;
    }
    onUnitPlanUpdated = async (id: number) => {
        this.isSaving = false;
        this.setInitialData();
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
        this.isSaving = false;
    }

    onUnitPlanSubmitted = (id: number) => {
    }

    onUnitPlanSubmitFailed = (e: {$values: string[]}) => {
    }
}