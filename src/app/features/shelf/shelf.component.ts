import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BookshelfState } from '../book/book.model';
import { Store } from '@ngrx/store';
import { loadBooks, removeBook } from '../book/book.actions';

@Component({
  selector: 'app-shelf',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
})
export class ShelfComponent {
  private store = inject(Store<{ bookshelf: BookshelfState }>);
  books$ = this.store.select((state) => state.bookshelf.books);
  loading$ = this.store.select(state => state.bookshelf.loading);
  loadedImages = new Set<string>();
  constructor() {
    this.store.dispatch(loadBooks());
  }

  onImageLoad(bookId: string) {
    console.log(bookId, 'bookId')
    this.loadedImages.add(bookId);
  }

  onImageError(bookId: string) {
    this.loadedImages.add(bookId);
  }

  isImageLoaded(bookId: string) {
    return this.loadedImages.has(bookId);
  }

  removeBook(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }
}
