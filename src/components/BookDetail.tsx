

import type React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import type { RootState } from "../store"
import { updateBook, deleteBook } from "../store/booksSlice"


const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const book = useSelector((state: RootState) => state.books.books.find((b) => b.id === id))
  
 

  const [isEditing, setIsEditing] = useState(false)
  const [editedBook, setEditedBook] = useState(book  )


  if (!book) {
    return <div>Book not found</div>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedBook({ ...editedBook!, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateBook(editedBook!))
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteBook(book.id))
    navigate("/books")
  }

  return (
    <div className="container mx-auto px-4 py-8 overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Book" : "Book Details"}</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedBook!.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={editedBook?.author}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={editedBook?.genre}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedBook?.description}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </form>
      ) : (
        
        <div className=" flex flex-col lg:flex-row gap-9">
            {/* LEFT  */}
            <div className=" flex-1 h-fit max-h-[80vh] overflow-hidden rounded-2xl ">
                <img src={book.image || "https://v3.material-tailwind.com/team-work-1.jpg"} alt=" book image" className=" object-contain" />

            </div>


            {/* Right  */}
            <div className=" flex-1">

                <div className="montserrat">
                    <h1 className=" montserrat uppercase font-bold font-sans text-slate-800 text-5xl" >{book.title}</h1>
                    <h2 className=" capitalize mt-2 text-xl text-slate-700 ">By : <span className=" font-semibold">{book.author}</span></h2> 
                </div>

                <div className=" mt-10">
                    <h1 className="montserrat font-semibold text-2xl">Description</h1>
                    <p className=" mt-2 text-slate-700" >{book.description}</p>
                </div>

                <div className=" mt-10 ">
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline mr-2 cursor-pointer rounded-2xl"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    Delete
                </button>
                </div>

            </div>
        </div>
      )}
    </div>
  )
}

export default BookDetail

