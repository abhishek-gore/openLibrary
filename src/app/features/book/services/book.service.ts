import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BookSearchResponse } from "../book.model";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    private readonly url = 'https://openlibrary.org/search.json?q=';

    constructor(private http: HttpClient) { }

    getBooks(query: string) {
        return this.http.get<BookSearchResponse>(this.url + query);
    }
}