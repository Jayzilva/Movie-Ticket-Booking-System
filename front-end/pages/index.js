import UserLayout from '../components/UserLayout'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function AdminViewMovies() {

  const address = useAddress();
  const contractAdd ="0xA7Ed3dA7A0132111Ad1AB8aB337606C78E52Ca0b";
  const { contract } = useContract(contractAdd);
  const { data: viewAvailableMovies } = useContractRead(contract, "viewAvailableMovies");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (viewAvailableMovies) {
      setMovies(viewAvailableMovies);
    }
  }, [viewAvailableMovies]);


  return (
    <>
    <UserLayout/>
    <div class="container">

      <div className='m-3'>
      <h1 class="text-6xl">NOW SHOWING</h1>
      </div>
    <table >

<tr >
  {movies.map((Movie) => (
  <>
    <td class="px-2 py-3 font-mono text-2xl font-bold text-center">{Movie.movieName}</td>
  </>
    ))}
</tr>
<tr class="border-b border-gray-500 dark:border-gray-700">
  {movies.map((Movie) => (
  <>
    <td class="px-2 py-4"><img class=" h-60 w-44" src={Movie.movieImg}></img></td>
  </>
    ))}
</tr>
</table>

    </div>
    <footer class=" shadow dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">BIX Cinema</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
        <Link href="/AdminViewMovies">
          <button class="mr-4 hover:underline md:mr-6">Admin Portal</button>
        </Link>
        </li>
    </ul>
    </div>
</footer>
    
</>
  );
}

export default AdminViewMovies;
