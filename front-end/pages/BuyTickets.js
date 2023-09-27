import UserLayout from '../components/UserLayout'
import {   
    useAddress,
    useContract,
    useContractRead,
    useContractWrite} from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function BuyTickets() {

  const address = useAddress();
  const contractAdd ="0xA7Ed3dA7A0132111Ad1AB8aB337606C78E52Ca0b";
  const { contract } = useContract(contractAdd);
  
  const { mutateAsync: bookSeat } = useContractWrite(
    contract,
    "bookSeat"
  );
  const [id, setId] = useState(0);
  const [name, setName] = useState(0);


  const handleComplaint = async () => {
    try {
      const data = await bookSeat([id, name]);

      alert(`Tiket Booked`);
      console.info("contract call successs", data);
      setId("");
      setName("");
    } catch (err) {
      const errorMessage = err.message.match(/Reason: (.*)/);
        alert(errorMessage);
        

        console.error("contract call failure", err);

    }
  };


  return (
    <>
    <UserLayout/>
   <div>
   <h1 class="text-4xl font-bold">Add Retailers</h1>
      <br/>
      <div class="mb-6">
              <label  class="block mb-2 text-sm font-medium text-gray-900">Retailer ID</label>
              <input type="text" placeholder="Movie Id" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {setId(e.target.value);}} required/>
      </div>
      <div class="mb-6">
              <label  class="block mb-2 text-sm font-medium text-gray-900">Retailer Name</label>
              <input type="text" placeholder="Number of Tickets" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={(e) => {setName(e.target.value);}} required/>
      </div>
  

        <button class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={() => {
            handleComplaint();
          }}
        >
          Add Retailer
        </button>
      
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

export default BuyTickets;
