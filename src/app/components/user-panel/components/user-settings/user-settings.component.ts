import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../../services/User.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent{
    pageTitle:string;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    form:FormGroup;
    afuConfig:any;

    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService, 
    private _router:Router) {
        this.pageTitle='Ajustes de usuario';
        this.userLoggedIn=this._userService.getUserLoggedIn();
        this.token=this._userService.getToken();
        //Los campos del formulario deben estar agrupados si son más de uno
        this.form=new FormGroup({
            name:new FormControl(this.userLoggedIn.name, Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")),
            surname:new FormControl(this.userLoggedIn.surname, Validators.pattern("^[a-zA-ZñáéíóúÑÁÉÍÓÚ ]*$")),
            email:new FormControl(this.userLoggedIn.email, Validators.email)
        }); 
        this.afuConfig={
            //Sólo 1 archivo
            multiple:false,
            formatsAllowed:'.jpg, .jpeg, .png, .gif',
            maxSize:'50',
            uploadAPI:{
                url:'http://localhost:3000/api/user/profile-image/upload',
                headers:{"Authorization":this.token}
            },
            //El archivo se subirá dando click a un botón
            theme:'attachPin',
            //Mostrar barra de progreso
            hideProgressBar:false,
            //Ocultar botón de reset
            hideResetBtn:true,
            hideSelectBtn:false,
            replaceTexts:{
                //Texto del campo
                attachPinBtn:'Sube una imagen de perfil'
            }
        }
    }

    /**
     * Función que modifica un usuario
     */
    editUser(){
        if (this.form.valid) {
            this.setUserValues();
            this._userService.update(this.token, this.userLoggedIn).subscribe(
                response=>{
                    if (response) {
                        this.showFlashMessage('Has modificado tu perfil',
                            'alert alert-success col-md-4 mt-3 mx-auto', 1500);
                        let modifiedUser=response;
                        //Actualizamos el localStorage con los nuevos datos del usuario
                        localStorage.setItem('user', JSON.stringify(modifiedUser));   
                        //Le damos el usuario al observable
                        this._userService.setUserLoggedIn(modifiedUser);
                    } else {
                        this.showFlashMessage('No has modificado tu perfil correctamente',
                            'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                        this._userService.setUserLoggedIn(null);
                    }
                },
                error=>{
                    this.showFlashMessage('No has modificado tu perfil correctamente',
                        'alert alert-danger col-md-3 mt-3 mx-auto', 1500);
                    this._userService.setUserLoggedIn(null);
                    this._router.navigate(['/home']);
                }
            );
        }
    }

    /**
     * Función que asigna los valores del formulario al usuario
     */
    setUserValues(){
        if (this.form.get('name')?.value) {
            this.userLoggedIn.name=this.form.get('name')?.value;
        }
        if (this.form.get('surname')?.value) {
            this.userLoggedIn.surname=this.form.get('surname')?.value;
        }
        if (this.form.get('email')?.value) {
            this.userLoggedIn.email=this.form.get('email')?.value;
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
     * Función que asigna una imagen de perfil
     * @param event
     */
    profileImage(event:any){
        let fileExtension=event.body.image.split('\.')[1];
        let extensions=['jpg', 'jpeg', 'png', 'gif'];
        if (extensions.indexOf(fileExtension)!=-1) this.userLoggedIn.image=event.body.image;       
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
        let message='';
        if (field.errors?.pattern||field.errors?.email) {
            message=`El campo ${fieldName} es incorrecto`;
        } else if(field.errors?.required){
            message=`El campo ${fieldName} es obligatorio`;
        }
        return message;
    }
}
