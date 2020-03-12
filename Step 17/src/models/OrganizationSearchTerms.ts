import { PagedSearchTerms } from "./PagedSearchTerms";
import { OrganizationType } from "./OrganizationType";
export class OrganizationSearchTerms extends PagedSearchTerms {
    constructor(public quickSearch?: string,
        public organizationType?: OrganizationType, 
        page: number = 1,
        pageSize: number = 10) {
        super(page, pageSize);
    }
    toQry(): string {
        const terms = [];
        if (this.quickSearch) {
            terms.push(`quickSearch=${encodeURIComponent(this.quickSearch)}`);
        }
        if (this.organizationType) {
            terms.push(`organizationType=${encodeURIComponent(this.organizationType)}`);
        }
        terms.push(super.toQry());
        return terms.join("&");
    }
}
