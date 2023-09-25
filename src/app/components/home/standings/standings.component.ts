import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { Standing } from 'src/app/types/api.standings';

@Component({
  selector: 'ngf-standings',
  templateUrl: './standings.component.html',
  styleUrls: [],
})
export class StandingsComponent implements OnInit {
  apiData$: Observable<Standing[]> | null = null;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.apiData$ = this.route.params.pipe(
      switchMap((params) => this.api.getStandings(params['country']))
    );
  }

  get headers() {
    const commonStyle = 'px-3 py-3';
    return [
      {
        style: `${commonStyle} text-right`,
        title: '',
      },
      {
        style: `${commonStyle} text-right`,
        title: '',
      },
      {
        style: `${commonStyle} text-left`,
        title: 'Name',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'Games',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'W',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'L',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'D',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'GD',
      },
      {
        style: `${commonStyle} text-right`,
        title: 'Pts',
      },
    ];
  }
}
