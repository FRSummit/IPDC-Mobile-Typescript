import { ReportStatus } from "./ReportStatus";
import moment from "moment";
import { PagedSearchTerms } from "./PagedSearchTerms";
import { OrganizationType } from "./OrganizationType";
import { ReportingFrequency } from "./ReportingFrequency";
import { ReportingTerm } from "./ReportingTerm";


export class ReportSearchTerms extends PagedSearchTerms {
    constructor(obj: Object = {},
        page: number = 1,
        pageSize: number = 10) {
        super(page, pageSize);
        obj = obj || {};
        // if (obj.hasOwnProperty("quickSearch"))  this.quickSearch = obj["quickSearch"];
        // if (obj.hasOwnProperty("status")) this.status = obj["status"];
        // if (obj.hasOwnProperty("organizationalType")) this.organizationalType = obj["organizationalType"];
        // if (obj.hasOwnProperty("reportingFrequency")) this.reportingFrequency = obj["reportingFrequency"];
        // if (obj.hasOwnProperty("reportingTerm")) this.reportingTerm = obj["reportingTerm"];
        // if (obj.hasOwnProperty("myReports")) this.myReports = obj["myReports"];
        // if (obj.hasOwnProperty("organization")) this.organization = obj["organization"];
        // if (obj.hasOwnProperty("parent")) this.parent = obj["parent"];
        // if (obj.hasOwnProperty("timestampFrom")) this.timestampFrom = obj["timestampFrom"];
        // if (obj.hasOwnProperty("timestampTo")) this.timestampTo = obj["timestampTo"];
        // if (obj.hasOwnProperty("reportingPeriodStartDateFrom")) this.reportingPeriodStartDateFrom = obj["reportingPeriodStartDateFrom"];
        // if (obj.hasOwnProperty("reportingPeriodEndDateTo")) this.reportingPeriodEndDateTo = obj["reportingPeriodEndDateTo"];
    }

    quickSearch?: string;
    timestampFrom?: Date;
    timestampTo?: Date;
    status?: ReportStatus;
    organizationalType?: OrganizationType;
    reportingFrequency?: ReportingFrequency;
    reportingTerm?: ReportingTerm;
    myReports?: boolean;
    organization?: number;
    parent?: number;
    reportingPeriodStartDateFrom?: Date;
    reportingPeriodEndDateTo?: Date;

    toQry(): string {
        const terms = [];
        if (this.quickSearch) {
            terms.push(`quickSearch=${encodeURIComponent(this.quickSearch)}`);
        }
        if (this.timestampFrom) {
            terms.push(`timestampFrom=${encodeURIComponent(moment(this.timestampFrom).toISOString())}`)
        }
        if (this.timestampTo) {
            terms.push(`timestampTo=${encodeURIComponent(moment(this.timestampTo).toISOString())}`)
        }
        if (this.status) {
            terms.push(`status=${encodeURIComponent(this.status.toString())}`)
        }
        if (this.organizationalType) {
            terms.push(`organizationalType=${encodeURIComponent(this.organizationalType.toString())}`)
        }
        if (this.reportingFrequency) {
            terms.push(`reportingFrequency=${encodeURIComponent(this.reportingFrequency.toString())}`)
        }
        if (this.reportingTerm) {
            terms.push(`reportingTerm=${encodeURIComponent(this.reportingTerm.toString())}`)
        }
        if (this.myReports) {
            terms.push(`myReports=${encodeURIComponent(this.myReports.toString())}`)
        }
        if (this.organization) {
            terms.push(`organization=${encodeURIComponent(this.organization.toString())}`)
        }
        if (this.parent) {
            terms.push(`parent=${encodeURIComponent(this.parent.toString())}`)
        }
        if (this.reportingPeriodStartDateFrom) {
            terms.push(`reportingPeriodStartDateFrom=${encodeURIComponent(moment(this.reportingPeriodStartDateFrom).toISOString())}`)
        }
        if (this.reportingPeriodEndDateTo) {
            terms.push(`reportingPeriodEndDateTo=${encodeURIComponent(moment(this.reportingPeriodEndDateTo).toISOString())}`)
        }
        terms.push(super.toQry());
        return terms.join("&");
    }

    resetToDefault() {
        this.quickSearch = undefined;
        this.timestampFrom = undefined;
        this.timestampTo = undefined;
        this.status = undefined;
        this.organizationalType = undefined;
        this.reportingFrequency = undefined;
        this.reportingTerm = undefined;
        this.myReports = undefined;
        this.organization = undefined;
        this.parent = undefined;
        this.reportingPeriodStartDateFrom = undefined;
        this.reportingPeriodEndDateTo = undefined;
    }
}

//export const reportSearchTerms = new ReportSearchTerms();
