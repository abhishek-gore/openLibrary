import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Layout } from './layout/layout';

@NgModule({
  imports: [SharedModule, Layout],
})
export class CoreModule {}
