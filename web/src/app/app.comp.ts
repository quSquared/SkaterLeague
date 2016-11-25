import { Component, ViewEncapsulation  } from '@angular/core';

import '../../../common/css/styles.css';

@Component({
  selector: 'sl-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class AppComponent { }
