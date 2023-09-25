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

    // Mapping to associate movie names with movie IDs
    mapping(string => uint256) private movieNameToId;

    // Event to notify when a seat is booked
    event SeatBooked(uint256 movieId, uint256 seatNumber);

    // Function to create a new movie
    function createMovie(uint256 _id, string memory _name) public {
        require(_id > 0, "Movie ID must be greater than 0");
        require(bytes(_name).length > 0, "Movie name cannot be empty");

        // Check if the movie name already exists
        require(movieNameToId[_name] == 0, "Movie with this name already exists");

        Movie memory newMovie = Movie({
            id: _id,
            name: _name,
            seatCount: 5, // Default seat count
            seats: new bool[](20), // Initialize an array of seats with the default count
            isAvailable: true
        });

        movies.push(newMovie);
        movieNameToId[_name] = movies.length; // Store the movie ID by name
    }

    // Function to book a seat in a movie based on the movie name
    function bookSeat(string memory _movieName, uint256 _seatNumber) public {
        // Check if the movie name exists in the mapping
        require(movieNameToId[_movieName] > 0, "Movie with the given name does not exist");
        uint256 movieId = movieNameToId[_movieName] - 1; // Subtract 1 to get the correct movie index

        Movie storage movie = movies[movieId];

        require(movie.isAvailable, "Movie is not available for booking");
        require(_seatNumber > 0 && _seatNumber <= movie.seatCount, "Invalid seat number");
        require(!movie.seats[_seatNumber - 1], "Seat is already booked");

        movie.seats[_seatNumber - 1] = true;

        // Check if all seats are booked
        if (_allSeatsBooked(movieId)) {
            movie.isAvailable = false;
        }

        emit SeatBooked(movieId, _seatNumber);
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

    // Function to check if a seat is available in a movie based on the movie name
    function isSeatAvailable(string memory _movieName, uint256 _seatNumber) public view returns (bool) {
        // Check if the movie name exists in the mapping
        if (movieNameToId[_movieName] == 0) {
            return false;
        }
        uint256 movieId = movieNameToId[_movieName] - 1; // Subtract 1 to get the correct movie index
        Movie storage movie = movies[movieId];

        if (movie.isAvailable && !movie.seats[_seatNumber - 1]) {
            return true;
        }

        return false;
    }

    // Function to get the seat numbers that are available in a movie based on the movie name
    function getAvailableSeats(string memory _movieName) public view returns (uint256[] memory) {
        // Check if the movie name exists in the mapping
        if (movieNameToId[_movieName] == 0) {
            return new uint256[](0);
        }
        uint256 movieId = movieNameToId[_movieName] - 1; // Subtract 1 to get the correct movie index
        Movie storage movie = movies[movieId];

        uint256[] memory availableSeats = new uint256[](movie.seatCount);
        uint256 count = 0;

        for (uint256 i = 0; i < movie.seatCount; i++) {
            if (!movie.seats[i]) {
                availableSeats[count] = i + 1; // Seat numbers start from 1
                count++;
            }
        }

        // Resize the array to remove any unused slots
        assembly {
            mstore(availableSeats, count)
        }

        return availableSeats;
    }
}
