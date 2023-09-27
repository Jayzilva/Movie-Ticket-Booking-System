import AdminLayout from '../components/AdminLayout'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';


function AdminViewMovies() {
  const address = useAddress();
  const contractAdd ="0xA7Ed3dA7A0132111Ad1AB8aB337606C78E52Ca0b";
  const { contract } = useContract(contractAdd);
  const { data: viewMovies } = useContractRead(contract, "viewMovies");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (viewMovies) {
      setMovies(viewMovies);
    }
  }, [viewMovies]);

  return (
    <div>
       
          <>
          <AdminLayout/>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table >
      <thead>
        <tr  class="border-b border-gray-100 dark:border-gray-300 bg-gray-100">
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Movie Name</th>
          <th scope="col" class="px-6 py-3">Total Seats</th>
          <th scope="col" class="px-6 py-3">Available Seats</th>
          <th scope="col" class="px-6 py-3">isAvailable</th>
          
          
        </tr>
      </thead>
      <tbody>
        {movies.map((Movie) => (
          <tr key={Movie.id}  class="border-b border-gray-500 dark:border-gray-700">
            <td class="px-6 py-4">{Movie.id.toString()}</td>
          <td class="px-6 py-4">{Movie.movieName}</td> 
            <td class="px-6 py-4">{Movie.seatCount.toString()}</td>
            <td class="px-6 py-4">{Movie.availableSeatCount.toString()}</td>
            <td class="px-6 py-4">{Movie.isAvailable.toString()}</td>

          </tr>
        ))}
      </tbody>
    </table>
        </div>

        
          </>

    </div>
  )
}

export default AdminViewMovies