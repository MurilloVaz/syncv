import { Component, Input } from '@angular/core';

@Component({
  selector: 'glowy-card',
  templateUrl: './c-glowy-card.component.html',
  styleUrls: ['./c-glowy-card.component.css']
})
export class CGlowyCardComponent {
  @Input() iconClass: string;
  @Input() title: string;
  @Input() value: string;
  @Input() cardStyle: string;
}
