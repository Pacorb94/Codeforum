import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/User.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
    userLoggedIn: any;
    profileImage: any;
    form:FormGroup;

    constructor(private _userService: UserService, private _router: Router,
    private _sanitizer: DomSanitizer) {
        this.form=new FormGroup({
            topicsSearchText:new FormControl('', Validators.required)
        });
    }
  
    ngOnInit() {
        this.loadUser();
    }

    /**
     * Función que carga el usuario
     */
    loadUser() {
        this._userService.getUserLoggedIn$().subscribe(user => {
            if (user) {
                this.userLoggedIn=user;
                this.loadProfileImage();
            }                 
        });
    }

    /**
     * Función que carga la imagen de perfil del usuario, si no tiene o hay un error se asigna una por
     * defecto
     */
    loadProfileImage() {
        if (this.userLoggedIn.image) {
            this._userService.getProfileImage(this.userLoggedIn.image).subscribe(
                response => {
                    let imageURL = URL.createObjectURL(response);
                    this.profileImage = this._sanitizer.bypassSecurityTrustUrl(imageURL);
                },
                error => {
                    this.profileImage = '../assets/images/sinFotoPerfil.png';
                }
            );
        } else {
            this.profileImage = '../assets/images/sinFotoPerfil.png';
        }
    }

    /**
     * Función que cierra sesión
     */
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.userLoggedIn = null;
        this._router.navigate(['/home']);
    }

    /**
     * Función que busca temas por una palabra
     * @param text 
     */
    searchTopics(text:string){
        if (this.form.valid) this._router.navigate(['search-topics', text]);        
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
