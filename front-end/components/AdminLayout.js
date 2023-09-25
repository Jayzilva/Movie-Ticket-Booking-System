import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from 'next/link';

export default function AdminLayout() {


  return (
<nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-cyan-500 to-blue-500 p-10">
<div className="flex items-center flex-shrink-0 text-white mr-7">

  <span className="font-semibold text-1xl tracking-tight"><Link  href="/" className="font-semibold text-3xl tracking-tight">Shoozy </Link>Manufacture-Portal</span>
</div>
<div className="block lg:hidden">
  <button className="flex items-center px-3 py-2 border rounded text-black-200 border-teal-400 hover:text-white hover:border-white">
    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
  </button>
</div>
<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ">
  <div className="text-sm lg:flex-grow ">
    <Link  href="/AdminAddMovies" className="text-lg font-medium block mt-5 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
      Add New Movies
    </Link >
    <Link  href="/AdminViewMovies" className=" text-lg font-medium block mt-5 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
      View Movies
    </Link >
  </div>
  <ConnectWallet />

  <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-4 "  onClick={() => signOut()}>Sign Out</button>
  <div>
   
  </div>
</div>
</nav>
  )
}