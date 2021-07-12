/**
 * Clase que almacena al usuario
 */
 export class User{
    private _id: string;
    private name: string;
    private surname: string;
    private email: string;
    private password: any;
    private image:string;
    private role: string;
    private createdAt: Date;  
    private updatedAt: Date;
    private getToken: any;
   
    constructor(_id:string, name:string, surname:string, email:string, password:string, image:string){
        this._id=_id;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.image=image;
        this.role='User';
        this.createdAt=new Date();
        this.updatedAt=new Date();
        this.getToken=null;
    }

    getId():string{
        return this._id;
    }

    setId(value:string){
        this._id=value;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
    }

    getSurname(): string {
        return this.surname;
    }

    setSurname(value: string) {
        this.surname = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }

    getPassword(): string {
        return this.password;
    }
    
    setPassword(value: string) {
        this.password = value;
    }

    getImage():string{
        return this.image;
    }

    setImage(value:string){
        this.image=value;
    }

    getRole(): string {
        return this.role;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
        
    setGetToken(value: any) {
        this.getToken = value;
    }
}