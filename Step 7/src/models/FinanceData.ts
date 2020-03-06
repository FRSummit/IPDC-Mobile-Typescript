import { Money } from "./Money";
export class FinanceData {
    constructor(
        public workerPromiseLastPeriod: Money, 
        public lastPeriod: Money,
        public workerPromiseIncreaseTarget: Money,
        public workerPromiseIncreased: Money, 
        public workerPromiseDecreased: Money,         
        public workerPromiseThisPeriod: Money,
        public otherSourceIncreaseTarget: Money, // ignore
        public totalIncreaseTarget: Money, // ignore
        public collection: Money, 
        public expense: Money, 
        public nisabPaidToCentral: Money,
        public balance: Money,
        public comment: string, // show comment
        public action: string,
        public otherSourceAction: string) { }
}

/*
        private Money GetTotalIncreaseTarget()
        {
            return WorkerPromiseIncreaseTarget + OtherSourceIncreaseTarget <= Money.Zero()
                ? Money.Zero()
                : WorkerPromiseIncreaseTarget + OtherSourceIncreaseTarget;
        }
        private Money GetThisPeriod()
        {
            return WorkerPromiseLastPeriod + WorkerPromiseIncreased - WorkerPromiseDecreased <= Money.Zero()
                ? Money.Zero()
                : WorkerPromiseLastPeriod + WorkerPromiseIncreased - WorkerPromiseDecreased;
        }

*/
