import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Topic } from './../models/Topic';

@Injectable()
export class TopicService {
    private url:string;

    constructor(private _http:HttpClient){
        this.url='http://localhost:3000/api';
    }

    /**
     * Función que crea un tema
     * @param topic 
     * @param token 
     * @return
     */
    create(topic:Topic, token:string):Observable<any>{
        let params=JSON.stringify(topic);
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
        return this._http.post(`${this.url}/topic/create`, params, {headers:headers});
    }

    /**
     * Función que obtiene los temas del usuario
     * @param idUser 
     * @return
     */
    getUserTopics(idUser:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/topics/users/${idUser}`, {headers:headers});
    }

    /**
     * Función que obtiene un tema
     * @param idTopic 
     * @return
     */
    getTopic(idTopic:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/topic/${idTopic}`, {headers:headers});
    }

    /**
     * Función que modifica un tema
     * @param token 
     * @return 
     */
    update(topic:Topic, token:string):Observable<any>{
        let params=JSON.stringify(topic);
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
        return this._http.put(`${this.url}/topics/${topic.getId()}/update`, params, {headers:headers});
    }

    /**
     * Función que borra un tema
     * @param idTopic 
     * @param token 
     * @return
     */
    delete(idTopic:string, token:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);
        return this._http.delete(`${this.url}/topics/${idTopic}/delete`, {headers:headers});
    }

    /**
     * Función que obtiene los temas paginados
     * @param page 
     * @return 
     */
    getPaginatedTopics(page:number=1):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/topics/${page}`, {headers:headers});
    }

    /**
     * Función que busca temas por una palabra
     * @param text 
     * @return 
     */
    search(text:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/topics/search/${text}`, {headers:headers});
    }
}