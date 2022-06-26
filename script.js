/* Variables in use for code */
let filteredMovies = [];
let newLi = [];
let newImg = [];
let newAnchor = [];
let movieTitle = [];
let removableItems = [];

/* Store movie list ul tag, radio buttons and search input tags */
const movieListContainer = document.getElementById("movie-finder-list");
const movieFilters = Array.from(document.getElementsByClassName("filter-btn"));
const movieSearch = document.getElementById("movie-search");

/* Creating the new elements to be added to DOM */
const createElements = function (item) {
  console.log("Attempting to create new elements...");
  newLi = document.createElement("li");
  newImg = document.createElement("img");
  newImg.src = item.poster;
  newAnchor = document.createElement("a");
  newAnchor.href = "https://www.imdb.com/title/" + item.imdbID;
  newAnchor.target = "_blank";
};

/* Adding the new elements into the DOM based on parsed array */
const addMoviesToDom = function (movieList) {
  console.log("Adding new elements to display in DOM...");
  movieList.forEach(function (item) {
    createElements(item);
    newAnchor.appendChild(newImg);
    newLi.appendChild(newAnchor);
    movieListContainer.appendChild(newLi);
  });
  console.log(`Added ${movieList.length} items to the DOM...`);
};

/* Remove existing li tags inside movie-finder-list from DOM */
const removeMoviesFromDom = function () {
  removableItems = movieListContainer.querySelectorAll("li");
  console.log(`Removing ${removableItems.length} items.`);
  removableItems.forEach(function (item) {
    movieListContainer.removeChild(item);
  });
};

/* Filter movies based on parsed input */
const filterMovies = function (wordInMovie) {
  const filtered = movies.filter(function (movies) {
    /* Filter for button with specified name and search engine */
    if (wordInMovie !== "newest") {
      return movies.title.toLowerCase().includes(wordInMovie.toLowerCase());
      /* Filter for latest movies */
    } else {
      return Number(movies.year) >= 2014;
    }
  });
  return filtered;
};

/*  Function to fire when a radio button is selected,
    or a search input has been given */
const handleOnChangeEvent = function (e) {
  removeMoviesFromDom();
  console.log(`Filtering database on ${e.target.value} keyword`);
  filteredMovies = filterMovies(e.target.value);
  console.log(
    `Filtered ${filteredMovies.length} items matching the ${e.target.value} keyword.`
  );
  addMoviesToDom(filteredMovies);
};

/* Add event listeners to radio buttons and search input */
const addEventListeners = function () {
  /* radio buttons */
  movieFilters.forEach(function (button) {
    button.addEventListener("change", function () {
      console.log(`You've pressed ${button.value}`);
      handleOnChangeEvent(event);
    });
  });
  /* search bar */
  movieSearch.addEventListener("search", function () {
    console.log(`Searching for ${event.target.value}`);
    handleOnChangeEvent(event);
  });
};

/* Initial setup for movie poster displays */
addMoviesToDom(movies);

/* Setup the event listeners */
addEventListeners();
