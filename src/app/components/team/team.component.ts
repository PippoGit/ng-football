import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: [],
})
export class TeamComponent implements OnInit {
  teamId: string | null = null;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamId = params['id'];
    });
  }

  goBack() {
    this.location.back();
  }
}
