import { AppState } from "../../app.state"
import { createSelector } from "@ngrx/store"

const getDecade = (year: number) => {
    const decade = year - (year % 10);
    return `${decade}-${decade + 9}`;
  }

export const selectBookShelf = (state: AppState) => state.bookshelf;
export const selectAnalytics = createSelector(
    selectBookShelf,
    (bookShelf) => {
        const books = bookShelf.books;
        const decades = new Map<string, number>();
        let ebookAccessCount = 0;

        for (const book of books) {
            if (book.ebook_access) {
                ebookAccessCount++;
            }

            if (book.first_publish_year) {
                const decade = getDecade(book.first_publish_year);
                const decadeRange = `${decade} - ${decade + 9}`;
                decades.set(decadeRange, (decades.get(decadeRange) || 0) + 1);
            }
        }
        
        return {
            totalBooks: books.length,
            decades : Array.from(decades.entries()).map(([decade, count]) => ({decade, count})).sort((a, b) => a.decade.localeCompare(b.decade)),
            ebookAccess: {
                hasAccess: ebookAccessCount,
                noAccess: books.length - ebookAccessCount,
            }
        };
    }
)