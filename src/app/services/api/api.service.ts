import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Observable, filter, map } from 'rxjs';
import { Standing, StandingsRequest } from 'src/app/types/api.standings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  leagues = new Map<SupportedCountry, string>([
    ['England', '39'],
    ['France', '61'],
    ['Italy', '135'],
    ['Germany', '78'],
    ['Spain', '140'],
  ]);

  endpoints = {
    standings: (country: SupportedCountry) =>
      `${this.buildEndpoint('standings')}?${this.leagueParam(
        country
      )}&${this.currentSeasonParam()}`,
  };

  constructor(private config: ConfigService, private http: HttpClient) {}

  private buildEndpoint(endpoint: 'standings' | 'team') {
    return `${this.config.API_HOST}/${endpoint}`;
  }

  private leagueParam(country: SupportedCountry) {
    return `league=${this.leagues.get(country)}`;
  }

  private currentSeasonParam() {
    const date = new Date();
    return `season=${date.getFullYear()}`;
  }

  getStandings(country: SupportedCountry): Observable<Standing[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.config.API_KEY,
      'x-rapidapi-host': this.config.API_HOST,
    });

    const requestOptions = {
      headers: headers,
    };

    return this.http
      .get<StandingsRequest>(this.endpoints.standings(country), requestOptions)
      .pipe(
        filter((res) => res.errors.length === 0 && res.results > 0),
        map((res) => res.response[0].league.standings[0])
      );
  }
}
