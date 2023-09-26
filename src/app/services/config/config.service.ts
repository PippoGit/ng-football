import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  API_HOST = 'https://v3.football.api-sports.io/';
  API_KEY = environment.API_KEY;
  SUPPORTED_COUNTRIES: SupportedCountry[] = [
    'England',
    'Spain',
    'Germany',
    'France',
    'Italy',
  ];
}
