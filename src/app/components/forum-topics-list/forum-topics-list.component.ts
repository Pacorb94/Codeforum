import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/Topic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'forum-topics-list',
    templateUrl: './forum-topics-list.component.html',
    styleUrls: ['./forum-topics-list.component.scss']
})
export class ForumTopicsListComponent implements OnInit {
    pageTitle:string;
    topics:any[];
    //Servirá para comprobar si los temas se han cargado
    loading:boolean;
    //Paginación
    page:any;
    prevPage:number;
    nextPage:number;
    totalPages:number[];

    constructor(private _topicService:TopicService, private _router:Router, 
    private _route:ActivatedRoute) {
        this.pageTitle='Temas del foro';
        this.topics=[];
        this.loading=true;
        this.prevPage=0;
        this.nextPage=0;
        this.totalPages=[];
    }

    ngOnInit(): void {
        this.getRoutePage();
    }

    /**
     * Función que obtiene la página de la ruta
     */
    getRoutePage(){
        this._route.params.subscribe(
            params=>{
                this.page=params['page'];
                //Si tiene valor y es un número sino será el por defecto
                if (this.page&&this.page.match(/[\d]+/)) {
                    this.page=Number.parseInt(this.page);                     
                }else { 
                    this.page=1;
                    this.prevPage=1;
                    this.nextPage=2;          
                }
                this.getPaginatedTopics();
            }
        );   
    }

    /**
     * Función que obtiene los temas paginados
     */
    getPaginatedTopics(){
        this._topicService.getPaginatedTopics(this.page).subscribe(
            response=>{                      
                //Si hay temas
                if (response.topics.length) {
                    this.loading=false;
                    this.topics=response.topics;          
                    this.pagination(response.totalPages);   
                }else{
                    this.loading=true;
                }                                                 
            },
            error=>{
                this._router.navigate(['/home']);
            }
        );
    }

    /**
     * Función que hace la paginación de los vídeos
     * @param totalPages
     */
    pagination(totalPages:any){
        //Reiniciamos la variable
        this.totalPages=[];
        for (let page = 1; page <= totalPages; page++) this.totalPages.push(page);
        //Si la página actual es la 2 o más, la página anterior será 1 menos a la actual sino será la 1
        if (this.page>=2) {
            this.prevPage=this.page-1;
        } else {
            this.prevPage=1;
        }
        /*Si la página actual es menor al total de páginas, la página siguiente será la actual más 1 sino
        la página siguiente será la última*/
        if (this.page<totalPages){
            this.nextPage=this.page+1;
        }else{
            this.nextPage=totalPages;
        }
    }
}
