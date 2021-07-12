import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './../models/Comment';

@Injectable()
export class CommentService{
    private url:string;
    
    constructor(private _http:HttpClient) {
        this.url='http://localhost:3000/api';
    }

    /**
     * Función que crea un comentario
     * @param topicId
     * @param comment 
     * @param token 
     * @return
     */
    create(topicId:string, comment:Comment, token:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
        let params=JSON.stringify(comment);
        return this._http.post(`${this.url}/${topicId}/comment/create`, params, {headers:headers});
    }

    /**
     * Función que modifica un comentario
     * @param comment 
     * @param token 
     * @return 
     */
    update(comment:Comment, token:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);                                  
        let params=JSON.stringify(comment);
        return this._http.put(`${this.url}/comments/${comment.getId()}/update`, params, {headers:headers});
    }

    /**
     * Función que borra un comentario
     * @param topicId
     * @param commentId
     * @param token 
     * @return 
     */
    delete(topicId:string, commentId:string, token:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
        return this._http.delete(`${this.url}/${topicId}/comments/${commentId}/delete`, {headers:headers});
    }
}