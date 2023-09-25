import AdminLayout from '../components/AdminLayout'
import { useAddress, useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import React, { useEffect, useState } from 'react';


function AdminViewMovies() {
  const address = useAddress();
  const contractAdd ="0x8105589c0658cD725Dc8067A6001059D94f31deA";
  const { contract } = useContract(contractAdd);
  const { data: viewAllSneakers } = useContractRead(contract, "viewAllSneakers");
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    if (viewAllSneakers) {
      setSneakers(viewAllSneakers);
    }
  }, [viewAllSneakers]);

  return (
    <div>
       
          <>
          <AdminLayout/>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        <table >
      <thead>
        <tr  class="border-b border-gray-100 dark:border-gray-300 bg-gray-100">
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Model No</th>
          <th scope="col" class="px-6 py-3">Color</th>
          <th scope="col" class="px-6 py-3">Size</th>
          <th scope="col" class="px-6 py-3">Block No</th>
          <th scope="col" class="px-6 py-3">Retailer</th>
          <th scope="col" class="px-6 py-3">Approved by Manufacturer</th>
          <th scope="col" class="px-6 py-3">Distributor</th>
          <th scope="col" class="px-6 py-3">Product Delivered </th>
          
          
        </tr>
      </thead>
      <tbody>
        {sneakers.map((sneaker) => (
          <tr key={sneaker.id}  class="border-b border-gray-500 dark:border-gray-700">
            <td class="px-6 py-4">{sneaker.id.toString()}</td>
            <td class="px-6 py-4">{sneaker.modelno}</td>
            <td class="px-6 py-4">{sneaker.color}</td>
            <td class="px-6 py-4">{sneaker.size}</td>
            <td class="px-6 py-4">{sneaker.blockNumber.toString()}</td>
            <td class="px-6 py-4">{sneaker.retailerName}</td>
            <td class="px-6 py-4">{sneaker.isApproved.toString()}</td>
            <td class="px-6 py-4">{sneaker.distributerName}</td>
            <td class="px-6 py-4">{sneaker.isDelivered.toString()}</td>
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