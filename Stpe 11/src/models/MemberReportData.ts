export class MemberReportData {
    constructor(public lastPeriod: number,
        public increased: number,
        public decreased: number,
        public comment: string,
        public personalContact: number) { }
}
