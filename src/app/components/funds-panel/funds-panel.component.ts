import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-funds-panel',
  templateUrl: './funds-panel.component.html',
  styleUrls: ['./funds-panel.component.styl']
})
export class FundsPanelComponent implements OnInit {

  @Input() funds = 0;
  @Input() fundsEffect: number = null;

  constructor() { }

  ngOnInit(): void {
  }

}
