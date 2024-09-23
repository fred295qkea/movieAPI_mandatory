"use strict"

const playing = document.querySelector(".playing")
const popular = document.querySelector(".popular")
const rated = document.querySelector(".rated")
const upcoming = document.querySelector(".upcoming")

const playingFetch = "now_playing?language=en-US&page=1"
const popularFetch = "popular?language=en-US&page=1"
const ratedFetch = "top_rated?language=en-US&page=1"
const upcomingFetch = "upcoming?language=en-US&page=1"

let currentFetch = playingFetch

window.addEventListener("load", getData)

playing.addEventListener("click", () =>{
  currentFetch = playingFetch
  getData()
})
popular.addEventListener("click", () =>{
  currentFetch = popularFetch
  getData()
})
rated.addEventListener("click", () =>{
  currentFetch = ratedFetch
  getData()
})
upcoming.addEventListener("click", () =>{
  currentFetch = upcomingFetch
  getData()
})

function getData(){
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmIwZDBlNzFjMDY0OGY4YTBlOGQ2MDNmYWMzMzNhNSIsIm5iZiI6MTcyNzAzMjEzNi43MjM0MzcsInN1YiI6IjY2ZjA2MzUyNmMzYjdhOGQ2NDhkOGQ2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UiGMx7BKkr1MrikwCMETNsnp1uo2GrNvSS76Mxw3XhU'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${currentFetch}`, options)
  .then(response => response.json())
  .then(response => createSite(response))
  .catch(err => console.error(err));

}

function createSite(data){
  console.log(data)

  document.querySelector(".movie_section").innerHTML = ""

  data.results.forEach(movie => {
    console.log(movie)

    const template = `
    <div class="movie">
    <h2>${movie.original_title}</h2>
      <div class="movie_content">
        <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
        <div class="movie_desc">
          <p>${movie.overview}</p>
          <p>Released: ${movie.release_date}</p>
          <p>Rating: ${movie.vote_average}</p>
        </div>
      </div>
    </div>
    `

    document.querySelector(".movie_section").innerHTML += template;

  });

}