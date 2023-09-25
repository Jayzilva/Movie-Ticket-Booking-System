import AdminLayout from "../components/AdminLayout";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";


function AdminAddMovies() {
  const address = useAddress();
  const contractAdd = "0x8105589c0658cD725Dc8067A6001059D94f31deA";
  const { contract } = useContract(contractAdd);
  const { mutateAsync: createMovie } = useContractWrite(
    contract,
    "createMovie"
  );
  const [id, setId] = useState(0);
  const [name, setName] = useState("");


  const handleComplaint = async () => {
    try {
      const data = await createMovie([id, name]);

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

  return (
    <div>
       
       <>
          <AdminLayout />
      <div class="w-96 m-10">
      <h1 class="text-4xl font-bold">Add Retailers</h1>
      <br/>
      <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Movie ID</label>
              <input type="text" placeholder="ID" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => {setId(e.target.value);}} required/>
      </div>
      <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Movie Name</label>
              <input type="text" placeholder="Name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  onChange={(e) => {setName(e.target.value);}} required/>
      </div>

        <button class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          onClick={() => {
            handleComplaint();
          }}
        >
          Add Movie
        </button>
      </div>
          </>
        
        
    </div>
  )
}

export default AdminAddMovies