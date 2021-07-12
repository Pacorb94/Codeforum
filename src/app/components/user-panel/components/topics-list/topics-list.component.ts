import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/User.service';
import { TopicService } from 'src/app/services/Topic.service';
import { Router } from '@angular/router';

@Component({
    selector: 'topics-list',
    templateUrl: './topics-list.component.html',
    styleUrls: ['./topics-list.component.scss']
})
export class TopicsListComponent implements OnInit {
    pageTitle:string;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    topics:any[];
    //Servirá para comprobar si los temas se han cargado
    loading:boolean;

    constructor(private _userService:UserService, private _topicService:TopicService,
    private _router:Router) {
        this.pageTitle='Mis temas';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();
        this.topics=[];
        this.loading=true;
    }

    ngOnInit(): void {
        this.getUserTopics();
    }

    /**
     * Función que obtiene los temas del usuario
     */
    getUserTopics(){
        this._topicService.getUserTopics(this.userLoggedIn._id).subscribe(
            response=>{
                if (response){
                    this.topics=response;
                    this.loading=false;
                }          
            }
        );
    }

    /**
     * Función que borra un tema
     * @param idTopic 
     */
    deleteTopic(idTopic:string){
        this._topicService.delete(idTopic, this.token).subscribe(
            response=>{
                //Si se borró actualiza la lista de temas
                if (response) {
                    this.getUserTopics();
                }else{
                    this._router.navigate(['/topics-list']);
                }
            },
            error=>{
                this._router.navigate(['/topics-list']);
            }
        );
    }
}
