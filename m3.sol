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

    // Struct to represent user ticket booking information
    struct UserBooking {
        address userAddress;
        uint256[] bookedSeats;
    }

    // Array to store the movies
    Movie[] public movies;

    // Mapping to track the number of tickets booked by each user
    mapping(address => uint256) public userTicketCount;

    // Mapping to store user booking information
    mapping(address => UserBooking) public userBookings;

    // Event to notify when a seat is booked
    event SeatBooked(address userAddress, uint256 movieId, uint256 seatNumber);

    // Function to create a new movie
    function createMovie(uint256 _id, string memory _name) public {
        require(_id > 0, "Movie ID must be greater than 0");
        require(bytes(_name).length > 0, "Movie name cannot be empty");

        Movie memory newMovie = Movie({
            id: _id,
            name: _name,
            seatCount: 20, // Default seat count
            seats: new bool[](20), // Initialize an array of seats with the default count
            isAvailable: true
        });

        movies.push(newMovie);
    }

    // Function to book multiple seats in a movie
    function bookSeats(uint256 _movieId, uint256[] memory _seatNumbers) public {
        require(_movieId < movies.length, "Movie with the given ID does not exist");
        Movie storage movie = movies[_movieId];
        address userAddress = msg.sender;

        require(movie.isAvailable, "Movie is not available for booking");
        require(_seatNumbers.length > 0, "No seat numbers provided");
        require(userTicketCount[userAddress] + _seatNumbers.length <= 5, "You can book a maximum of 5 tickets");

        for (uint256 i = 0; i < _seatNumbers.length; i++) {
            uint256 seatNumber = _seatNumbers[i];
            require(seatNumber > 0 && seatNumber <= movie.seatCount, "Invalid seat number");
            require(!movie.seats[seatNumber - 1], "Seat is already booked");
            movie.seats[seatNumber - 1] = true;

            // Record the booking information for the user
            userBookings[userAddress].userAddress = userAddress;
            userBookings[userAddress].bookedSeats.push(seatNumber);

            emit SeatBooked(userAddress, _movieId, seatNumber);
        }

        userTicketCount[userAddress] += _seatNumbers.length;

        // Check if all seats are booked
        if (_allSeatsBooked(_movieId)) {
            movie.isAvailable = false;
        }
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

    // Function to get the seat numbers that are available in a movie
    function getAvailableSeats(uint256 _movieId) public view returns (uint256[] memory) {
        require(_movieId < movies.length, "Movie with the given ID does not exist");
        Movie storage movie = movies[_movieId];

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

    // Function to get the booked seats of a user
    function getUserBookedSeats(address _userAddress) public view returns (uint256[] memory) {
        return userBookings[_userAddress].bookedSeats;
    }
}
