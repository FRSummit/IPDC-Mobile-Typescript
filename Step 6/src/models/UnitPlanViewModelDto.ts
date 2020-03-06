import { OrganizationReference } from "./OrganizationReference";
import { ReportingPeriod } from "./ReportingPeriod";
import { ReportStatus } from "./ReportStatus";
import { ReopenedReportStatus } from "./ReopenedReportStatus";
import { MemberPlanData } from "./MemberPlanData";
import { MeetingProgramPlanData } from "./MeetingProgramPlanData";
import { FinancePlanData } from "./FinancePlanData";
import { SocialWelfarePlanData } from "./SocialWelfarePlanData";
import { TeachingLearningProgramPlanData } from "./TeachingLearningProgramPlanData";
import { MaterialPlanData } from "./MaterialPlanData";

export class UnitPlanViewModelDto {
    constructor(public id: number,
        public description: string,
        public organization: OrganizationReference,
        public reportingPeriod: ReportingPeriod,
        public reportStatus: ReportStatus,
        public reportStatusDescription: string,
        public reOpenedReportStatus: ReopenedReportStatus,
        public reOpenedReportStatusDescription: string,
        public associateMemberPlanData: MemberPlanData,
        public preliminaryMemberPlanData: MemberPlanData,
        public supporterMemberPlanData: MemberPlanData,
        public memberMemberPlanData: MemberPlanData,        
        public workerMeetingProgramPlanData: MeetingProgramPlanData,
        public cmsMeetingProgramPlanData: MeetingProgramPlanData,
        public smMeetingProgramPlanData: MeetingProgramPlanData,
        public memberMeetingProgramPlanData: MeetingProgramPlanData,
        public dawahMeetingProgramPlanData: MeetingProgramPlanData,
        public stateLeaderMeetingProgramPlanData: MeetingProgramPlanData,
        public stateOutingMeetingProgramPlanData: MeetingProgramPlanData,
        public iftarMeetingProgramPlanData: MeetingProgramPlanData,
        public learningMeetingProgramPlanData: MeetingProgramPlanData,
        public socialDawahMeetingProgramPlanData: MeetingProgramPlanData,
        public dawahGroupMeetingProgramPlanData: MeetingProgramPlanData,
        public nextGMeetingProgramPlanData: MeetingProgramPlanData,
        public tafsirMeetingProgramPlanData: MeetingProgramPlanData,
        public unitMeetingProgramPlanData: MeetingProgramPlanData,
        public bbqMeetingProgramPlanData: MeetingProgramPlanData,
        public gatheringMeetingProgramPlanData: MeetingProgramPlanData,
        public familyVisitMeetingProgramPlanData: MeetingProgramPlanData,
        public eidReunionMeetingProgramPlanData: MeetingProgramPlanData,
        public otherMeetingProgramPlanData: MeetingProgramPlanData,
        public groupStudyTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public studyCircleForAssociateMemberTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public studyCircleTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public practiceDarsTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public stateLearningCampTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public quranStudyTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public hadithTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public quranClassTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public weekendIslamicSchoolTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public memorizingAyatTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public memorizingHadithTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public memorizingDoaTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public stateLearningSessionTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,
        public stateQiyamulLailTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,   
        public otherTeachingLearningProgramPlanData: TeachingLearningProgramPlanData,     
        public baitulMalFinancePlanData: FinancePlanData,
        public aDayMasjidProjectFinancePlanData: FinancePlanData,
        public masjidTableBankFinancePlanData: FinancePlanData,
        public bookSaleMaterialPlanData: MaterialPlanData,
        public bookDistributionMaterialPlanData: MaterialPlanData,
        public vhsSaleMaterialPlanData: MaterialPlanData,
        public vhsDistributionMaterialPlanData: MaterialPlanData,
        public emailDistributionMaterialPlanData: MaterialPlanData,
        public ipdcLeafletDistributionMaterialPlanData: MaterialPlanData,
        public otherSaleMaterialPlanData: MaterialPlanData,
        public otherDistributionMaterialPlanData: MaterialPlanData,
        public qardeHasanaSocialWelfarePlanData: SocialWelfarePlanData,
        public patientVisitSocialWelfarePlanData: SocialWelfarePlanData,
        public socialVisitSocialWelfarePlanData: SocialWelfarePlanData,
        public transportSocialWelfarePlanData: SocialWelfarePlanData,
        public shiftingSocialWelfarePlanData: SocialWelfarePlanData,
        public shoppingSocialWelfarePlanData: SocialWelfarePlanData,
        public foodDistributionSocialWelfarePlanData: SocialWelfarePlanData,
        public cleanUpAustraliaSocialWelfarePlanData: SocialWelfarePlanData,
        public otherSocialWelfarePlanData: SocialWelfarePlanData,
        public timestamp: Date){}
}


