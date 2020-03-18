import { PagingData } from "./PagingData";
export class SearchResult<T> {
    constructor(public items: T[], public pagingData: PagingData) { }
}
