import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book, BookSearchResponse } from "../book.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private readonly url = 'https://openlibrary.org/search.json?q=';

    constructor(private http: HttpClient) { }

    getBooks(query: string) {
        return this.http.get<BookSearchResponse>(this.url + query);
    }

    getBookDetails(bookId: string) {
        return this.http.get<BookSearchResponse>(this.url + bookId).pipe(
            map((response) => response.docs[0])
        );
    }
}