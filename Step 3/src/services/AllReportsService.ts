import env from "../environment";
import {ReportSearchTerms} from "../models/ReportSearchTerms"
import { SearchResult } from "../models/SearchResult";
import { ReportViewModelDto } from "../models/ReportViewModelDto";
import { fetchWithAccessToken } from "./fetch";

 class AllReportService {
    reportServiceUrl = `${env.apiBaseUrl}/reporting/v1/all`;

    search = (reportSearchTerms : ReportSearchTerms): Promise<SearchResult<ReportViewModelDto>> => { 
        return fetchWithAccessToken(`${this.reportServiceUrl}/search?${reportSearchTerms.toQry()}`);
    }

    // download = (reportSearchTerms: ReportSearchTerms): Promise<Blob> => {  
    //     return fetchFileWithAccessToken(`${this.reportServiceUrl}/download?${reportSearchTerms.toQry()}`);
    // }   
}

export const allReportService = new AllReportService();
