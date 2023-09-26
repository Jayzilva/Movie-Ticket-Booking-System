// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketX {

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

    struct Movie {
        uint256 id;
        address sneakerRegisteredBy;
        string movieName;
        uint256 totalSeats;
        uint256 availableSeats;
        bool[] seats;
        bool isAvailable;
        uint256 blockNumber;
    }

    mapping(uint256 => Movie) public movies;
    uint256 public totalMovies;
    uint256 private nextMovieId = 1; // Initialize the next movie ID to 1

    event SeatsBooked(uint256 movieId, uint256 seatsBooked);

    function createMovie(string memory _movieName) public onlyOwner {
        uint256 newMovieId = nextMovieId; // Get the next movie ID
        nextMovieId++; // Increment the next movie ID for the next movie

        Movie storage newMovie = movies[newMovieId];
        newMovie.id = newMovieId;
        newMovie.sneakerRegisteredBy = msg.sender;
        newMovie.movieName = _movieName;
        newMovie.totalSeats = 20;
        newMovie.availableSeats = 20;
        newMovie.blockNumber = block.number;
        totalMovies++;
    }

    // View movies with details
    function viewMovies() public view returns (Movie[] memory) {
        Movie[] memory allMovies = new Movie[](totalMovies);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalMovies; i++) {
            if (movies[i].id != 0) {
                allMovies[counter] = movies[i];
                counter++;
            }
        }
        return allMovies;
    }
}
