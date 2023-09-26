import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'ngf-team-history',
  templateUrl: './team-history.component.html',
  styleUrls: [],
})
export class TeamHistoryComponent implements OnInit {
  @Input() team!: string;
  apiData$: Observable<any> | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.apiData$ = this.api.getFixtures(this.team);
  }
}
