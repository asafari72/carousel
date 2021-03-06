import { AXCarouselItemComponent } from './carousel-item.component';
import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import './prototype';
@Component({
  selector: 'ax-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class AXCarouselComponent {
  constructor() {}
  @ContentChildren(AXCarouselItemComponent)
  contents: QueryList<AXCarouselItemComponent>;

  @Input()
  firstIndex: number = 0;

  @Input()
  autoStart: boolean = true;

  @Input()
  duration: number = 1000;

  @Input()
  infinitLoop: boolean = true;

  selectedIndex;

  ngAfterContentInit(): void {
    this.automaticStart();
  }

  automaticStart() {
    if (this.autoStart) {
      setInterval(() => {
        this.nextItem();
      }, this.duration);
    }
  }

  nextItem() {
    let arrLenght = this.contents.length - 1;
    this.selectedIndex = this.contents
      .toArray()
      .findIndex((c) => c.visible == true);
    if (this.selectedIndex != arrLenght) {
      this.contents.forEach((c) => (c.visible = false));
      this.contents.get(this.selectedIndex + 1).visible = true;
    }
    if (this.selectedIndex == arrLenght && this.infinitLoop) {
      this.contents.forEach((c) => (c.visible = false));
      this.contents.get(this.firstIndex).visible = true;
    }
  }
  prevItem() {
    this.selectedIndex = this.contents
      .toArray()
      .findIndex((c) => c.visible == true);
    if (this.selectedIndex != 0) {
      this.contents.forEach((c) => (c.visible = false));
      this.contents.get(this.selectedIndex - 1).visible = true;
    }
    if (this.selectedIndex == 0 && this.infinitLoop) {
      this.contents.forEach((c) => (c.visible = false));
      this.contents.last.visible = true;
    }
  }
}
