import { OrganizationReference } from "./OrganizationReference";
import { ReportingFrequency } from "./ReportingFrequency";
import { ReportingTerm } from "./ReportingTerm";

export class ReportingPeriodViewModel {
    constructor(public organizationReference: OrganizationReference, 
        public year: number,
        public reportingFrequency: ReportingFrequency, 
        public reportingTerm: ReportingTerm, 
        public startDate: Date, 
        public endDate: Date, 
        public isActive: boolean) { }
}
