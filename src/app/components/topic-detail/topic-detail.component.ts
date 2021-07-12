import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/services/Topic.service';
import { UserService } from './../../services/User.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../../models/Comment';
import { CommentService } from 'src/app/services/Comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'topic-detail',
    templateUrl: './topic-detail.component.html',
    styleUrls: ['./topic-detail.component.scss'],
    providers: [CommentService]
})
export class TopicDetailComponent implements OnInit {
    userLoggedIn: any;
    topic: any;
    //Token del usuario
    token: string;
    comment: Comment;
    form: FormGroup;
    profileImage: any;

    constructor(private _topicService: TopicService, private _userService: UserService,
    private _commentService: CommentService, private _flashMessagesService: FlashMessagesService,
    private _router: Router, private _route: ActivatedRoute) {
        this.userLoggedIn = this._userService.getUserLoggedIn();
        this.token = this._userService.getToken();
        this.comment = new Comment('', '', this.userLoggedIn);
        this.form = new FormGroup({
            content: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.getRouteTopic();
    }

    /**
     * Función que obtiene un el tema de la ruta
     */
    getRouteTopic() {
        this._route.params.subscribe(
            params => {
                if (params['id']) {
                    let topicId = params['id'];
                    this.getTopic(topicId);
                } else {
                    this._router.navigate(['/topics']);
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
            response => {
                if (response) {
                    this.topic = response[0];
                } else {
                    this._router.navigate(['/topics']);
                }
            },
            error => {
                this._router.navigate(['/topics']);
            }
        )
    }

    /**
     * Función que crea un comentario
     */
    addComment() {
        if (this.form.valid) {
            this.comment.setContent(this.form.get('content')?.value);
            this._commentService.create(this.topic._id, this.comment, this.token).subscribe(
                response => {
                    if (response) {
                        this.showFlashMessage('Has creado el comentario',
                            'alert alert-success col-md-7 mt-3 text-center mx-auto', 1500);
                        //Almacenamos el tema con el nuevo comentario
                        this.topic = response;
                        //Limpiamos el formulario
                        this.form.reset();
                    } else {
                        this.showFlashMessage('No has creado el comentario',
                            'alert alert-danger col-md-7 mt-3 text-center mx-auto', 1500);
                        this.form.reset();
                    }
                },
                error => {
                    this.showFlashMessage('No has creado el comentario',
                        'alert alert-danger col-md-7 mt-3 text-center mx-auto', 1500);
                    this.form.reset();
                }
            );
        }
    }

    /**
     * Función que borra un comentario
     * @param commentId 
     */
    deleteComment(commentId:string){
        this._commentService.delete(this.topic._id, commentId, this.token).subscribe(
            response=>{
                if (response) {
                    //Almacenamos el tema sin el comentario borrado
                    this.topic=response;
                    this.showFlashMessage('Has borrado el comentario',
                        'alert alert-success col-md-7 mt-3 text-center mx-auto', 1500);
                } else {
                    this.showFlashMessage('No has borrado el comentario',
                        'alert alert-danger col-md-7 mt-3 text-center mx-auto', 1500);
                }
            },
            error=>{
                this.showFlashMessage('No has borrado el comentario',
                    'alert alert-danger col-md-7 mt-3 text-center mx-auto', 1500);
            }
        );
    }

    /**
     * Función que muestra un mensaje flash
     * @param message
     * @param cssClass
     * @param timeout
     */
    showFlashMessage(message: string, cssClass: string, timeout: number) {
        this._flashMessagesService.show(message,
            {
                cssClass: cssClass,
                timeout: timeout
            }
        );
    }

    /**
     * Función que comprueba si el foco está en el campo
     * @param field
     */
    checkTouched(field: any): boolean {
        if (field.touched) return true;
        return false;
    }

    /**
     * Función que muestra un mensaje de validación incorrecta
     * @param field 
     * @param fieldName 
     */
    wrongValidationMessage(field: any, fieldName: string): string {
        if (field.errors?.required)`El campo ${fieldName} es obligatorio`;
        return '';
    }
}
