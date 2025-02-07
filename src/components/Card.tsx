// import React from 'react'

import { Link } from "react-router-dom"
import { Book } from "../store/booksSlice"

function Card({book} : {book : Book}) {
  return (
    <div className=" w-[80vw] md:w-80 h-[455px] flex flex-col rounded-2xl gap-2 p-5 border-2 border-slate-700">

        <div className=" w-full h-[200px] rounded-2xl overflow-hidden ">
            <img src={book.image || "https://v3.material-tailwind.com/team-work-1.jpg"} className=" object-cover "  alt="" />
        </div>

        <div className=" px-2">
            <div className=" font-bold text-2xl capitalize"> {book.title} </div>
            <div className=" text-slate-800 line-clamp-3 "> {book.description}</div>
        </div>

        <div className=" p-2">
            <h1 className=" font-bold inline" >Author : </h1> <h1 className=" capitalize inline "> {book.author}</h1>
        </div>


        <Link to={`/books/${book.id}`} className=" h-fit w-fit p-2 px-7 mt-5 bg-slate-900 rounded-2xl text-white hover:bg-slate-800 duration-300 cursor-pointer" onClick={()=>{}}>View Details</Link>

      
    </div>
  )
}

export default Card
