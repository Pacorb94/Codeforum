import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class UserService{
    private url:string;
    private userLoggedIn:BehaviorSubject<any>;
    //Token del usuario
    private token:any;

    constructor(private _http:HttpClient){
        this.url='http://localhost:3000/api';
        this.userLoggedIn=new BehaviorSubject(this.getUserLoggedIn());
    }

    setUserLoggedIn(value:any){
        this.userLoggedIn.next(value);
    }

    /**
     * Función que devuelve un observable para comprobar si el usuario inició
     * sesión
     * @return 
     */
    getUserLoggedIn$():Observable<any>{
        return this.userLoggedIn.asObservable();
    }

    /**
     * Función que regitra a un usuario
     * @param user 
     */
    register(user:User):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let params=JSON.stringify(user);
        //Establecemos el tipo de cabecera y lo enviamos como json ya que con Node podemos enviarlo así
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}/register`, params, {headers:headers});
    }

    /**
     * Función que inicia sesión
     * @param user 
     * @param getToken ? indica opcional
     */
    login(user:User, getToken?:boolean):Observable<any>{
        //Si tiene valor
        if (getToken) user.setGetToken(true); 
        //Tenemos que convertir el usuario a json-string
        let params=JSON.stringify(user); 
        //Establecemos el tipo de cabecera y lo enviamos como json ya que con Node podemos enviarlo así
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}/login`, params, {headers:headers});
    }

    /**
     * Función que obtiene el usuario logueado
     * @return
     */
    getUserLoggedIn():any{
        let localStorageUser=null;
        if (localStorage.hasOwnProperty('user')) {
            localStorageUser=JSON.parse(localStorage.getItem('user')||'{}');
        }
        return localStorageUser;
    }

    /**
     * Función que obtiene el token del usuario logueado
     * @return
     */
    getToken():any{
        if (localStorage.hasOwnProperty('token')){
            this.token=localStorage.getItem('token');
        }else{
            this.token=null;
        }
        return this.token;
    }

    /**
     * Función que obtiene la imagen de perfil
     * @param image 
     * @return 
     */
    getProfileImage(image:string):Observable<any>{
        let header=new HttpHeaders().set('Content-Type', 'image/*');
        //Para obtener imágenes se pone responseType:'blob'
        return this._http.get(`http://localhost:3000/api/user/images/${image}`, 
            {headers:header, responseType:'blob'}); 
    }

    /**
     * Función que modifica un usuario
     * @param token 
     * @param user 
     * @return
     */
    update(token:string, user:any):Observable<any>{
        //Tenemos que convertir el usuario a json-string
        let params=JSON.stringify(user);
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
        return this._http.put(`${this.url}/user/update`, params, {headers:headers});
    }

    /**
     * Función que devuelve todos los usuarios
     * @return
     */
    getUsers():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/users`, {headers:headers});
    }

    /**
     * Función que devuelve un usuario
     * @param userId
     * @return
     */
     getUser(userId:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/users/${userId}`, {headers:headers});
    }
}