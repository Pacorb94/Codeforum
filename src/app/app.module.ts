import { TopicService } from 'src/app/services/Topic.service';
import { CheckUserGuard } from './guards/CheckUser.guard';
import { UserLoggedInGuard } from './guards/UserLoggedIn.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { UserService } from './services/User.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MomentModule } from 'angular2-moment';
import { ForumTopicsListComponent } from './components/forum-topics-list/forum-topics-list.component';
//Para que funcione el panel debemos importarlo aquí
import { UserPanelModule } from './components/user-panel/components/userPanel.module';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { NgxHighlightJsModule, NGX_HIGHLIGHT_JS_DEFAULT_THEME } from '@nowzoo/ngx-highlight-js';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TopicsFinderComponent } from './components/topics-finder/topics-finder.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        ErrorComponent,
        ForumTopicsListComponent,
        TopicDetailComponent,
        NavbarComponent,
        UsersListComponent,
        UserProfileComponent,
        TopicsFinderComponent
    ],
    imports: [
        BrowserModule,
        routing,
        ReactiveFormsModule,
        HttpClientModule,
        MomentModule,
        UserPanelModule,
        NgxHighlightJsModule.forRoot(),
        FlashMessagesModule.forRoot()
    ],
    providers: [
        appRoutingProviders, 
        UserService, 
        CheckUserGuard, 
        UserLoggedInGuard,
        TopicService,
        //Para cambiar el fondo 
        {provide: NGX_HIGHLIGHT_JS_DEFAULT_THEME, useValue: 'atelier-cave-dark'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
