export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    isbn?: string[];
    cover_i?: number;
    edition_count?: number;
    publisher?: string[];
    language?: string[];
}

export interface BookSearchResponse {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: Book[];
}

export interface BookSearchParams {
    query: string;
    page?: number;
    limit?: number;
}