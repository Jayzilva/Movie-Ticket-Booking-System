import AdminLayout from '../components/AdminLayout';
import {
  useAddress,
  useContract,
  useContractWrite,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';

function AdminViewMovies() {
  const address = useAddress();
  const contractAddress = "0xA8C8351629a552360DF78bDE732Cfa5dfb012617";
  const { contract } = useContract(contractAddress);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "fcreateMovie", // Assuming "fcreateMovie" is the function name
  );
  const { data: viewMovies } = useContractRead(contract, "viewMovies");
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const handleCreateMovie = async () => {
    try {
      const data = await mutateAsync([id, name]); // Pass id and name as an array to mutateAsync

      alert(`Movie Created`);
      console.info("contract call success", data);
    } catch (err) {
      const errorMessage = err.message.match(/Reason: (.*)/);
      alert(errorMessage);
      console.error("contract call failure", err);
    }
  };

  useEffect(() => {
    if (viewMovies) {
      setMovies(viewMovies);
    }
  }, [viewMovies]);

  return (
    <div>
      <AdminLayout />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-1">
        {/* ... Table rendering code ... */}
      </div>
      <hr />
      <h1 className="text-4xl font-bold">Create Movie</h1>
      <br />
      <div className="mb-6">
        <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">
          Movie ID
        </label>
        <input
          type="text"
          placeholder="ID"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => {
            setId(e.target.value);
          }}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Movie Name
        </label>
        <input
          type="text"
          placeholder="Name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </div>
      <hr />
      <Web3Button
        contractAddress={contractAddress}
        // Calls the "fcreateMovie" function on your smart contract with [id, name] as an array
        action={handleCreateMovie}
      >
        Create Movie
      </Web3Button>
    </div>
  );
}

export default AdminViewMovies;
