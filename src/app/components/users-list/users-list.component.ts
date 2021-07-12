import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/User.service';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    pageTitle:string;
    users:Array<any>;
    //Servirá para comprobar si los usuarios se han cargado
    loading:boolean;

    constructor(private _userService:UserService) {
        this.pageTitle='Usuarios';
        this.users=[];
        this.loading=true;
    }

    ngOnInit(): void {
        this.getUsers();
    }
    
    /**
     * Función que obtiene los usuarios
     */
    getUsers(){
        this._userService.getUsers().subscribe(
            response=>{
                if (response){
                    this.users=response;  
                    this.loading=false;
                } else{
                    this.loading=true;
                }        
            },
            error=>{
                this.loading=true;
            }
        );
    }
}
