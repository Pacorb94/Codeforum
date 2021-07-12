import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { TopicService } from './../../services/Topic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user:any;
    topics:Array<any>;
    //Servirá para comprobar si el perfil del usuario se ha cargado
    loading:boolean;

    constructor(private _userService:UserService, private _topicService:TopicService, 
    private _router:Router, private _route:ActivatedRoute) {
        this.topics=[];
        this.loading=true;
    }

    ngOnInit(): void {
        this.getRouteUser();
    }

    /**
     * Función que obtiene el usuario de la ruta
     */
    getRouteUser(){
        this._route.params.subscribe(
            params=>{
                if (params['id']) {
                    let userId=params['id'];
                    this._userService.getUser(userId).subscribe(
                        response=>{
                            if (response) {
                                this.user=response;
                                this.loading=false;
                                this.getUserTopics(this.user._id);
                            } else {
                                this.loading=true;
                            }
                        },
                        erorr=>{
                            this.loading=true;
                        }
                    );
                } else {
                    this._router.navigate(['/users']);
                }
            }
        );
    }

    /**
     * Función que obtiene los temas del usuario
     * @param userId 
     */
    getUserTopics(userId:string){
        this._topicService.getUserTopics(userId).subscribe(
            response=>{
                if (response) {
                    this.topics=response;
                    this.loading=false;
                } else {
                    this.loading=true;
                }
            },
            error=>{
                this.loading=true;
            }
        );
    }
}
