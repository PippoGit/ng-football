import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigService } from './services/config/config.service';

import { TeamComponent } from './components/team/team.component';
import { HomeComponent } from './components/home/home.component';
import { NationsSelectorComponent } from './components/home/nations-selector/nations-selector.component';
import { StandingsComponent } from './components/home/standings/standings.component';
import { TeamHistoryComponent } from './components/team/history/team-history.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NationsSelectorComponent,
    StandingsComponent,
    TeamHistoryComponent,
    HomeComponent,
    TeamComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
