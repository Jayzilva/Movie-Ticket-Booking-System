import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractData,
  Web3Button,
} from "@thirdweb-dev/react";
import { useState } from "react";

function AdminViewMovies() {
  const address = useAddress();
  const contractAddress = "0x458B5d00507FE04a623D3Fbb6893f0A675f1E869";
  const [input, setInput] = useState("");
  const { contract } = useContract(contractAddress);
  //const { data, isLoading } = useContractData(contract, "getTodo");



  return (
    <div>
      
      <div >
      
        <>
          <div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter todo"
            />

            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call("createMovie", input)}
              accentColor="#1ce"
            >
              Set Todo
            </Web3Button>
          </div>

        </>
             
            </div>
    </div>
  );
}

export default AdminViewMovies;
