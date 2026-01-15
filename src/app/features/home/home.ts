import { Component, inject } from '@angular/core';
import { BookService } from '../book/services/book.service';
import { SharedModule } from '../../shared/shared.module';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, merge, of, Subject, switchMap, tap } from 'rxjs';
import { Book } from '../book/book.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  private readonly bookService: BookService = inject(BookService);
  private readonly router: Router = inject(Router);
 isLoading = false;
  searchControl = new FormControl<string>('');
  page = 1;
  limit = 5;
  hasMore = true;

private loadMore$ = new Subject<void>();
  books: Book[] = [];
  books$ = merge(
  this.searchControl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    tap(() => {
      this.page = 1;
      this.books = [];
      this.hasMore = true;
    }),
    map(query => ({ query, reset: true }))
  ),
  this.loadMore$.pipe(
    map(() => ({ query: this.searchControl.value || '', reset: false }))
  )
).pipe(
  tap(() => (this.isLoading = true)),
  switchMap(({ query, reset }) =>
    this.fetchBooks(query!, reset)
  )
);

  viewBookDetails(book: Book) {
    if (book.key) {
      this.router.navigate(['/book', book.key])
    }
  }

  getCoverUrl(book: any): string {
  return book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'assets/no-cover.png';
}

private fetchBooks(query: string, reset: boolean = false) {
  return this.bookService.getBooks(query || '', this.page, this.limit).pipe(
    map(response => {
      this.hasMore = response.docs.length === this.limit;
      this.books = reset ? response.docs : [...this.books, ...response.docs];
      return this.books;
    }),
    catchError(() => {
      return of (this.books)
    }),
    finalize(() => this.isLoading = false),
  );
}

fetchMore() {
  if (this.isLoading || !this.hasMore) {
    return;
  }
  this.page++;
  this.loadMore$.next();
}

}