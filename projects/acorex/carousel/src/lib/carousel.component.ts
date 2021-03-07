import { AXCarouselItemComponent } from './carousel-item.component';
import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
@Component({
  selector: 'ax-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class AXCarouselComponent {
  constructor() {}
  @ContentChildren(AXCarouselItemComponent)
  contents: QueryList<AXCarouselItemComponent>;

  @ViewChild('carousel') carousel: ElementRef<HTMLDivElement>;

  @Input()
  firstIndex: number = 0;

  @Input()
  autoStart: boolean = true;

  @Input()
  duration: number = 1000;

  @Input()
  infinitLoop: boolean = true;

  @Input()
  rightArrow: string = 'fas fa-chevron-right';

  @Input()
  leftArrow: string = 'fas fa-chevron-left';

  @Input()
  dotColor: string = '#000';

  @Input()
  showDots: boolean = true;

  @Input()
  showArrows: boolean = false;

  @Input()
  cssClass: string;

  @Input()
  arrowClass: string;

  selectedIndex;
  interval: any;

  ngAfterContentInit(): void {
    this.init();
  }

  init() {
    if (this.autoStart) {
      this.automaticStart();
    } else {
      this.contents.get(this.firstIndex).visible = true;
    }
  }

  automaticStart() {
    if (this.autoStart) {
      this.contents.get(this.firstIndex).visible = true;
      this.interval = setInterval(() => {
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

  nextItemClick() {
    this.nextItem();
    clearInterval(this.interval);
  }

  prevItemClick() {
    this.prevItem();
    clearInterval(this.interval);
  }

  onDotClick(item: AXCarouselItemComponent) {
    this.contents.forEach((c) => (c.visible = false));
    item.visible = true;
    clearInterval(this.interval);
  }

  setDotStyles(item: AXCarouselItemComponent) {
    let styles = {
      'background-color': item.visible ? this.dotColor : '#d6d6d6',
    };
    return styles;
  }
}
