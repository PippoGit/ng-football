import { Directive, HostBinding, Input } from '@angular/core';
import { Team } from '../types/api.standings';

@Directive({
  selector: '[ngfLogo]',
})
export class NgfLogoDirective {
  @Input() team!: Team;

  @HostBinding('src') imageSource?: string;
  @HostBinding('style.width.px') width?: number;
  @HostBinding('alt') alt?: string;

  ngOnChanges() {
    this.imageSource = this.team.logo;
    this.width = 25;
    this.alt = this.team.name;
  }
}
