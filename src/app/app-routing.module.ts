import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DiscussionListComponent } from './components/events/discussion-list/discussion-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminComponent } from './components/private/admin/admin.component';
import { AboutusComponent } from './components/home/aboutus/aboutus.component';
import { AnimeListComponent } from './components/anime_ranks/anime-list/anime-list.component';
import { DiscussionInfoComponent } from './components/events/discussion-info/discussion-info.component';
import { DiscussionUpdateComponent } from './components/forms/discussion-update/discussion-update.component';
import { authGuard } from './guards/auth.guard';
import { AccountsComponent } from './components/private/accounts/accounts.component';
import { UpdateAccComponent } from './components/user/update-acc/update-acc.component';
import { AccountFormComponent } from './components/forms/account-form/account-form.component';
import { CreateDiscussionComponent } from './components/forms/create-discussion/create-discussion.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AnimeInfoComponent } from './components/anime_ranks/anime-info/anime-info.component';
import { AnimeFormComponent } from './components/forms/anime-form/anime-form.component';

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
      {
        path: 'discussions/:id',
        title: 'Discussion Infos',
        component: DiscussionInfoComponent,
      },
      {
        path: 'animes/:id',
        title: 'Anime Infos',
        component: AnimeInfoComponent,
      },
      { path: '**', redirectTo: 'discussions', pathMatch: 'full' },
    ],
  },
  {
    path: 'user',
    title: 'User Profile',
    component: UpdateAccComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update',
    title: 'Update Password',
    component: AccountFormComponent,
    canActivate: [authGuard],
  },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
  {
    path: 'admin',
    title: 'Admin',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'accounts', pathMatch: 'full' },
      { path: 'accounts', title: 'Accounts', component: AccountsComponent },
    ],
  },
  {
    path: 'update_disc/:id',
    title: 'Update Discussion',
    component: DiscussionUpdateComponent,
  },
  {
    path: 'create_disc',
    title: 'Create Discussion',
    component: CreateDiscussionComponent,
  },
  {
    path: 'create_anime',
    title: 'Create Anime',
    component: AnimeFormComponent,
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
