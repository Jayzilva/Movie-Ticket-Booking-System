import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';

export default function AdminLayout() {


  return (
<nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-gray-900 to-gray-800 p-10"> 
<div className="flex items-center flex-shrink-0 text-white mr-7">

  <span className="font-semibold text-1xl tracking-tight font-semibold text-3xl tracking-tight"><Link  href="/">BIX Cinema - Admin Portal </Link> </span>
</div>
<div className="block lg:hidden">
  <button className="flex items-center px-3 py-2 border rounded text-slate-200 border-teal-400 hover:text-white hover:border-white">
    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
  </button>
</div>
<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto  ">
  <div className="text-sm lg:flex-grow bg-gray-700 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded text-center  m-2">
    <Link  href="/AdminViewMovies" className=" text-lg font-medium block mt-5 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4 ">
      View Movie Details
    </Link >
  </div>
  <div className="text-sm lg:flex-grow bg-gray-700 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded mr-58 text-center  m-2">
    <Link  href="/" className=" text-lg font-medium block mt-5 lg:inline-block lg:mt-0 text-slate-200 hover:text-white mr-4 ">
      Add New Movie
    </Link >
  </div>
  <div>
  <ConnectWallet />
  </div>
</div>
</nav>
  )
}