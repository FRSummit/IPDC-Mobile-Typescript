import { OrganizationType } from "./OrganizationType";
import { ReportingFrequency } from "./ReportingFrequency";
import { OrganizationReference } from "./OrganizationReference";
import { EntityReference } from "./EntityReference";

export class OrganizationUserViewModelDto {
    constructor(public id: number,
        public username: string,
        public role: string,
        public organization: EntityReference,
        public timestamp: Date) {}
}
