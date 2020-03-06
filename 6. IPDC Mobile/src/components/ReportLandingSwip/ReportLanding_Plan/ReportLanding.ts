import { Component, Vue } from 'vue-property-decorator';
import WithRender from './report-landing.html';
import { SignalrWrapper } from "../../../signalrwrapper";
import { allReportService } from "../../../services/AllReportsService";
import { unitPlanReportService } from "../../../services/UnitPlanReportService2"
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
    service = unitPlanReportService;
    initialJson = "";
    isSaving = false;
    isSubmitting = false;
    orgReport !: [];
    orgName !: [];
    orgReportStatus !: [];
    signalreventhandlers: any = {};
    planId:any;
    
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
        console.log(this.planId)
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
        console.log(a)
        console.log('------------------------')
        // Adding default plan to storage
        unitPlanReportService
            .getPlan(this.planId)
            .then(res => {
                console.log(res)
                localStorage.setItem('selected_plan', JSON.stringify(res))
            })

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
        const unitPlan = await this.service.getPlan(this.planId);
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
            console.log('Save Plan')
              await this.service.updatePlan(this.unitPlanModifiedData.organization.id, this.planId, this.getPlanData(this.unitPlanModifiedData));
          } catch(error) {
              //toastr.error(error, "Error Saving Plan");
              return;
          }
          this.isSaving = true;
      }

      get isDirty() {
        this.localStorageData();  
        const latestJson = JSON.stringify(this.getPlanData(this.unitPlanModifiedData));
        return latestJson !== this.initialJson;
    }

    async submitPlan() {
        console.log('submitPlan');
        try {
            await this.service.submitPlan(this.unitPlanModifiedData.organization.id, this.planId);
        } catch(error) {
            //toastr.error(error, "Error Submitting Plan");
        }
        this.isSubmitting = true;
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

        
        this.unitPlanModifiedData.memberMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.target : this.unitPlanData.memberMemberPlanData.upgradeTarget
        this.unitPlanModifiedData.memberMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.nameAndContactNumber : this.unitPlanData.memberMemberPlanData.nameAndContactNumber
        this.unitPlanModifiedData.memberMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!).memberMemberPlanData.action : this.unitPlanData.memberMemberPlanData.action
        
        this.unitPlanModifiedData.associateMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.target : this.unitPlanData.associateMemberPlanData.upgradeTarget
        this.unitPlanModifiedData.associateMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.nameAndContactNumber : this.unitPlanData.associateMemberPlanData.nameAndContactNumber
        this.unitPlanModifiedData.associateMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_associateMemberPlanData')!).associateMemberPlanData.action : this.unitPlanData.associateMemberPlanData.action
        
        this.unitPlanModifiedData.preliminaryMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.target : this.unitPlanData.preliminaryMemberPlanData.upgradeTarget
        this.unitPlanModifiedData.preliminaryMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.nameAndContactNumber : this.unitPlanData.preliminaryMemberPlanData.nameAndContactNumber
        this.unitPlanModifiedData.preliminaryMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_preliminaryMemberPlanData')!).preliminaryMemberPlanData.action : this.unitPlanData.preliminaryMemberPlanData.action
        
        this.unitPlanModifiedData.supporterMemberPlanData.upgradeTarget = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.target : this.unitPlanData.supporterMemberPlanData.upgradeTarget
        this.unitPlanModifiedData.supporterMemberPlanData.nameAndContactNumber = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.nameAndContactNumber : this.unitPlanData.supporterMemberPlanData.nameAndContactNumber
        this.unitPlanModifiedData.supporterMemberPlanData.action = localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')! ? JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_supporterMemberPlanData')!).supporterMemberPlanData.action : this.unitPlanData.supporterMemberPlanData.action
        

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

    // plandata = {
    //     associateMemberPlanData: {
    //         upgradeTarget: 5,
    //         nameAndContactNumber: '000',
    //         action: '13321'
    //     },
    //     preliminaryMemberPlanData: {
    //         upgradeTarget: 5,
    //         nameAndContactNumber: '000',
    //         action: '13321'
    //     },
    //     supporterMemberPlanData: {
    //         upgradeTarget: 5,
    //         nameAndContactNumber: '000',
    //         action: '13321'
    //     },
    //     memberMemberPlanData: {
    //         upgradeTarget: 5,
    //         nameAndContactNumber: '000',
    //         action: '13321'
    //     },

    //     // Meeting
    //     workerMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     cmsMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     smMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     memberMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     dawahMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     stateLeaderMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     stateOutingMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     iftarMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     learningMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     socialDawahMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     dawahGroupMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     nextGMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     tafsirMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     unitMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     bbqMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     gatheringMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     familyVisitMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     eidReunionMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     otherMeetingProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     // TeachingLearningProgramPlanData
    //     groupStudyTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     studyCircleForAssociateMemberTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     studyCircleTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     practiceDarsTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     stateLearningCampTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     quranStudyTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     hadithTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     quranClassTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     weekendIslamicSchoolTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     memorizingAyatTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     memorizingHadithTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     memorizingDoaTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     stateLearningSessionTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     stateQiyamulLailTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     otherTeachingLearningProgramPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     // SocialWelfarePlanData
    //     qardeHasanaSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     patientVisitSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     socialVisitSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     transportSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     shiftingSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     shoppingSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     foodDistributionSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     cleanUpAustraliaSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     otherSocialWelfarePlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     // MaterialPlanData
    //     bookSaleMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     bookDistributionMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     vhsSaleMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     vhsDistributionMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     emailDistributionMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     ipdcLeafletDistributionMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     otherSaleMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     otherDistributionMaterialPlanData: {
    //         target: 5,
    //         dateAndAction: null
    //     },
    //     // FinancePlanData
    //     baitulMalFinancePlanData: {
    //         action: null,
    //         workerPromiseIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         },
    //         otherSourceAction: null,
    //         otherSourceIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         }
    //     },
    //     aDayMasjidProjectFinancePlanData: {
    //         action: null,
    //         workerPromiseIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         },
    //         otherSourceAction: null,
    //         otherSourceIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         }
    //     },
    //     masjidTableBankFinancePlanData: {
    //         action: null,
    //         workerPromiseIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         },
    //         otherSourceAction: null,
    //         otherSourceIncreaseTarget: {
    //             amount: 0.0,
    //             currency: 8
    //         }
    //     }
    // }
}