import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../store"
import Card from "./Card"
import Lottie from "lottie-react"
import animationData from "../assets/Animation - 1738930655465.json"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setBooks } from "../store/booksSlice"
// import { useEffect } from "react"


const BooksList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books)
  const dispatch = useDispatch()

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      dispatch(setBooks(JSON.parse(storedBooks))); // Dispatch action to update Redux
      console.log("udeate data")
    }
  }, [dispatch]);


  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    console.log("fetch data")
  }, [books]);
 
  

  return (
    <div className="container w-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Book Collection</h1>
      <Link
        to="/books/add"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
      >
        Add New Book
      </Link>
      
      {
         books.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="">
            <Card book={book}/>
          </div>
        ))}
      </div>
         ) : (
            
                <div className=" w-full justify-center flex-col items-center flex  ">
                <div className=" w-[70vw] md:w-[50vw] lg:w-[30vw]">
                <Lottie animationData={animationData} loop={true} />
                </div>
                 <h1 className="montserrat text-3xl font-bold">No Books!</h1>
                </div>
            
         )
      }

      

    </div>
  )
}

export default BooksList

