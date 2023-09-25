import AdminLayout from '../components/AdminLayout'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';


function AdminViewMovies() {
  const address = useAddress();
  const contractAdd = "0x8105589c0658cD725Dc8067A6001059D94f31deA";
  const { contract } = useContract(contractAdd);
  const { mutateAsync: addRetailer } = useContractWrite(
    contract,
    "addRetailer"
  );
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  //const { data: session } = useSession();

  const handleComplaint = async () => {
    try {
      const data = await addRetailer([id, name, addr]);

      alert(`Retailer Added`);
      console.info("contract call successs", data);
      setId("");
      setName("");
      setAddr("");
    } catch (err) {
      const errorMessage = err.message.match(/Reason: (.*)/);
        alert(errorMessage);
        

        console.error("contract call failure", err);

    }
  };
/*
  useEffect(() => {
    if (viewMovies) {
      setSneakers(viewMovies);
    }
  }, [viewMovies]);
*/
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
          <th scope="col" class="px-6 py-3">Number of Seats</th>
          <th scope="col" class="px-6 py-3">Availability</th>
          <th scope="col" class="px-6 py-3">Availabile Seats</th>          
        </tr>
      </thead>
      <tbody>
  {/*    {movies.map((movie) => (
          <tr key={movie.id}  class="border-b border-gray-500 dark:border-gray-700">
            <td class="px-6 py-4">{movie.id.toString()}</td>
            <td class="px-6 py-4">{movie.movieName}</td>
            <td class="px-6 py-4">{movie.seats.toString()}</td>
            <td class="px-6 py-4">{movie.availability.toString()}</td>
  
          </tr>
        ))} */}  
      </tbody>
    </table>
        </div>

        <hr/>
          </>

          <h1 class="text-4xl font-bold">Add Retailers</h1>
      <br/>
      <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Retailer ID</label>
              <input type="text" placeholder="ID" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {setId(e.target.value);}} required/>
      </div>
      <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Retailer Name</label>
              <input type="text" placeholder="Name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={(e) => {setName(e.target.value);}} required/>
      </div>
      <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Retailer Address</label>
              <input type="text" placeholder="0xxxx" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={(e) => {setAddr(e.target.value);}} required/>
      </div>

        <button class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={() => {
            handleComplaint();
          }}
        >
          Add Retailer
        </button>
      
    </div>
  )
}

export default AdminViewMovies