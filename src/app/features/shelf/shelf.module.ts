import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ShelfRoutingModule } from './shelf-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ShelfRoutingModule,
  ],
})
export class ShelfModule {
}
