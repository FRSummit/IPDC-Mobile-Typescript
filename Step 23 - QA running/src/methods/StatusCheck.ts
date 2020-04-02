import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { UnitPlanReportService } from "../services/UnitPlanReportService"

export default class StatusCheck extends Vue {

    unitPlanReportService = new UnitPlanReportService();
    unitReportId:any;

    tabStatus() {
        let status = null
        console.log('status ' + localStorage.getItem('planandreports_passing_unit_id'))
        this.unitReportId = localStorage.getItem('planandreports_passing_unit_id')
        this.unitPlanReportService
            .getPlan(this.unitReportId)
            .then(res => {
                console.log(res.reportStatusDescription)
                status = res.reportStatusDescription
            })
    }
}

export const tabStatus = new StatusCheck();