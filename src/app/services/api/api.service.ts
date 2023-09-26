import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Observable, filter, map, of, tap } from 'rxjs';
import { Standing, StandingsResponse } from 'src/app/types/api.standings';
import { CacheService } from '../cache/cache.service';
import { FixturesResponse, Match } from 'src/app/types/api.fixtures';

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
      `${this.buildEndpoint('standings')}?league=${this.leagueParam(
        country
      )}&${this.currentSeasonParam()}`,
    fixtures: (team: string, last: number) =>
      `${this.buildEndpoint('fixtures')}?team=${team}&last=${last}`,
  };

  headers = new HttpHeaders({
    'x-rapidapi-key': this.config.API_KEY,
    'x-rapidapi-host': this.config.API_HOST,
  });

  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private cache: CacheService
  ) {}

  private buildEndpoint(endpoint: 'standings' | 'team' | 'fixtures') {
    return `${this.config.API_HOST}/${endpoint}`;
  }

  private leagueParam(country: SupportedCountry) {
    return `${this.leagues.get(country)}`;
  }

  private currentSeasonParam() {
    const date = new Date();
    const year = date.getFullYear();

    // we need to take "last year" if we are still in last
    // year season. See https://www.api-football.com/documentation-v3#tag/Leagues/operation/get-seasons
    const season = date.getMonth() < 7 ? year - 1 : year;

    return `season=${season}`;
  }

  getStandings(country: SupportedCountry): Observable<Standing[]> {
    const cached = this.cache.getStandings(country);
    if (cached) {
      return of(cached);
    }

    // if not in cache
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.config.API_KEY,
      'x-rapidapi-host': this.config.API_HOST,
    });

    const requestOptions = {
      headers: headers,
    };

    return this.http
      .get<StandingsResponse>(this.endpoints.standings(country), requestOptions)
      .pipe(
        filter((res) => res.errors.length === 0 && res.results > 0),
        map((res) => res.response[0].league.standings[0]),
        tap((data) => this.cache.setStandings(country, data))
      );
  }

  getFixtures(team: string, last = 10): Observable<any> {
    const cached = this.cache.getFixtures(team);
    if (cached) {
      return of(cached);
    }

    return this.http
      .get<FixturesResponse>(this.endpoints.fixtures(team, last), {
        headers: this.headers,
      })
      .pipe(
        filter((res) => res.errors.length === 0 && res.results > 0),
        map((res) =>
          res.response.map(
            (f) => ({ ...f.teams, score: f.score.fulltime } as Match)
          )
        ),
        tap((data) => this.cache.setFixtures(team, data))
      );
  }
}
