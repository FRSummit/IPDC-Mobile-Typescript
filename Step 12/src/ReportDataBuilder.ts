import { UnitReportViewModelDto } from "./models/UnitReportViewModelDto";
import { MemberReportData } from "./models/MemberReportData";
import { ReportUpdateData } from "./models/ReportUpdateData";
import { MeetingProgramData } from "./models/MeetingProgramData";
import { MeetingProgramReportData } from "./models/MeetingProgramReportData";
import { SocialWelfareData } from "./models/SocialWelfareData";
import { TeachingLearningProgramData } from "./models/TeachingLearningProgramData";
import { LibraryStockData } from "./models/LibraryStockData";
import { MaterialData } from "./models/MaterialData";
import { SocialWelfareReportData } from "./models/SocialWelfareReportData";
import { FinanceReportData } from "./models/FinanceReportData";
import { FinanceData } from "./models/FinanceData";

class ReportDataBuilder {
    
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
}

export const reportDataBuilder = new ReportDataBuilder();