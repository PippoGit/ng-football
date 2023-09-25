import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  API_HOST = 'https://v3.football.api-sports.io/';
  API_KEY = '<SECRET_KEY>';
  API_ENDPOINT = 'fixtures';
  SUPPORTED_COUNTRIES: SupportedCountry[] = [
    'England',
    'Spain',
    'Germany',
    'France',
    'Italy',
  ];
}
