export class Pagination {

    public Page: number;
    public PageSize: number;
    constructor(PageNum, PageSize){
        this.Page = PageNum;
        this.PageSize = PageSize;
    }
}
