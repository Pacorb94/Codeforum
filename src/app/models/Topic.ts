import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export class Topic {
    private _id: string;
    private title:string;
    private content:string;
    private lang:string;
    private code:string;
    private userId:string;
    private comments:[];
    private createdAt:Date;
    private updatedAt:Date;

    constructor(_id:string, title:string, content:string, lang:string, code:string, userId:string, 
    comments:[]) {
        this._id=_id;
        this.title=title;
        this.content=content;
        this.lang=lang;
        this.code=code;
        this.userId=userId;
        this.comments=comments;
        this.createdAt=new Date();
        this.updatedAt=new Date();
    }

    /**
     * Función que asigna los valores
     * @param id 
     * @param title 
     * @param content 
     * @param lang 
     * @param code 
     * @param comments 
     */
    setValues(id:string, title:string, content:string, lang:string, code:string, comments:[]){
        this.setId(id);
        this.setTitle(title);
        this.setTContent(content);
        this.setLang(lang);
        this.setCode(code);
        this.setComments(comments);
    }

    public getId():string {
        return this._id;
    }

    public setId(value: string) {
        this._id = value;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(value: string) {
        this.title = value;
    }

    public getContent(): string {
        return this.content;
    }

    public setTContent(value: string) {
        this.content = value;
    }

    public getLang(): string {
        return this.lang;
    }

    public setLang(value: string) {
        this.lang = value;
    }

    public getCode(): string {
        return this.code;
    }

    public setCode(value: string) {
        this.code = value;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(value: string) {
        this.userId = value;
    }

    public getComments(): [] {
        return this.comments;
    }

    public setComments(value: []) {
        this.comments = value;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}