import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../../services/User.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/Topic.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'edit-topic',
    templateUrl: './edit-topic.component.html',
    styleUrls: ['./edit-topic.component.scss']
})
export class EditTopicComponent implements OnInit {
    pageTitle:string;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    topic:Topic;
    form:FormGroup;

    constructor(private _userService:UserService, private _topicService:TopicService, 
    private _flashMessagesService:FlashMessagesService, private _router:Router, 
    private _route:ActivatedRoute) {
        this.pageTitle='Editar tema';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();
        this.topic=new Topic('', '', '', '', '', this.userLoggedIn._id, []);
        this.form=new FormGroup({
            title:new FormControl('', Validators.required),
            content:new FormControl('', Validators.required),
            lang:new FormControl('', Validators.required),
            code:new FormControl('')
        });
    }

    ngOnInit(): void {
        this.getRouteTopìc();
    }

    /**
     * Función que obtiene el tema de la ruta
     */
    getRouteTopìc(){
        this._route.params.subscribe(
            params=>{
                if (params['id']) {
                    let topicId=params['id'];
                    this.getTopic(topicId);
                }else{
                    this._router.navigate(['/panel']);
                }
            }
        );
    }

    /**
     * Función que obtiene un tema
     * @param topicId 
     */
    getTopic(topicId:string){
        this._topicService.getTopic(topicId).subscribe(
            response=>{
                if (response) {
                    this.topic.setValues(response[0]._id, response[0].title, 
                    response[0].content, response[0].lang, response[0].code,
                    response[0].comments);
                    this.setFormValues(this.topic);
                } else{
                    this._router.navigate(['/panel']);
                }       
            },
            error=>{
                this._router.navigate(['/panel']);
            }
        );
    }

    /**
     * Función que establece los value de los inputs con los datos del tema
     * @param topic
     */
     setFormValues(topic:any){
        this.form.get('title')?.setValue(topic.title);
        this.form.get('content')?.setValue(topic.content);
        this.form.get('lang')?.setValue(topic.lang);
        this.form.get('code')?.setValue(topic.code); 
    }

    /**
     * Función que modifica un tema
     */
    editTopic(){
        if (this.form.valid) {
            this.setTopicValues();
            this._topicService.update(this.topic, this.token).subscribe(
                response=>{
                    if (response) {
                        this.topic=response;                        
                        this._router.navigate(['/panel']);
                    } else {
                        this.showFlashMessage('No has modificado el tema', 
                            'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                        //Para limpiar el formulario
                        this.form.reset();
                    }
                },
                error=>{
                    this.showFlashMessage('No has modificado el tema', 
                            'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                    this.form.reset();
                }
            );
        }
    }

    /**
     * Función que asigna los valores del formulario al tema
     */
    setTopicValues(){
        this.topic.setTitle(this.form.get('title')?.value);
        this.topic.setTContent(this.form.get('content')?.value);
        this.topic.setLang(this.form.get('lang')?.value);
        if (this.form.get('code')?.value) {
            this.topic.setCode(this.form.get('code')?.value);
        }
    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message:string, cssClass:string, timeout:number){
        this._flashMessagesService.show(message,
            {
                cssClass:cssClass,
                timeout:timeout
            }
        );
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field:any):boolean{
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field:any, fieldName:string):string{
        if (field.errors?.required) return `El campo ${fieldName} es obligatorio`;
        return '';
    }
}
