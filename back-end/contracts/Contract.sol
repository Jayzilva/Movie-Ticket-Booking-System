// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketM {

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
        string movieName;
        string movieImg;
        uint256 totalSeats;
        uint256 availableSeats;
        bool[] seats;
        bool isAvailable;
        
    }

    mapping(uint256 => Movie) public movies;
    uint256 public totalMovies;
    uint256 private nextMovieId = 1; // Initialize the next movie ID to 1

    event SeatsBooked(uint256 movieId, uint256 seatsBooked);

    function createMovie(string memory _movieName, string memory _movieImg) public onlyOwner {
        uint256 newMovieId = nextMovieId; // Get the next movie ID
        nextMovieId++; // Increment the next movie ID for the next movie

        Movie storage newMovie = movies[newMovieId];
        newMovie.id = newMovieId;
        newMovie.movieName = _movieName;
        newMovie.movieImg = _movieImg;
        newMovie.totalSeats = 20;
        newMovie.availableSeats = 20;

        newMovie.isAvailable = true; // Initialize the movie as available
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

    // View available movies
    function viewAvailableMovies() public view returns (Movie[] memory) {
        Movie[] memory availableMovies = new Movie[](totalMovies);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalMovies; i++) {
            if (movies[i].id != 0 && movies[i].isAvailable) {
                availableMovies[counter] = movies[i];
                counter++;
            }
        }
        return availableMovies;
    }

    // Book seats for a movie
    function bookSeats(uint256 movieId, uint256 numSeats) public onlyOwner {
        Movie storage movie = movies[movieId];
        require(movie.id != 0, "Movie does not exist");
        require(movie.isAvailable, "Movie is not available");
        require(numSeats > 0 && numSeats <= movie.availableSeats, "Invalid number of seats");
        
        for (uint256 i = 0; i < numSeats; i++) {
            movie.seats.push(true);
        }
        
        movie.availableSeats -= numSeats;
        
        if (movie.availableSeats == 0) {
            movie.isAvailable = false; // All seats have been booked
        }
        
        emit SeatsBooked(movieId, numSeats);
    }
}
