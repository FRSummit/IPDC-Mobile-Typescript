import { ReportingTerm } from "./ReportingTerm";
import { ReportingFrequency } from "./ReportingFrequency";
export class ReportingPeriod {
    constructor(public startDate: Date,
        public endDate: Date,
        public reportingFrequency: ReportingFrequency,
        public reportingTerm: ReportingTerm,
        public year: number) { }
}
