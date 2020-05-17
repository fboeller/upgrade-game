import { Component, OnInit, Input } from '@angular/core';
import { Powerup, powerupMap } from 'types/powerup.type';

@Component({
  selector: 'app-powerup-panel',
  templateUrl: './powerup-panel.component.html',
  styleUrls: ['./powerup-panel.component.styl']
})
export class PowerupPanelComponent implements OnInit {

  constructor() { }

  @Input() powerups: Powerup[];

  ngOnInit() {
  }

  buy() {

  }

}
