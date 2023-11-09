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
    AnimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
