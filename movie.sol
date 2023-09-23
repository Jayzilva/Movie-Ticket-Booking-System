// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MovieBooking {
    // Struct to represent a movie
    struct Movie {
        uint256 id;
        string name;
        uint256 seatCount;
        bool[] seats;
        bool isAvailable;
    }

    // Array to store the movies
    Movie[] public movies;

    // Event to notify when a seat is booked
    event SeatBooked(uint256 movieId, uint256 seatNumber);

    // Function to create a new movie
    function createMovie(uint256 _id, string memory _name) public {
        require(_id > 0, "Movie ID must be greater than 0");
        require(bytes(_name).length > 0, "Movie name cannot be empty");

        Movie memory newMovie = Movie({
            id: _id,
            name: _name,
            seatCount: 5, // Default seat count
            seats: new bool[](20), // Initialize an array of seats with the default count
            isAvailable: true
        });

        movies.push(newMovie);
    }

    // Function to book a seat in a movie
    function bookSeat(uint256 _movieId, uint256 _seatNumber) public {
        require(_movieId < movies.length, "Movie with the given ID does not exist");
        Movie storage movie = movies[_movieId];

        require(movie.isAvailable, "Movie is not available for booking");
        require(_seatNumber > 0 && _seatNumber <= movie.seatCount, "Invalid seat number");
        require(!movie.seats[_seatNumber - 1], "Seat is already booked");

        movie.seats[_seatNumber - 1] = true;

        // Check if all seats are booked
        if (_allSeatsBooked(_movieId)) {
            movie.isAvailable = false;
        }

        emit SeatBooked(_movieId, _seatNumber);
    }

    // Function to check if all seats are booked in a movie
    function _allSeatsBooked(uint256 _movieId) internal view returns (bool) {
        Movie storage movie = movies[_movieId];
        for (uint256 i = 0; i < movie.seatCount; i++) {
            if (!movie.seats[i]) {
                return false;
            }
        }
        return true;
    }

    // Function to check if a seat is available in a movie
    function isSeatAvailable(uint256 _movieId, uint256 _seatNumber) public view returns (bool) {
        require(_movieId < movies.length, "Movie with the given ID does not exist");
        Movie storage movie = movies[_movieId];

        if (movie.isAvailable && !movie.seats[_seatNumber - 1]) {
            return true;
        }

        return false;
    }
}
