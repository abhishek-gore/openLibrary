import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book, BookSearchResponse } from "../book.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private readonly url = 'https://openlibrary.org/search.json';

    constructor(private http: HttpClient) { }

    getBooks(query: string, page: number = 1, limit: number = 5) {
        return this.http.get<BookSearchResponse>(this.url, {
            params: {
                q: query,
                page: page,
                limit: limit
            }
        });
    }

    getBookDetails(bookId: string) {
        return this.http.get<BookSearchResponse>(this.url + bookId).pipe(
            map((response) => response.docs[0])
        );
    }
}