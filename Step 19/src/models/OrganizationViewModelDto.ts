import { OrganizationType } from "./OrganizationType";
import { ReportingFrequency } from "./ReportingFrequency";
import { OrganizationReference } from "./OrganizationReference";
import { EntityReference } from "./EntityReference";

export class OrganizationViewModelDto {
    constructor(public id: number,
        public organizationType: OrganizationType,
        public organizationTypeDescription: string,
        public description: string,
        public reportingFrequency: ReportingFrequency,
        public reportingFrequencyDescription: string,
        public parent: EntityReference,
        public parentDescription: string,
        public timestamp: Date,
        public managedOrganizations: OrganizationReference[],
        public details?: string) { }
}