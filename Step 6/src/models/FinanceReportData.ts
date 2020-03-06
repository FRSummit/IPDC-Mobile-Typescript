import { Money } from "./Money";

export class FinanceReportData {
    constructor(public workerPromiseLastPeriod: Money, public lastPeriod: Money, public workerPromiseIncreased: Money, public workerPromiseDecreased: Money, public collection: Money, public expense: Money, public nisabPaidToCentral: Money, public comment: string) { }
}
