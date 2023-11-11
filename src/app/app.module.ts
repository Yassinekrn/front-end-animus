import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { AboutusComponent } from './components/home/aboutus/aboutus.component';
import { DiscussionListComponent } from './components/events/discussion-list/discussion-list.component';
import { DiscussionComponent } from './components/events/discussion/discussion.component';
import { DiscussionFormComponent } from './components/forms/discussion-form/discussion-form.component';
import { AnimeFormComponent } from './components/forms/anime-form/anime-form.component';
import { AnimeListComponent } from './components/anime_ranks/anime-list/anime-list.component';
import { AnimeComponent } from './components/anime_ranks/anime/anime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeroComponent } from './components/home/hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    DiscussionListComponent,
    DiscussionComponent,
    DiscussionFormComponent,
    AnimeFormComponent,
    AnimeListComponent,
    AnimeComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    AdminComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
