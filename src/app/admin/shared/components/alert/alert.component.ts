import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnDestroy {
  @Input() delay = 5000;
  public text!: string;
  public type = 'success';
  aSub!: Subscription;

  constructor(private alertService: AlertService) {
    this.aSub = this.alertService.alert$.subscribe((alert) => {
        this.text = alert.text;
        this.type = alert.type;
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  };

  ngOnDestroy() {
    this.aSub && this.aSub.unsubscribe();
  }
}
