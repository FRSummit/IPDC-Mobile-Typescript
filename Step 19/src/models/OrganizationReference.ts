import { OrganizationType } from "./OrganizationType";
import { ReportingFrequency } from "./ReportingFrequency";
export class OrganizationReference {
    constructor(public id: number,
        public organizationType: OrganizationType,
        public description: string,
        public reportingFrequency: ReportingFrequency,
        public details?: string) { }
}
