import UserLayout from '../components/UserLayout'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';

function AdminViewMovies() {

  const address = useAddress();
  const contractAdd ="0x31C1Ce23bc7A0687ad23C9028DDE4Ec518Ee3D91";
  const { contract } = useContract(contractAdd);
  const { data: viewMovies } = useContractRead(contract, "viewMovies");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (viewMovies) {
      setMovies(viewMovies);
    }
  }, [viewMovies]);


  return (
    <>
    <UserLayout/>
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
</>
  );
}

export default AdminViewMovies;
