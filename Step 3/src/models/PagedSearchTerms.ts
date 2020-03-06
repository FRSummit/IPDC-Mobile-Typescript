export class PagedSearchTerms {
    constructor(public page: number = 1, public pageSize: number = 10) { }
    toQry(): string {
        const terms = [];
        if (this.page) {
            terms.push(`page=${encodeURIComponent(this.page.toString())}`);
        }
        if (this.pageSize) {
            terms.push(`pageSize=${encodeURIComponent(this.pageSize.toString())}`);
        }
        return terms.join("&");
    }
}
