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
import { AnimeFormComponent } from './components/forms/anime-form/anime-form.component';
import { AnimeListComponent } from './components/anime_ranks/anime-list/anime-list.component';
import { AnimeComponent } from './components/anime_ranks/anime/anime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/private/admin/admin.component';
import { HeroComponent } from './components/home/hero/hero.component';
import { JournalPipe } from './pipes/journal.pipe';
import { DiscussionInfoComponent } from './components/events/discussion-info/discussion-info.component';
import { DiscussionUpdateComponent } from './components/forms/discussion-update/discussion-update.component';
import { AccountsComponent } from './components/private/accounts/accounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateAccComponent } from './components/user/update-acc/update-acc.component';
import { AccountFormComponent } from './components/forms/account-form/account-form.component';
import { HidepwdPipe } from './pipes/hidepwd.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateDiscussionComponent } from './components/forms/create-discussion/create-discussion.component';
import { AnimeInfoComponent } from './components/anime_ranks/anime-info/anime-info.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    DiscussionListComponent,
    DiscussionComponent,
    AnimeFormComponent,
    AnimeListComponent,
    AnimeComponent,
    FooterComponent,
    NavbarComponent,
    MainComponent,
    AdminComponent,
    HeroComponent,
    JournalPipe,
    DiscussionInfoComponent,
    DiscussionUpdateComponent,
    AccountsComponent,
    UpdateAccComponent,
    AccountFormComponent,
    HidepwdPipe,
    CreateDiscussionComponent,
    AnimeInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
