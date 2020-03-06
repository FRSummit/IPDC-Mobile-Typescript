import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './report-landing.html';
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
    report = new ReportSearchTerms();
    // planData = new PlanData()
    // planData !: PlanData
    orgReport !: []
    orgName !: []
    orgReportStatus !: []
    data(){
        return {
            unit_items: [],
            orgReport: [],
        }
    };
    savePlan() {
        console.log('savePlan')
        console.log(JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberPlanData')!))
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        const unitReportOrgId:any = localStorage.getItem('planandreports_passing_unit_org_id')
        console.log('unit id : ' + unitReportId)
        console.log('unit org id : ' + unitReportOrgId)

        let unitPlanViewModelDto: UnitPlanViewModelDto
        let plandata: any = []
        unitPlanReportService
            .getPlan(unitReportId)
            .then(res => {
                console.log(res)
                unitPlanViewModelDto = res
                console.log(JSON.stringify(res))

                // plandata.associateMemberPlanData.upgradeTarget = 5
                // plandata.associateMemberPlanData.nameAndContactNumber = '000'
                // plandata.associateMemberPlanData.action = '13321'
                plandata = {
                    associateMemberPlanData: {
                        upgradeTarget: 5,
                        nameAndContactNumber: '000',
                        action: '13321'
                    },
                    preliminaryMemberPlanData: {
                        upgradeTarget: 5,
                        nameAndContactNumber: '000',
                        action: '13321'
                    },
                    supporterMemberPlanData: {
                        upgradeTarget: 5,
                        nameAndContactNumber: '000',
                        action: '13321'
                    },
                    memberMemberPlanData: {
                        upgradeTarget: 5,
                        nameAndContactNumber: '000',
                        action: '13321'
                    },
    
                    // Meeting
                    workerMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    cmsMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    smMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    memberMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    dawahMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    stateLeaderMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    stateOutingMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    iftarMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    learningMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    socialDawahMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    dawahGroupMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    nextGMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    tafsirMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    unitMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    bbqMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    gatheringMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    familyVisitMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    eidReunionMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    otherMeetingProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    // TeachingLearningProgramPlanData
                    groupStudyTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    studyCircleForAssociateMemberTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    studyCircleTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    practiceDarsTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    stateLearningCampTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    quranStudyTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    hadithTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    quranClassTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    weekendIslamicSchoolTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    memorizingAyatTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    memorizingHadithTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    memorizingDoaTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    stateLearningSessionTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    stateQiyamulLailTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    otherTeachingLearningProgramPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    // SocialWelfarePlanData
                    qardeHasanaSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    patientVisitSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    socialVisitSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    transportSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    shiftingSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    shoppingSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    foodDistributionSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    cleanUpAustraliaSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    otherSocialWelfarePlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    // MaterialPlanData
                    bookSaleMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    bookDistributionMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    vhsSaleMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    vhsDistributionMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    emailDistributionMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    ipdcLeafletDistributionMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    otherSaleMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    otherDistributionMaterialPlanData: {
                        target: 5,
                        dateAndAction: null
                    },
                    // FinancePlanData
                    baitulMalFinancePlanData: {
                        action: null,
                        workerPromiseIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        },
                        otherSourceAction: null,
                        otherSourceIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        }
                    },
                    aDayMasjidProjectFinancePlanData: {
                        action: null,
                        workerPromiseIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        },
                        otherSourceAction: null,
                        otherSourceIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        }
                    },
                    masjidTableBankFinancePlanData: {
                        action: null,
                        workerPromiseIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        },
                        otherSourceAction: null,
                        otherSourceIncreaseTarget: {
                            amount: 0.0,
                            currency: 8
                        }
                    }
                }
                console.log(JSON.stringify(plandata))
                
                unitPlanReportService
                    .updatePlan(unitPlanViewModelDto.organization.id, unitPlanViewModelDto.id, plandata)
                    .then(res => {
                        console.log(res)
                    })
            })

    }
    submitPlan() {
        console.log('submitPlan')
        console.log(JSON.parse(localStorage.getItem('manpowerAndPersonalContacts_memberMemberData')!))
    }
    created() {
        const unitReportId:any = localStorage.getItem('planandreports_passing_unit_id')
        console.log(unitReportId)
        let a: any = []
        allReportService.search(this.report)
            .then(res => {
                for(let i=0; i<res.items.length; i++) {
                    if(res.items[i].id == unitReportId) {
                        a.push(res.items[i])
                    }
                }
            })
        this.orgReport = a
        console.log(a)
    }
}