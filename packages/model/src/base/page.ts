export class Page<T> {
    list: T[];
    total: number;
    pageSize: number;
    pageIndex: number;
    lastPage: number;
    hasMore: boolean;
    constructor(page: { list: T[]; total: number; pageIndex?: number; pageSize?: number }) {
        const { list, total, pageIndex = 1, pageSize = 0 } = page;
        this.pageIndex = +pageIndex;
        this.pageSize = +pageSize;
        this.list = list;
        this.total = total;
        this.lastPage = Math.ceil(total / pageSize);
        this.hasMore = this.lastPage > pageIndex;
    }
}
