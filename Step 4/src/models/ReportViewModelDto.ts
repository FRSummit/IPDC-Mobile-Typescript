import { OrganizationReference } from "./OrganizationReference";
import { ReportingPeriod } from "./ReportingPeriod";
import { ReportStatus } from "./ReportStatus";
import { ReopenedReportStatus } from "./ReopenedReportStatus";

export class ReportViewModelDto {
    constructor(public id: number,
        public description: string,
        public organization: OrganizationReference,
        public reportingPeriod: ReportingPeriod,
        public reportStatus: ReportStatus,
        public reportStatusDescription: string,
        public reOpenedReportStatus: ReopenedReportStatus,
        public reOpenedReportStatusDescription: string, 
        public timestamp: Date) { }
}