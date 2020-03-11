import { UnitPlanViewModelDto } from "./models/UnitPlanViewModelDto";
import { PlanData } from "./models/PlanData"
import { MemberPlanData } from "./models/MemberPlanData";
import { MeetingProgramPlanData } from "./models/MeetingProgramPlanData";
import { SocialWelfarePlanData } from "./models/SocialWelfarePlanData";
import { TeachingLearningProgramPlanData } from "./models/TeachingLearningProgramPlanData";
import { MaterialPlanData } from "./models/MaterialPlanData";
import { FinancePlanData } from "./models/FinancePlanData";

class PlanDataBuilder {
    
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

}
export const planDataBuilder = new PlanDataBuilder();