import { Component } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent{
    pageTitle:string;

    constructor() { 
        this.pageTitle='Panel de usuario';
    }
}
