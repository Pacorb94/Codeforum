import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/User.service';
import { User } from './../../models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{
    pageTitle:string;
    user:User;
    userLoggedIn:any;
    //Token del usuario
    token:string;
    form:FormGroup; 
    @ViewChild('check', { static: false }) checkbox: any;

    constructor(private _userService:UserService, private _flashMessagesService:FlashMessagesService, 
    private _router:Router, private _cdRef:ChangeDetectorRef) {
        this.pageTitle='Iniciar sesión';
        this.user=new User('', '', '', '', '', '');
        this.token='';
        this.form=new FormGroup({
            email:new FormControl('', [Validators.required, Validators.email]),
            password:new FormControl('', Validators.required),
            check:new FormControl(false)
        });
    }   

    //Para que podamos seleccionar elementos HTML debemos esperar a que cargue la vista
    ngAfterViewInit(){
        this.fillEmailAndMarkCheckbox();       
    }
 
    /**
     * Función que rellena el campo email con el localStorage y marca el checkbox
     */
    fillEmailAndMarkCheckbox(){
        //Si existe
        if (localStorage.hasOwnProperty('rememberEmail')) {
            this.form.get('email')?.setValue(localStorage.getItem('rememberEmail'));
            this.checkbox.nativeElement.checked=true;
            this._cdRef.detectChanges();
        }
    }
    
    /**
     * Función que inicia sesión
     */
    login(){
        if (this.form.valid) {
            this.setUserFormValues();
            this._userService.login(this.user).subscribe(
                response=>{
                    if (response) {
                        this.userLoggedIn=response;
                        localStorage.setItem('user', JSON.stringify(this.userLoggedIn));
                        this.getToken(this.userLoggedIn);
                        //Le damos el usuario logueado
                        this._userService.setUserLoggedIn(this.userLoggedIn);
                        this._router.navigate(['/home']);
                    } else {
                        this.showFlashMessage(' No has iniciado sesión correctamente',
                            'alert alert-danger col-md-4 mt-3 mx-auto', 1500);
                        this._userService.setUserLoggedIn(null);
                    }
                },
                error=>{
                    this.showFlashMessage(' No has iniciado sesión correctamente',
                        'alert alert-danger col-md-4 mt-3 mx-auto', 1500);
                    this._userService.setUserLoggedIn(null);
                    //Limpiamos el campo de la contraseña
                    this.form.get('password')?.setValue(this.form.get('password')?.value);
                }
            );
        }
    }

    /**
     * Función que da los valores del formulario al usuario
     */
    setUserFormValues(){
        this.user.setEmail(this.form.get('email')?.value);
        this.user.setPassword(this.form.get('password')?.value);
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
     * Función que obtiene el token del usuario identificado
     * @param userLoggedIn 
     */
    getToken(userLoggedIn:any){
        this._userService.login(this.user, true).subscribe(
            response=>{
                if (response.token) {
                    this.token=response.token;
                    localStorage.setItem('token', this.token);
                }
            },
            error=>{}
        );
    }

    /**
     * Función que guarda el email si se marca el checkbox y sino se borra el
     * email del localstorage
     * @param event 
     */
    rememberEmail(event:any){
        if (event.target.checked&&this.form.get('email')?.value) {
            let email=this.form.get('email')?.value;
            localStorage.setItem('rememberEmail', email);         
        }else if(event.target.checked==false&&localStorage.hasOwnProperty('rememberEmail')){
            localStorage.removeItem('rememberEmail');
        }
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
        //Con ? le decimos que puede haber errores sino no funciona
        if (field.errors?.pattern||field.errors?.email) {
            message=`El campo ${fieldName} es incorrecto`;        
        }else if(field.errors?.required){
            message=`El campo ${fieldName} debe estar relleno`;
        }
        return message;
    }
}
