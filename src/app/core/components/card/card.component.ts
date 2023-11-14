import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('flipState', [
      state(
        'active',
        style({
          transform: 'rotateY(179deg)',
        })
      ),
      state(
        'inactive',
        style({
          transform: 'rotateY(0)',
        })
      ),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Output() flipped = new EventEmitter();

  ngOnInit() {}

  flip: string = 'inactive';

  getDetails() {
    this.flipped.emit();
    this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }
}
