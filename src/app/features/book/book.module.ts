import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  imports: [
    SharedModule,
    BookRoutingModule,
  ],
})
export class BookModule {}
