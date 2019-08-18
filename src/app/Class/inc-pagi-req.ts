export class IncPagiReq {

    Page:number;
    type = {
        onLoad:0,
        onPage:1
    }
    constructor(Page){
        this.Page = Page;
        
    }

}
