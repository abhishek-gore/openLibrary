import { Component, inject, Inject } from '@angular/core';
import { BookService } from '../book/services/book.service';
import { SharedModule } from '../../shared/shared.module';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap, tap } from 'rxjs';
import { Book, BookSearchResponse } from '../book/book.model';
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
  books: Book[] = [];
  books$ = this.searchControl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    // tap(() => this.isLoading = true),
    switchMap(query => 
      this.bookService.getBooks(query || '').pipe(
        map(response => {
          this.isLoading = false;
          return response.docs}),

        catchError(() => {
          this.isLoading = false;
          return of ([])
        }),
        finalize(() => this.isLoading = false),
      )
    ),
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

}