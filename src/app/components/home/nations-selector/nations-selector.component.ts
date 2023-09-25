import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngf-nations-selector',
  templateUrl: './nations-selector.component.html',
  styleUrls: [],
})
export class NationsSelectorComponent {
  @Input() countries: SupportedCountry[] = [];
}
