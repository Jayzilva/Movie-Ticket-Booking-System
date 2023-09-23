// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ticket {

    address public owner;

    constructor() {
        owner = msg.sender; 
    }
    
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of this smart contract"
        );
        _;
    }

    struct ticket {
        uint256 id;
        address sneakerRegisteredBy;
        string movieName;
        uint256 seats;
        bool availability;
        uint256 blockNumber;
    }

    mapping(uint256 => ticket) public Tickets;
    uint256 public totalSneakers;

    /*
        event sneakerFiled(
        uint256 id,
        address sneakerRegisteredBy,
        string modelno,
        string color,
        string size
        
    );
    */

    function fileSneaker(uint256 _id, string memory _movieName, uint256 _seats ) public onlyOwner
    {
        require(Tickets[_id].id == 0, "Id is already used");
        ticket storage newTicket = Tickets[_id];
        newTicket.id = _id;
        newTicket.sneakerRegisteredBy = msg.sender;
        newTicket.movieName = _movieName;
        newTicket.seats = _seats;
        newTicket.availability = true;
        newTicket.blockNumber = block.number;

        totalSneakers++;
        //emit sneakerFiled(_id, msg.sender, _movieName, _seats);
        
    }

    function viewMovies() public view returns (ticket[] memory) {
        ticket[] memory allSneakers = new ticket[](totalSneakers);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalSneakers; i++) {
            if (Tickets[i].id != 0) {
                allSneakers[counter] = Tickets[i];
                counter++;
            }
        }
        return allSneakers;
    }

}