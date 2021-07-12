import { Component, OnInit } from '@angular/core';
import { TopicService } from './../../services/Topic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'topics-finder',
    templateUrl: './topics-finder.component.html',
    styleUrls: ['./topics-finder.component.scss']
})
export class TopicsFinderComponent implements OnInit {
    pageTitle:string;
    topics:Array<any>;
    //Servirá para comprobar si los temas se han cargado
    loading:boolean;

    constructor(private _topicService:TopicService, private _route:ActivatedRoute, 
    private _router:Router) { 
        this.pageTitle='';
        this.topics=[];
        this.loading=true;      
    }   

    ngOnInit(): void {
        this.getRouteText();
    }

    /**
     * Función que obtiene el texto de la ruta
     */
    getRouteText(){
        this._route.params.subscribe(
            params=>{
                if (params['text']) {
                    let text=params['text'];
                    this.pageTitle=`Buscar por ${text}`;
                    this.getTopics(text);
                } else {
                    this._router.navigate(['/home']);
                }
            }
        );
    }

    /**
     * Función que devuelve los temas relacionados con el texto
     * @param text 
     */
    getTopics(text:string){
        this._topicService.search(text).subscribe(
            response=>{
                //Si hay temas
                if (response.length>0) {
                    console.log('a');
                    this.loading=false;
                    this.topics=response;
                }
            },
            error=>{
            }
        );
    }
}
