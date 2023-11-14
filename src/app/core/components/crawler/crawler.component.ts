import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss'],
})
export class CrawlerComponent {
  restart() {
    let el = this.scroller.nativeElement;
    el.style.webkitAnimation = 'none';
    setTimeout(function () {
      el.style.webkitAnimation = '';
    }, 10);
  }

  @ViewChild('scroller') scroller?: any;
}
