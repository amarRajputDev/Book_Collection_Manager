import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import BooksList from "./components/BooksList"
import AddBook from "./components/AddBook"
import BookDetail from "./components/BookDetail"

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

