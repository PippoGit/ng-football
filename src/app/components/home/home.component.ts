import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  constructor(private config: ConfigService) {}

  get countries() {
    return this.config.SUPPORTED_COUNTRIES;
  }
}
