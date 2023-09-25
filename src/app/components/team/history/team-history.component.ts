import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngf-team-history',
  templateUrl: './team-history.component.html',
  styleUrls: [],
})
export class TeamHistoryComponent {
  @Input() team!: string;
}
