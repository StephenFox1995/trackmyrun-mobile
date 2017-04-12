import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDisplay } from './activity-display';

@NgModule({
  declarations: [
    ActivityDisplay,
  ],
  imports: [
    IonicPageModule.forChild(ActivityDisplay),
  ],
  exports: [
    ActivityDisplay
  ]
})
export class ActivityDisplayModule {}
