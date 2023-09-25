import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Standing } from 'src/app/types/api.standings';

@Component({
  selector: 'ngf-standings',
  templateUrl: './standings.component.html',
  styleUrls: [],
})
export class StandingsComponent implements OnChanges {
  @Input() country!: SupportedCountry;

  apiData$: Observable<Standing[]> | null = null;

  constructor(private api: ApiService) {}

  get headers() {
    const commonStyle = 'px-3 py-3';
    return [
      {
        style: `${commonStyle} text-center`,
        title: '',
      },
      {
        style: `${commonStyle} text-center`,
        title: '',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'Name',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'Games',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'W',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'L',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'D',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'GD',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'Pts',
      },
    ];
  }

  ngOnChanges(): void {
    if (this.country) {
      this.apiData$ = this.api.getStandings(this.country);
    }
  }
}
