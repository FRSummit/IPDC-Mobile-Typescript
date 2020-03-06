import env from "../environment";
import { fetchWithAccessToken, fetchPostWithAccessToken} from "./fetch";
import { UnitPlanViewModelDto } from "../models/UnitPlanViewModelDto";
import { PlanData } from "../models/PlanData";
import { ReportUpdateData } from "../models/ReportUpdateData";
import { ReportingTerm } from "../models/ReportingTerm";
import { OrganizationReference } from "../models/OrganizationReference";
import { UnitReportViewModelDto } from "../models/UnitReportViewModelDto";
import { ReportingFrequency } from "../models/ReportingFrequency";
// import { ReportLastPeriodUpdateData } from "models/ReportLastPeriodUpdateData";

// export class UnitPlanReportService {
class UnitPlanReportService {
    unitPlanReportServiceUrl = `${env.apiBaseUrl}/reporting/v1/unit`;
    
    createPlan(organizationReference: OrganizationReference, year: number, reportingTerm: ReportingTerm): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/create?year=${year}&reportingTerm=${reportingTerm}`,
            JSON.stringify(organizationReference));
    }

    createPlan2(organizationReference: OrganizationReference, year: number, reportingTerm: ReportingTerm, reportingFrequency: ReportingFrequency): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/create2?year=${year}&reportingTerm=${reportingTerm}&reportingFrequency=${reportingFrequency}`,
            JSON.stringify(organizationReference));
    }

    copy(copyFrom: number, organization: OrganizationReference, year: number, reportingTerm: ReportingTerm, reportingFrequency: ReportingFrequency): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/copy?year=${year}&reportingTerm=${reportingTerm}&reportingFrequency=${reportingFrequency}&copyFromReportId=${copyFrom}`,
            JSON.stringify(organization));
    }

    getPlan(planId: number): Promise<UnitPlanViewModelDto> {
        return fetchWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/${planId}`);
    }

    updatePlan(organizationId: number, planId: number, planData: PlanData): Promise<void> {
        console.log('in service')
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/update?organizationId=${organizationId}&planId=${planId}`,
            JSON.stringify(planData));
    }

    submitPlan(organizationId: number, planId: number): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/plan/submit?planId=${planId}&organizationId=${organizationId}`);
    }

    getReport(reportId: number): Promise<UnitReportViewModelDto> {
        return fetchWithAccessToken(`${this.unitPlanReportServiceUrl}/report/${reportId}`);
    }

    updateReport(organizationId: number, reportId: number, reportData: ReportUpdateData): Promise<void> {
         return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/report/update?organizationId=${organizationId}&reportId=${reportId}`,
         JSON.stringify(reportData));
    }

//     updateReportLastPeriod(organizationId: number, reportId: number, reportLastPeriodUpdateData: ReportLastPeriodUpdateData): Promise<void> {
//         return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/report/updateLastPeriod?organizationId=${organizationId}&reportId=${reportId}`,
//         JSON.stringify(reportLastPeriodUpdateData));
//    }

    submitReport(organizationId: number, reportId: number): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/report/submit?reportId=${reportId}&organizationId=${organizationId}`);
    }

    unsubmitReport(organizationId: number, reportId: number): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/report/unsubmit?reportId=${reportId}&organizationId=${organizationId}`);
    }

    // downloadReport(reportId: number, excelReportType: ExcelReportType): Promise<Blob> {
    //     return fetchFileWithAccessToken(`${this.unitPlanReportServiceUrl}/download/report/${reportId}?excelReportType=${excelReportType}`);
    // }

    delete(organizationId: number, reportId: number): Promise<void> {
        return fetchPostWithAccessToken(`${this.unitPlanReportServiceUrl}/report/delete?reportId=${reportId}&organizationId=${organizationId}`);
    }
}

export const unitPlanReportService = new UnitPlanReportService();