//Este archivo contiene todo lo que se podrá usar en el componente userPanel
import { HttpClientModule } from '@angular/common/http';
import { UserPanelRoutingModule } from './user-panel.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'angular2-moment';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
    declarations:[
        MainComponent,
        AddTopicComponent,
        EditTopicComponent,
        TopicsListComponent,
        UserSettingsComponent
    ],
    imports:[
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        UserPanelRoutingModule,
        AngularFileUploaderModule,
        MomentModule,
        FlashMessagesModule
    ],
    exports:[
        MainComponent,
        AddTopicComponent,
        EditTopicComponent,
        TopicsListComponent,
        UserSettingsComponent
    ],
    providers:[]
})

export class UserPanelModule{}