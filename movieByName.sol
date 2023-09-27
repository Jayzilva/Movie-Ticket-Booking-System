// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketBooking {

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
        uint256 seatCount; 
        uint256 availableSeatCount;
        bool[] seats;
        bool isAvailable;
        mapping(address => uint256) ticketsBooked;
    }

    struct MovieInfo {
        uint256 id;
        string movieName;
        string movieImg;
        uint256 seatCount;
        uint256 availableSeatCount;
        bool isAvailable;
    }

    mapping(uint256 => Movie) public movies;
    uint256 public totalMovies;
    uint256 private nextMovieId = 1;

    event SeatsBooked(uint256 movieId, uint256 seatsBooked);
    event SeatBooked(uint256 movieId, uint256 seatNumber);

    function createMovie(string memory _movieName, string memory _movieImg) public onlyOwner {
        uint256 newMovieId = nextMovieId;
        nextMovieId++;

        Movie storage newMovie = movies[newMovieId];
        newMovie.id = newMovieId;
        newMovie.movieName = _movieName;
        newMovie.movieImg = _movieImg;
        newMovie.seatCount = 20;
        newMovie.seats = new bool[](20);
        newMovie.availableSeatCount = 20;
        newMovie.isAvailable = true;
        totalMovies++;
    }

    function viewMovies() public view returns (MovieInfo[] memory) {
        MovieInfo[] memory allMovies = new MovieInfo[](totalMovies);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalMovies; i++) {
            if (movies[i].id != 0) {
                allMovies[counter] = MovieInfo({
                    id: movies[i].id,
                    movieName: movies[i].movieName,
                    movieImg: movies[i].movieImg,
                    seatCount: movies[i].seatCount,
                    availableSeatCount: movies[i].availableSeatCount,
                    isAvailable: movies[i].isAvailable
                });
                counter++;
            }
        }
        return allMovies;
    }


    
    function bookSeat(uint256 _movieId, uint256 _seatNumber) public {
        require(_movieId != 0, "Movie does not exist");
        Movie storage movie = movies[_movieId];

        require(movie.isAvailable, "Movie is not available for booking");
        require(_seatNumber > 0 && _seatNumber <= movie.seatCount, "Invalid seat number");
        require(!movie.seats[_seatNumber - 1], "Seat is already booked");
        require(movie.ticketsBooked[msg.sender] < 5, "You can't book more than 5 tickets for this movie");

        movie.seats[_seatNumber - 1] = true;
        movie.availableSeatCount--;
        movie.ticketsBooked[msg.sender]++;

        if (_allSeatsBooked(_movieId)) {
            movie.isAvailable = false;
        }

        emit SeatBooked(_movieId, _seatNumber);
    }

    function _allSeatsBooked(uint256 _movieId) internal view returns (bool) {
        Movie storage movie = movies[_movieId];
        for (uint256 i = 0; i < movie.seatCount; i++) {
            if (!movie.seats[i]) {
                return false;
            }
        }
        return true;
    }

    function isSeatAvailable(uint256 _movieId, uint256 _seatNumber) public view returns (bool) {
        require(_movieId != 0, "Movie does not exist");
        Movie storage movie = movies[_movieId];

        if (movie.isAvailable && !movie.seats[_seatNumber - 1]) {
            return true;
        }

        return false;
    }

    function getAvailableSeats(uint256 _movieId) public view returns (uint256[] memory) {
        require(_movieId != 0, "Movie does not exist");
        Movie storage movie = movies[_movieId];

        uint256[] memory availableSeats = new uint256[](movie.seatCount);
        uint256 count = 0;

        for (uint256 i = 0; i < movie.seatCount; i++) {
            if (!movie.seats[i]) {
                availableSeats[count] = i + 1;
                count++;
            }
        }

        assembly {
            mstore(availableSeats, count)
        }

        return availableSeats;
    }
}
