import { Component, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-shelf',
  imports: [ SharedModule],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
})
export class ShelfComponent {

}
