import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ax-carousel-item',
  template: `
    <div class="ax-carousel-item" *ngIf="visible">
      <ng-content></ng-content>
    </div>
  `,
})
export class AXCarouselItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  visible: boolean = false;
}
