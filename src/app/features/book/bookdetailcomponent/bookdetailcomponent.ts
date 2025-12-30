import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Book, BookshelfState } from '../book.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addBook } from '../book.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookdetailcomponent',
  imports: [SharedModule],
  templateUrl: './bookdetailcomponent.html',
  styleUrl: './bookdetailcomponent.scss',
})
export class Bookdetailcomponent {
  private readonly bookService = inject(BookService);
  private readonly route = inject(ActivatedRoute);
  
  constructor(private store: Store<{bookshelf: BookshelfState}>,
    private snackBar: MatSnackBar

  ) {}

  coverId: string | null = null;
  
  error: string | null = null;

  showNotification(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
    panelClass: ['success-snackbar']
  });
};

  readonly book$: Observable<Book | undefined> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');

      if (!id) {
        return of(undefined);
      }

      this.error = null;

      return this.bookService.getBookDetails(id).pipe(
        tap(book => {
          console.log(book);
          this.coverId = book.cover_i?.toString() ?? null;
        }),
        catchError(() => {
          this.error = 'Failed to load book details';
          return of(undefined);
        })
      );
    })
  );

  getCoverUrl(): string {
    return this.coverId
      ? `https://covers.openlibrary.org/b/id/${this.coverId}-L.jpg`
      : 'https://dummyimage.com/600x400/000/fff';
  }

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://dummyimage.com/600x400/000/fff';
  }

  addToShelf(book: Book): void {
    book.coverUrl = this.getCoverUrl();
    this.store.dispatch(addBook({book}));
    this.showNotification('Book added to shelf');
   }
}
