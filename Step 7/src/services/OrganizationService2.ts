import env from "../environment";
import { OrganizationSearchTerms } from "src/models/OrganizationSearchTerms";
import { OrganizationViewModelDto } from "src/models/OrganizationViewModelDto";
import { EntityReference } from "src/models/EntityReference";
import { OrganizationType } from "src/models/OrganizationType";
import { ReportingFrequency } from "src/models/ReportingFrequency";
import { SearchResult } from "src/models/SearchResult";
import { fetchPostWithAccessToken, fetchWithAccessToken } from "./fetch";


// export class OrganizationService {
class OrganizationService {
    organizationServiceUrl = `${env.apiBaseUrl}/reporting/v1/organization`;

    search = (organizationSearchTerms: OrganizationSearchTerms): Promise<SearchResult<OrganizationViewModelDto>> => {
        return fetchWithAccessToken(`${this.organizationServiceUrl}/search?${organizationSearchTerms.toQry()}`);
    }

    myorganizations = (): Promise<OrganizationViewModelDto[]> => {
        return fetchWithAccessToken(`${this.organizationServiceUrl}/myorganizations`);
    }
    create(description: string, details: string, organizationType: OrganizationType, reportingFrequency: ReportingFrequency, parent: EntityReference): Promise<void> {
        return fetchPostWithAccessToken(`${this.organizationServiceUrl}/create?description=${description}&details=${details}&organizationType=${organizationType}&reportingFrequency=${reportingFrequency}`,
            JSON.stringify(parent));
    }

    update(organizationId: number, description: string, details: string, organizationType: OrganizationType, reportingFrequency: ReportingFrequency, parent: EntityReference): Promise<void> {
        return fetchPostWithAccessToken(`${this.organizationServiceUrl}/update?organizationId=${organizationId}&description=${description}&details=${details}&organizationType=${organizationType}&reportingFrequency=${reportingFrequency}`,
            JSON.stringify(parent));
    }

    delete(organizationId: number): Promise<void> {
        return fetchPostWithAccessToken(`${this.organizationServiceUrl}/delete?organizationId=${organizationId}`);
    }

    getOrganization(organizationId: number): Promise<OrganizationViewModelDto> {
        return fetchWithAccessToken(`${this.organizationServiceUrl}/id?organizationId=${organizationId}`);
    }
}

export const organizationService = new OrganizationService();