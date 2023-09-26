// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketX {

    address public owner;
    string public name;

    constructor() {
        owner = msg.sender; 
        name = "";
    }
    
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of this smart contract"
        );
        _;
    }

    struct movie {
        uint256 id;
        address sneakerRegisteredBy;
        string movieName;
        uint256 seats;
        bool availability;
        uint256 blockNumber;
    }

    mapping(uint256 => movie) public Movies;
    uint256 public totalMovies;

    /*
        event sneakerFiled(
        uint256 id,
        address sneakerRegisteredBy,
        string modelno,
        string color,
        string size
        
    );
    */

    function fcreateMovie(uint256 _id, string memory _movieName) public onlyOwner
    {
        require(Movies[_id].id == 0, "Id is already used");
        movie storage newTicket = Movies[_id];
        newTicket.id = _id;
        newTicket.sneakerRegisteredBy = msg.sender;
        newTicket.movieName = _movieName;
        newTicket.seats = 20;
        newTicket.availability = true;
        newTicket.blockNumber = block.number;

        totalMovies++;
        //emit sneakerFiled(_id, msg.sender, _movieName, _seats);
        
    }

    function viewMovies() public view returns (movie[] memory) {
        movie[] memory allMovies = new movie[](totalMovies);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalMovies; i++) {
            if (Movies[i].id != 0) {
                allMovies[counter] = Movies[i];
                counter++;
            }
        }
        return allMovies;
    }




    function setName(string memory _newName) public {
        name = _newName;
    }

}