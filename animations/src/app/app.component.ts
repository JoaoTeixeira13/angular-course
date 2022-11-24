import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          backgroundColor: 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({ backgroundColor: 'blue', transform: 'translateX(100px)' })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          backgroundColor: 'red',
          transform: 'translateX(0) scale(1)',
          borderRadius: 0,
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
          borderRadius: 0,
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'green',
          transform: 'translateX(0) scale(0.5)',
          borderRadius: 0,
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({ backgroundColor: 'orange' }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [animate(300)]),
      transition('* => void', [
        style({ opacity: 1, transform: 'translateX(100px)' }),
        animate(300, style({ opacity: 0, transform: 'translateX(-100px)' })),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({ transform: 'translateX(-100px)', opacity: 0, offset: 0 }),
            style({
              transform: 'translateX(-40px)',
              opacity: 0.5,
              offset: 0.3,
            }),
            style({ transform: 'translateX(-15px)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
      transition('* => void', [
        group([
          animate(800, style({ opacity: 0, transform: 'translateX(-100px)' })),
          animate(300, style({ color: 'red' })),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAnimate() {
    this.state === 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');

    this.wildState === 'normal'
      ? (this.wildState = 'highlighted')
      : (this.wildState = 'normal');
  }

  animationStarted(event) {
    console.log('event reveal, ', event);
  }
  animationEnded(event) {
    console.log('event vanished, ', event);
  }
  onShrink() {
    console.log('item will shrink');
    this.wildState = 'shrunken';
  }

  onDelete(item: string) {
    const updatedList = this.list;
    const index: number = updatedList.indexOf(item);
    if (index !== -1) {
      updatedList.splice(index, 1);
    }
    this.list = updatedList;
  }

  onAdd(item) {
    this.list.push(item);
  }
}
