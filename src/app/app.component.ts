import { Component, OnInit } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { mapTo, scan, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  counterValue$: Observable<number>;
  increment$: Observable<number>;

  ngOnInit() {
    this.increment$ = of(2);
    this.counterValue$ = interval(1000)
      .pipe(
        withLatestFrom(this.increment$, (_, inc) => inc),
        scan((acc, inc) => acc + inc)
      )
  }

}
