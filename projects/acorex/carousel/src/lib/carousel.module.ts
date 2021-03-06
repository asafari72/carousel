import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AXCarouselItemComponent } from './carousel-item.component';
import { AXCarouselComponent } from './carousel.component';

@NgModule({
  declarations: [AXCarouselComponent, AXCarouselItemComponent],
  imports: [CommonModule],
  exports: [AXCarouselComponent, AXCarouselItemComponent],
})
export class AXCarouselModule {}
