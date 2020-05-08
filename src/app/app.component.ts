import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { mapTo, scan } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'upgrade-game';

  counterValue$: Observable<number>;

  ngOnInit() {
    this.counterValue$ = interval(1000)
      .pipe(
        mapTo(1),
        scan((acc, inc) => acc + inc)
      )
  }

}
