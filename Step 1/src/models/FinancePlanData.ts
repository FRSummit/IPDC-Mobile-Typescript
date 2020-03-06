import { Money } from "./Money";
export class FinancePlanData {
    constructor(public action: string, public workerPromiseIncreaseTarget: Money, public otherSourceAction: string, public otherSourceIncreaseTarget: Money) { }
}
