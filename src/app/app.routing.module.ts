//Importamos el servicio, los módulos de las rutas y los componentes
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserLoggedInGuard } from './guards/UserLoggedIn.guard';
import { HomeComponent } from './components/home/home.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { TopicsFinderComponent } from "./components/topics-finder/topics-finder.component";
import { ForumTopicsListComponent } from './components/forum-topics-list/forum-topics-list.component';
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";
import { ErrorComponent } from "./components/error/error.component";

const routes:Routes=[
    //path es la ruta por donde se accede y luego se pone el componente que se cargará
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'register', component:RegisterComponent, canActivate:[UserLoggedInGuard]},
    {path:'login', component:LoginComponent, canActivate:[UserLoggedInGuard]},
    {path:'users', component:UsersListComponent},
    {path:'user-profile/:id', component:UserProfileComponent},
    {path:'search-topics/:text', component:TopicsFinderComponent},
    {path:'topics', component:ForumTopicsListComponent},
    {path:'topics/:page', component:ForumTopicsListComponent},
    {path:'topic/:id', component:TopicDetailComponent},
    {path:'error', component:ErrorComponent},
    //** para cuando no encuentre ninguna de las rutas anteriores
    {path:'**', component:ErrorComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            /*Cada vez que se pulse en un ancla nos llevará suavemente 
            hacia la parte superior de la pantalla*/
            scrollPositionRestoration: 'top'   
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }