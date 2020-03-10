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
        // console.log('----------->>>>>>>>>>>>>>>')
        // let dt = new Date()
        // console.log(moment())
        // console.log('----------->>>>>>>>>>>>>>>')
        this.planId = localStorage.getItem('planandreports_passing_unit_id')
        let a: any = []
        // Select specific search item
        allReportService.search(this.searchTerm)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == this.planId) {
                        a.push(res.items[i])
                    }
                }
            })
        this.orgReport = a
        // Adding default plan to storage
        this.unitPlanReportService
            .getPlan(this.planId)
            .then(res => {
                localStorage.setItem('selected_plan', JSON.stringify(res))
            })

        // Signar Start
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
        console.log(latestJson);
        console.log(this.initialJson);
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
         // Load the local storage data
        // this.unitPlanModifiedData.associateMemberPlanData.nameAndContactNumber = '01564454'
        // console.log(this.unitPlanData.baitulMalFinancePlanData.otherSourceIncreaseTarget);
        // console.log(localStorage.getItem('finance_baitulMalFinancePlanData'));

        // // MemberPlanData
        // this.unitPlanModifiedData.memberMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.target : this.unitPlanData.memberMemberPlanData.upgradeTarget
        // this.unitPlanModifiedData.memberMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.nameAndContactNumber : this.unitPlanData.memberMemberPlanData.nameAndContactNumber
        // this.unitPlanModifiedData.memberMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.action : this.unitPlanData.memberMemberPlanData.action
        
        //this.unitPlanModifiedData.associateMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.target : this.unitPlanData.associateMemberPlanData.upgradeTarget
        //this.unitPlanModifiedData.associateMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.nameAndContactNumber : this.unitPlanData.associateMemberPlanData.nameAndContactNumber
        //this.unitPlanModifiedData.associateMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.action : this.unitPlanData.associateMemberPlanData.action

        this.unitPlanModifiedData.memberMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!) : this.unitPlanData.memberMemberPlanData;
        this.unitPlanModifiedData.associateMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!) : this.unitPlanData.associateMemberPlanData;
        this.unitPlanModifiedData.preliminaryMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!) : this.unitPlanData.preliminaryMemberPlanData;
        this.unitPlanModifiedData.supporterMemberPlanData = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!) : this.unitPlanData.supporterMemberPlanData;

        // this.unitPlanModifiedData.preliminaryMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.target : this.unitPlanData.preliminaryMemberPlanData.upgradeTarget
        // this.unitPlanModifiedData.preliminaryMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.nameAndContactNumber : this.unitPlanData.preliminaryMemberPlanData.nameAndContactNumber
        // this.unitPlanModifiedData.preliminaryMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.action : this.unitPlanData.preliminaryMemberPlanData.action
        
        // this.unitPlanModifiedData.supporterMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.target : this.unitPlanData.supporterMemberPlanData.upgradeTarget
        // this.unitPlanModifiedData.supporterMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.nameAndContactNumber : this.unitPlanData.supporterMemberPlanData.nameAndContactNumber
        // this.unitPlanModifiedData.supporterMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.action : this.unitPlanData.supporterMemberPlanData.action
        
        // console.log(this.unitPlanData.associateMemberPlanData);

        // // MeetingProgramPlanData
        // this.unitPlanModifiedData.workerMeetingProgramPlanData =  localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramPlanData')!).workerMeetingProgramPlanData.target : this.unitPlanData.workerMeetingProgramPlanData.target
        // this.unitPlanModifiedData.workerMeetingProgramPlanData =  localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_workerMeetingProgramPlanData')!).workerMeetingProgramPlanData.dateAndAction : this.unitPlanData.workerMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.cmsMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramPlanData')!).cmsMeetingProgramPlanData.target : this.unitPlanData.cmsMeetingProgramPlanData.target
        // this.unitPlanModifiedData.cmsMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_cmsMeetingProgramPlanData')!).cmsMeetingProgramPlanData.dateAndAction : this.unitPlanData.cmsMeetingProgramPlanData.dateAndAction

        // this.unitPlanModifiedData.smMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramPlanData')!).smMeetingProgramPlanData.target : this.unitPlanData.smMeetingProgramPlanData.target
        // this.unitPlanModifiedData.smMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_smMeetingProgramPlanData')!).smMeetingProgramPlanData.dateAndAction : this.unitPlanData.smMeetingProgramPlanData.dateAndAction

        // this.unitPlanModifiedData.memberMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramPlanData')!).memberMeetingProgramPlanData.target : this.unitPlanData.memberMeetingProgramPlanData.target
        // this.unitPlanModifiedData.memberMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_memberMeetingProgramPlanData')!).memberMeetingProgramPlanData.dateAndAction : this.unitPlanData.memberMeetingProgramPlanData.dateAndAction

        // this.unitPlanModifiedData.dawahMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')!).dawahMeetingProgramPlanData.target : this.unitPlanData.dawahMeetingProgramPlanData.target
        // this.unitPlanModifiedData.dawahMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahMeetingProgramPlanData')!).dawahMeetingProgramPlanData.dateAndAction : this.unitPlanData.dawahMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.stateLeaderMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')!).stateLeaderMeetingProgramPlanData.target : this.unitPlanData.stateLeaderMeetingProgramPlanData.target
        // this.unitPlanModifiedData.stateLeaderMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateLeaderMeetingProgramPlanData')!).stateLeaderMeetingProgramPlanData.dateAndAction : this.unitPlanData.stateLeaderMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.stateOutingMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramPlanData')!).stateOutingMeetingProgramPlanData.target : this.unitPlanData.stateOutingMeetingProgramPlanData.target
        // this.unitPlanModifiedData.stateOutingMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_stateOutingMeetingProgramPlanData')!).stateOutingMeetingProgramPlanData.dateAndAction : this.unitPlanData.stateOutingMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.iftarMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramPlanData')!).iftarMeetingProgramPlanData.target : this.unitPlanData.iftarMeetingProgramPlanData.target
        // this.unitPlanModifiedData.iftarMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_iftarMeetingProgramPlanData')!).iftarMeetingProgramPlanData.dateAndAction : this.unitPlanData.iftarMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.learningMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')!).learningMeetingProgramPlanData.target : this.unitPlanData.learningMeetingProgramPlanData.target
        // this.unitPlanModifiedData.learningMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_learningMeetingProgramPlanData')!).learningMeetingProgramPlanData.dateAndAction : this.unitPlanData.learningMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.socialDawahMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')!).socialDawahMeetingProgramPlanData.target : this.unitPlanData.socialDawahMeetingProgramPlanData.target
        // this.unitPlanModifiedData.socialDawahMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_socialDawahMeetingProgramPlanData')!).socialDawahMeetingProgramPlanData.dateAndAction : this.unitPlanData.socialDawahMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.dawahGroupMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')!).dawahGroupMeetingProgramPlanData.target : this.unitPlanData.dawahGroupMeetingProgramPlanData.target
        // this.unitPlanModifiedData.dawahGroupMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_dawahGroupMeetingProgramPlanData')!).dawahGroupMeetingProgramPlanData.dateAndAction : this.unitPlanData.dawahGroupMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.nextGMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramPlanData')!).nextGMeetingProgramPlanData.target : this.unitPlanData.nextGMeetingProgramPlanData.target
        // this.unitPlanModifiedData.nextGMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_nextGMeetingProgramPlanData')!).nextGMeetingProgramPlanData.dateAndAction : this.unitPlanData.nextGMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.tafsirMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')!).tafsirMeetingProgramPlanData.target : this.unitPlanData.tafsirMeetingProgramPlanData.target
        // this.unitPlanModifiedData.tafsirMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_tafsirMeetingProgramPlanData')!).tafsirMeetingProgramPlanData.dateAndAction : this.unitPlanData.tafsirMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.unitMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramPlanData')!).unitMeetingProgramPlanData.target : this.unitPlanData.unitMeetingProgramPlanData.target
        // this.unitPlanModifiedData.unitMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_unitMeetingProgramPlanData')!).unitMeetingProgramPlanData.dateAndAction : this.unitPlanData.unitMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.bbqMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramPlanData')!).bbqMeetingProgramPlanData.target : this.unitPlanData.bbqMeetingProgramPlanData.target
        // this.unitPlanModifiedData.bbqMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_bbqMeetingProgramPlanData')!).bbqMeetingProgramPlanData.dateAndAction : this.unitPlanData.bbqMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.gatheringMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramPlanData')!).gatheringMeetingProgramPlanData.target : this.unitPlanData.gatheringMeetingProgramPlanData.target
        // this.unitPlanModifiedData.gatheringMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_gatheringMeetingProgramPlanData')!).gatheringMeetingProgramPlanData.dateAndAction : this.unitPlanData.gatheringMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.familyVisitMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramPlanData')!).familyVisitMeetingProgramPlanData.target : this.unitPlanData.familyVisitMeetingProgramPlanData.target
        // this.unitPlanModifiedData.familyVisitMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_familyVisitMeetingProgramPlanData')!).familyVisitMeetingProgramPlanData.dateAndAction : this.unitPlanData.familyVisitMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.eidReunionMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')!).eidReunionMeetingProgramPlanData.target : this.unitPlanData.eidReunionMeetingProgramPlanData.target
        // this.unitPlanModifiedData.eidReunionMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_eidReunionMeetingProgramPlanData')!).eidReunionMeetingProgramPlanData.dateAndAction : this.unitPlanData.eidReunionMeetingProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.otherMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).otherMeetingProgramPlanData.target : this.unitPlanData.otherMeetingProgramPlanData.target
        // this.unitPlanModifiedData.otherMeetingProgramPlanData = localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')! ? JSON.parse(localStorage.getItem('regularAndSpecialMeetings_otherMeetingProgramPlanData')!).otherMeetingProgramPlanData.dateAndAction : this.unitPlanData.otherMeetingProgramPlanData.dateAndAction
        

        // // TeachingLearningProgramPlanData
        // this.unitPlanModifiedData.groupStudyTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')!).groupStudyTeachingLearningProgramPlanData.target : this.unitPlanData.groupStudyTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.groupStudyTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_groupStudyTeachingLearningProgramPlanData')!).groupStudyTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.groupStudyTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.studyCircleForAssociateMemberTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')!).studyCircleForAssociateMemberTeachingLearningProgramPlanData.target : this.unitPlanData.studyCircleForAssociateMemberTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.studyCircleForAssociateMemberTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleForAssociateMemberTeachingLearningProgramPlanData')!).studyCircleForAssociateMemberTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.studyCircleForAssociateMemberTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.studyCircleTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')!).studyCircleTeachingLearningProgramPlanData.target : this.unitPlanData.studyCircleTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.studyCircleTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_studyCircleTeachingLearningProgramPlanData')!).studyCircleTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.studyCircleTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.practiceDarsTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.target : this.unitPlanData.practiceDarsTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.practiceDarsTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_practiceDarsTeachingLearningProgramPlanData')!).practiceDarsTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.practiceDarsTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.stateLearningCampTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')!).stateLearningCampTeachingLearningProgramPlanData.target : this.unitPlanData.stateLearningCampTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.stateLearningCampTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningCampTeachingLearningProgramPlanData')!).stateLearningCampTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.stateLearningCampTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.quranStudyTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')!).quranStudyTeachingLearningProgramPlanData.target : this.unitPlanData.quranStudyTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.quranStudyTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranStudyTeachingLearningProgramPlanData')!).quranStudyTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.quranStudyTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.hadithTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')!).hadithTeachingLearningProgramPlanData.target : this.unitPlanData.hadithTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.hadithTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_hadithTeachingLearningProgramPlanData')!).hadithTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.hadithTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.quranClassTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')!).quranClassTeachingLearningProgramPlanData.target : this.unitPlanData.quranClassTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.quranClassTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_quranClassTeachingLearningProgramPlanData')!).quranClassTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.quranClassTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.weekendIslamicSchoolTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')!).weekendIslamicSchoolTeachingLearningProgramPlanData.target : this.unitPlanData.weekendIslamicSchoolTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.weekendIslamicSchoolTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_weekendIslamicSchoolTeachingLearningProgramPlanData')!).weekendIslamicSchoolTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.weekendIslamicSchoolTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.memorizingAyatTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')!).memorizingAyatTeachingLearningProgramPlanData.target : this.unitPlanData.memorizingAyatTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.memorizingAyatTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingAyatTeachingLearningProgramPlanData')!).memorizingAyatTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.memorizingAyatTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.memorizingHadithTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')!).memorizingHadithTeachingLearningProgramPlanData.target : this.unitPlanData.memorizingHadithTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.memorizingHadithTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingHadithTeachingLearningProgramPlanData')!).memorizingHadithTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.memorizingHadithTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.memorizingDoaTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')!).memorizingDoaTeachingLearningProgramPlanData.target : this.unitPlanData.memorizingDoaTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.memorizingDoaTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_memorizingDoaTeachingLearningProgramPlanData')!).memorizingDoaTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.memorizingDoaTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.stateLearningSessionTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')!).stateLearningSessionTeachingLearningProgramPlanData.target : this.unitPlanData.stateLearningSessionTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.stateLearningSessionTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateLearningSessionTeachingLearningProgramPlanData')!).stateLearningSessionTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.stateLearningSessionTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.stateQiyamulLailTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')!).stateQiyamulLailTeachingLearningProgramPlanData.target : this.unitPlanData.stateQiyamulLailTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.stateQiyamulLailTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_stateQiyamulLailTeachingLearningProgramPlanData')!).stateQiyamulLailTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.stateQiyamulLailTeachingLearningProgramPlanData.dateAndAction
        
        // this.unitPlanModifiedData.otherTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')!).otherTeachingLearningProgramPlanData.target : this.unitPlanData.otherTeachingLearningProgramPlanData.target
        // this.unitPlanModifiedData.otherTeachingLearningProgramPlanData = localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')! ? JSON.parse(localStorage.getItem('teachingAndLearningProgram_otherTeachingLearningProgramPlanData')!).otherTeachingLearningProgramPlanData.dateAndAction : this.unitPlanData.otherTeachingLearningProgramPlanData.dateAndAction


        // // SocialWelfarePlanData
        // this.unitPlanModifiedData.qardeHasanaSocialWelfarePlanData = localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')!).qardeHasanaSocialWelfarePlanData.target : this.unitPlanData.qardeHasanaSocialWelfarePlanData.target
        // this.unitPlanModifiedData.qardeHasanaSocialWelfarePlanData = localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_qardeHasanaSocialWelfarePlanData')!).qardeHasanaSocialWelfarePlanData.dateAndAction : this.unitPlanData.qardeHasanaSocialWelfarePlanData.dateAndAction

        // this.unitPlanModifiedData.patientVisitSocialWelfarePlanData = localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).patientVisitSocialWelfarePlanData.target : this.unitPlanData.patientVisitSocialWelfarePlanData.target
        // this.unitPlanModifiedData.patientVisitSocialWelfarePlanData = localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_patientVisitSocialWelfarePlanData')!).patientVisitSocialWelfarePlanData.dateAndAction : this.unitPlanData.patientVisitSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.socialVisitSocialWelfarePlanData = localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')!).socialVisitSocialWelfarePlanData.target : this.unitPlanData.socialVisitSocialWelfarePlanData.target
        // this.unitPlanModifiedData.socialVisitSocialWelfarePlanData = localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_socialVisitSocialWelfarePlanData')!).socialVisitSocialWelfarePlanData.dateAndAction : this.unitPlanData.socialVisitSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.transportSocialWelfarePlanData = localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')!).transportSocialWelfarePlanData.target : this.unitPlanData.transportSocialWelfarePlanData.target
        // this.unitPlanModifiedData.transportSocialWelfarePlanData = localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_transportSocialWelfarePlanData')!).transportSocialWelfarePlanData.dateAndAction : this.unitPlanData.transportSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.shiftingSocialWelfarePlanData = localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')!).shiftingSocialWelfarePlanData.target : this.unitPlanData.shiftingSocialWelfarePlanData.target
        // this.unitPlanModifiedData.shiftingSocialWelfarePlanData = localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_shiftingSocialWelfarePlanData')!).shiftingSocialWelfarePlanData.dateAndAction : this.unitPlanData.shiftingSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.shoppingSocialWelfarePlanData = localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')!).shoppingSocialWelfarePlanData.target : this.unitPlanData.shoppingSocialWelfarePlanData.target
        // this.unitPlanModifiedData.shoppingSocialWelfarePlanData = localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_shoppingSocialWelfarePlanData')!).shoppingSocialWelfarePlanData.dateAndAction : this.unitPlanData.shoppingSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.foodDistributionSocialWelfarePlanData = localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')!).foodDistributionSocialWelfarePlanData.target : this.unitPlanData.foodDistributionSocialWelfarePlanData.target
        // this.unitPlanModifiedData.foodDistributionSocialWelfarePlanData = localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_foodDistributionSocialWelfarePlanData')!).foodDistributionSocialWelfarePlanData.dateAndAction : this.unitPlanData.foodDistributionSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.cleanUpAustraliaSocialWelfarePlanData = localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')!).cleanUpAustraliaSocialWelfarePlanData.target : this.unitPlanData.cleanUpAustraliaSocialWelfarePlanData.target
        // this.unitPlanModifiedData.cleanUpAustraliaSocialWelfarePlanData = localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_cleanUpAustraliaSocialWelfarePlanData')!).cleanUpAustraliaSocialWelfarePlanData.dateAndAction : this.unitPlanData.cleanUpAustraliaSocialWelfarePlanData.dateAndAction
        
        // this.unitPlanModifiedData.otherSocialWelfarePlanData = localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).otherSocialWelfarePlanData.target : this.unitPlanData.otherSocialWelfarePlanData.target
        // this.unitPlanModifiedData.otherSocialWelfarePlanData = localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')! ? JSON.parse(localStorage.getItem('socialWelfare_otherSocialWelfarePlanData')!).otherSocialWelfarePlanData.dateAndAction : this.unitPlanData.otherSocialWelfarePlanData.dateAndAction


        // // Dawa MaterialPlanData
        // this.unitPlanModifiedData.bookSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')!).bookSaleMaterialPlanData.target : this.unitPlanData.bookSaleMaterialPlanData.target
        // this.unitPlanModifiedData.bookSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookSaleMaterialPlanData')!).bookSaleMaterialPlanData.dateAndAction : this.unitPlanData.bookSaleMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.bookDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).bookDistributionMaterialPlanData.target : this.unitPlanData.bookDistributionMaterialPlanData.target
        // this.unitPlanModifiedData.bookDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_bookDistributionMaterialPlanData')!).bookDistributionMaterialPlanData.dateAndAction : this.unitPlanData.bookDistributionMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.vhsSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')!).vhsSaleMaterialPlanData.target : this.unitPlanData.vhsSaleMaterialPlanData.target
        // this.unitPlanModifiedData.vhsSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsSaleMaterialPlanData')!).vhsSaleMaterialPlanData.dateAndAction : this.unitPlanData.vhsSaleMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.vhsDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')!).vhsDistributionMaterialPlanData.target : this.unitPlanData.vhsDistributionMaterialPlanData.target
        // this.unitPlanModifiedData.vhsDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_vhsDistributionMaterialPlanData')!).vhsDistributionMaterialPlanData.dateAndAction : this.unitPlanData.vhsDistributionMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.emailDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')!).emailDistributionMaterialPlanData.target : this.unitPlanData.emailDistributionMaterialPlanData.target
        // this.unitPlanModifiedData.emailDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_emailDistributionMaterialPlanData')!).emailDistributionMaterialPlanData.dateAndAction : this.unitPlanData.emailDistributionMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.ipdcLeafletDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')!).ipdcLeafletDistributionMaterialPlanData.target : this.unitPlanData.ipdcLeafletDistributionMaterialPlanData.target
        // this.unitPlanModifiedData.ipdcLeafletDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_ipdcLeafletDistributionMaterialPlanData')!).ipdcLeafletDistributionMaterialPlanData.dateAndAction : this.unitPlanData.ipdcLeafletDistributionMaterialPlanData.dateAndAction
        
        // this.unitPlanModifiedData.otherSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).otherSaleMaterialPlanData.target : this.unitPlanData.otherSaleMaterialPlanData.target
        // this.unitPlanModifiedData.otherSaleMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherSaleMaterialPlanData')!).otherSaleMaterialPlanData.dateAndAction : this.unitPlanData.otherSaleMaterialPlanData.dateAndAction

        // this.unitPlanModifiedData.otherDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).otherDistributionMaterialPlanData.target : this.unitPlanData.otherDistributionMaterialPlanData.target
        // this.unitPlanModifiedData.otherDistributionMaterialPlanData = localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')! ? JSON.parse(localStorage.getItem('dawahMaterialDistribution_otherDistributionMaterialPlanData')!).otherDistributionMaterialPlanData.dateAndAction : this.unitPlanData.otherDistributionMaterialPlanData.dateAndAction


        // // FInance
        // console.log(this.unitPlanData.baitulMalFinancePlanData.otherSourceIncreaseTarget);
        // console.log(localStorage.getItem('finance_baitulMalFinancePlanData'));
        // this.unitPlanModifiedData.baitulMalFinancePlanData = localStorage.getItem('finance_baitulMalFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.workerPromiseIncreaseTarget : this.unitPlanData.baitulMalFinancePlanData.workerPromiseIncreaseTarget
        // this.unitPlanModifiedData.baitulMalFinancePlanData = localStorage.getItem('finance_baitulMalFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.action : this.unitPlanData.baitulMalFinancePlanData.action
        // this.unitPlanModifiedData.baitulMalFinancePlanData = localStorage.getItem('finance_baitulMalFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.otherSourceIncreaseTarget : this.unitPlanData.baitulMalFinancePlanData.otherSourceIncreaseTarget
        // this.unitPlanModifiedData.baitulMalFinancePlanData = localStorage.getItem('finance_baitulMalFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_baitulMalFinancePlanData')!).baitulMalFinancePlanData.otherSourceAction : this.unitPlanData.baitulMalFinancePlanData.otherSourceAction
        
        // this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget : this.unitPlanData.aDayMasjidProjectFinancePlanData.workerPromiseIncreaseTarget
        // this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.action : this.unitPlanData.aDayMasjidProjectFinancePlanData.action
        // this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget : this.unitPlanData.aDayMasjidProjectFinancePlanData.otherSourceIncreaseTarget
        // this.unitPlanModifiedData.aDayMasjidProjectFinancePlanData = localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_aDayMasjidProjectFinancePlanData')!).aDayMasjidProjectFinancePlanData.otherSourceAction : this.unitPlanData.aDayMasjidProjectFinancePlanData.otherSourceAction
        
        // this.unitPlanModifiedData.masjidTableBankFinancePlanData = localStorage.getItem('finance_masjidTableBankFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.workerPromiseIncreaseTarget : this.unitPlanData.masjidTableBankFinancePlanData.workerPromiseIncreaseTarget
        // this.unitPlanModifiedData.masjidTableBankFinancePlanData = localStorage.getItem('finance_masjidTableBankFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.action : this.unitPlanData.masjidTableBankFinancePlanData.action
        // this.unitPlanModifiedData.masjidTableBankFinancePlanData = localStorage.getItem('finance_masjidTableBankFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.otherSourceIncreaseTarget : this.unitPlanData.masjidTableBankFinancePlanData.otherSourceIncreaseTarget
        // this.unitPlanModifiedData.masjidTableBankFinancePlanData = localStorage.getItem('finance_masjidTableBankFinancePlanData')! ? JSON.parse(localStorage.getItem('finance_masjidTableBankFinancePlanData')!).masjidTableBankFinancePlanData.otherSourceAction : this.unitPlanData.masjidTableBankFinancePlanData.otherSourceAction
        

    }
    onUnitPlanUpdated = async (id: number) => {
        this.isSaving = false;
        //toastr.success("Plan Saved");
        this.setInitialData();
        //if(this.afterSave.length === 0) return;
        //await this.afterSave.pop()();  
    }

    onUnitPlanUpdateFailed = (e: {$values: string[]}) => {
        this.isSaving = false;
        // toastr.error(e.$values.join("\n"), "Error Saving Plan");
        // if(this.afterSave.length === 0) return;
        // this.afterSave.pop();
    }

    onUnitPlanSubmitted = (id: number) => {
        // this.isSubmitting = false;
        // toastr.success("Plan Submitted");
        // this.router.navigate(`unit-plan-view/${id}`);
    }

    onUnitPlanSubmitFailed = (e: {$values: string[]}) => {
        // this.isSubmitting = false;
        // toastr.error(e.$values.join("\n"), "Error Submitting Plan");
        // if(this.afterSave.length === 0) return;
        // this.afterSave.pop();
    }
}