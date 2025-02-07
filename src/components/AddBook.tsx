

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addBook } from "../store/booksSlice"

interface FormErrors {
  title?: string
  author?: string
  genre?: string
  description?: string
  image? : string
}

const AddBook: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [image, setImage] = useState<string>("")
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    image:""
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value })
    // Clear the error for the field being edited
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (book.title.trim().length === 0) {
      newErrors.title = "Title is required"
    } else if (book.title.trim().length > 100) {
      newErrors.title = "Title must be 100 characters or less"
    }

    if (book.author.trim().length === 0) {
      newErrors.author = "Author is required"
    } else if (book.author.trim().length > 50) {
      newErrors.author = "Author must be 50 characters or less"
    }

    if (book.genre.trim().length === 0) {
      newErrors.genre = "Genre is required"
    } else if (book.genre.trim().length > 50) {
      newErrors.genre = "Genre must be 50 characters or less"
    }

    if (book.description.trim().length === 0) {
      newErrors.description = "Description is required"
    } else if (book.description.trim().length > 500) {
      newErrors.description = "Description must be 500 characters or less"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(addBook({ id: Date.now().toString(), ...book }))
      navigate("/books")
    }
  }

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBook({ ...book, image: imageUrl })
    }
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>
      <form onSubmit={handleSubmit} className="w-[80%] md:w-[50%] ">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>



        {/* here */}

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Add Image</label>
  
  <div className="flex items-center gap-4">
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageChange}
    />
    <label
      htmlFor="fileInput"
      className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all"
    >
      Choose Image
    </label>
  </div>

  {/* Image Preview */}
  {image && (
    <img
      src={image}
      alt="Selected"
      className="mt-4 w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md"
    />
  )}
</div>





        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.author ? "border-red-500" : ""
            }`}
          />
          {errors.author && <p className="text-red-500 text-xs italic">{errors.author}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.genre ? "border-red-500" : ""
            }`}
          />
          {errors.genre && <p className="text-red-500 text-xs italic">{errors.genre}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 ${
              errors.description ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Book
        </button>
      </form>
    </div>
  )
}

export default AddBook

