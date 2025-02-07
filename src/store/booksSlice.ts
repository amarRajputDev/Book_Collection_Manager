import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  description: string
  image: string
}

interface BooksState {
  books: Book[]
}

const initialState: BooksState = {
  books: [],
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex((book) => book.id === action.payload.id)
      if (index !== -1) {
        state.books[index] = action.payload
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload; // Set books from localStorage
      },
  },
})

export const { addBook, updateBook, deleteBook,setBooks } = booksSlice.actions
export default booksSlice.reducer

