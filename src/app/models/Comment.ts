export class Comment {
    private _id:string;
    private content:string;
    private userId:string;
    private createdAt:Date;
    private updatedAt:Date;

    constructor(_id:string, content:string, userId:string) {
        this._id=_id;
        this.content=content;
        this.userId=userId;
        this.createdAt=new Date();
        this.updatedAt=new Date();
    }

    getId():string{
        return this._id;
    }

    setId(value:string){
        this._id=value;
    }

    getContent():string{
        return this.content;
    }

    setContent(value:string){
        this.content=value;
    }

    getUserId():string{
        return this.userId;
    }

    setUserId(value:string){
        this.userId=value;
    }

    getCreatedAt():Date{
        return this.createdAt;
    }

    getUpdatedAt():Date{
        return this.updatedAt;
    }
}