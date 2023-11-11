import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DiscussionListComponent } from './components/events/discussion-list/discussion-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { AboutusComponent } from './components/home/aboutus/aboutus.component';
import { AnimeListComponent } from './components/anime_ranks/anime-list/anime-list.component';

/* 
defaults to home page /home
/login
/signup
/admin



*/
const routes: Routes = [
  { path: '', redirectTo: '/home/discussions', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'discussions', pathMatch: 'full' },
      {
        path: 'discussions',
        title: 'Discussions',
        component: DiscussionListComponent,
      },
      { path: 'aboutus', title: 'About Us', component: AboutusComponent },
      { path: 'animes', title: 'Animes', component: AnimeListComponent },
      { path: '**', redirectTo: 'discussions', pathMatch: 'full' },
    ],
  },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  { path: 'admin', title: 'Admin', component: AdminComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
