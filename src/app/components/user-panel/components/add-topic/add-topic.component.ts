import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../../services/User.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Topic } from 'src/app/models/Topic';
import { TopicService } from 'src/app/services/Topic.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'add-topic',
    templateUrl: './add-topic.component.html',
    styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent { 
    pageTitle:string;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    topic:Topic;
    form:FormGroup;
   
    constructor(private _userService:UserService, private _topicService:TopicService, 
    private _flashMessagesService:FlashMessagesService, private _router:Router) {
        this.pageTitle='Crear tema';
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

    /**
     * Función que crea un tema
     */
    createTopic(){
        if (this.form.valid) {
            this.setTopicValues();
            this._topicService.create(this.topic, this.token).subscribe(
                response=>{
                    if (response) {                        
                        this._router.navigate(['/panel']);
                    } else {
                        this.showFlashMessage('No has creado el tema', 
                            'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                        //Para limpiar el formulario
                        this.form.reset();
                    }
                },
                error=>{
                    this.showFlashMessage('No has creado el tema', 
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
