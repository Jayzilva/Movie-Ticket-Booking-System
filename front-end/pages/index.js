import { useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import Link from 'next/link';
import React, { useState } from 'react';
import UserLayout from '../components/UserLayout';



export default function Home() {
  const address = useAddress();
  const contractAdd ="0x8105589c0658cD725Dc8067A6001059D94f31deA";
  const { contract } = useContract(contractAdd);
  const [id, setId] = useState(0);
  const [modelno, setModelNo] = useState("");
  const { data: Sneakers } = useContractRead(contract, "Sneakers", id);



  return(

    <div className="h-600 border-b-2 border-blue-500">

      <div class="bg-gradient-to-r from-cyan-500 to-blue-500">
      <UserLayout/>
        
      </div>
      <div class="flex justify-center bg-gradient-to-r from-cyan-500 to-blue-500 ">
        <div class="shadow-2xl p-5 m-20 bg-gradient-to-r from-cyan-500 to-blue-550">
          <h1 class="text-4xl font-bold m-10">Verify Your Product Here</h1>

      
          <div>
          <div className="detailBox" >
      {Sneakers && Sneakers.id == id &&Sneakers.modelno == modelno &&(
        
                <div class="max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
                  <p class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50  dark:text-green-400 dark:border-green-800">Product is verified!</p>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                   

                    
                
            

                    </table>
                    
                </div>
            )}
          {Sneakers &&  Sneakers.id !== id &&Sneakers.modelno !== modelno && (
            <div className="error-container">
              <p class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:text-red-400 dark:border-red-800">Product not found.</p>
            </div>
            )}
    </div>
          </div>
        </div>
        
      </div>

      <hr/>


      <footer class=" shadow dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">Shoozy™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
        <Link href="/AdminAddMovies">
          <button class="mr-4 hover:underline md:mr-6">Manifacture</button>
        </Link>
        </li>
        <li>

        
        </li>

    </ul>
    </div>
</footer>
</div>

  )
}