//Como es un módulo debemos importar ngModule
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CheckUserGuard } from '../../../services/CheckUser.guard';
import { MainComponent } from './main/main.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

//Definimos las rutas
const panelRoutes:Routes=[
    {
        path:'panel', component:MainComponent, 
        canActivate:[CheckUserGuard],
        //Rutas hijas
        children:[
            {path:'', component:TopicsListComponent},
            {path:'topics-list', component:TopicsListComponent},
            {path:'add-topic', component:AddTopicComponent},
            {path:'edit-topic/:id', component:EditTopicComponent},
            {path:'user-settings', component:UserSettingsComponent}
        ]
    }
];

@NgModule({
    //Añadimos las rutas
    imports:[
        RouterModule.forChild(panelRoutes)
    ],
    //Para usarlas debemos exportar la clase
    exports:[
        RouterModule
    ]
})

//Para usar este archivo debemos exportarlo
export class UserPanelRoutingModule{}