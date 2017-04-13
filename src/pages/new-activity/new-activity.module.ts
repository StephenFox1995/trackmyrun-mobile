import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewActivity } from './new-activity';

@NgModule({
  declarations: [
    NewActivity,
  ],
  imports: [
    IonicPageModule.forChild(NewActivity),
  ],
  exports: [
    NewActivity
  ]
})
export class NewActivityModule {}
