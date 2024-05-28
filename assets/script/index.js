'use strict';

import * as utils from "./utils.js";
import movies from "./moviedata.js";

// Variables 

const searchInput = utils.select('.input');
const movieDetails = utils.select('.movie-details');
const searchButton = utils.select('.search-button');
const movieBox = utils.select('.movie-box');
const dropdown = utils.select('.dropdown');
const movieImage = utils.select('.movie-image');
const movieTitle = utils.select('.movie-title');
const movieTime = utils.select('.duration');
const movieDescription = utils.select('.movie-description');
const genre = utils.select('.genre');



// Functions

function displayDropdown(movies) {
    dropdown.innerHTML = '';
    
    if (movies.length > 0) {
        movies.forEach(movie => {
            const display = document.createElement('div');
            display.classList.add('dropdown-item');
            display.textContent = movie.title;
            display.addEventListener('click', () => {
                searchInput.value = movie.title;
                clearDropdown();
            });
            dropdown.appendChild(display);
        });
        dropdown.style.display = 'block';
    } else {
        clearDropdown();
    }
}

function displayMovieDetails(movie) {

    movieTitle.textContent = movie.title;
    movieTime.textContent = `${movie.runningTime} | ${movie.year}`;
    movieDescription.textContent = movie.description;
    genre.textContent = movie.genre.join(', ');

    movieImage.src = movie.poster;
    movieImage.style.display = 'block';

    movieDetails.style.display = 'block';
}

function clearMovieDetails() {
    movieTitle.textContent = '';
    movieTime.textContent = '';
    movieDescription.textContent = '';
    genre.textContent = '';

    movieImage.style.display = 'none';
    movieDetails.style.display = 'none';
}

function clearDropdown() {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
}

function addBlurEffect() {
    movieBox.classList.add('blur-effect');
}

function removeBlurEffect() {
    movieBox.classList.remove('blur-effect');
}

// Events

utils.onEvent('click', searchButton, function() {
    const userInput = searchInput.value.trim().toLowerCase();
    const movie = movies.find(movie => movie.title.toLowerCase() === userInput);

    if (movie) {
        displayMovieDetails(movie);
        removeBlurEffect();
    }
    else {
        clearMovieDetails();
        searchInput.textContent = 'Movie not found. Try again';
    }
});

utils.onEvent('input', searchInput, () => {
    const userInput = searchInput.value.trim().toLowerCase();

    if (userInput.length >= 4) {
        const filterMovies = movies.filter(movie => movie.title.toLowerCase().includes(userInput));
        displayDropdown(filterMovies);
        addBlurEffect();
    }
    else {
        clearDropdown();
        removeBlurEffect();
    }
});
