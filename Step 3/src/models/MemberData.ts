export class MemberData {
    constructor(public nameAndContactNumber: string,
        public action: string,
        public lastPeriod: number,
        public upgradeTarget: number,
        public thisPeriod: number,
        public increased: number,
        public decreased: number,
        public comment: string,
        public personalContact: number) { }
}
