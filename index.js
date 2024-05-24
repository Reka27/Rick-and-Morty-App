console.clear();
import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchForm = document.querySelector('[data-js="search-form"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let currPage = 1;
let maxPage = 1;
let searchQuery = "";

// Fetching the data
async function fetchCharacters(pageIndex, searchQuery = "") {
  const url = `https://rickandmortyapi.com/api/character?page=${pageIndex}&name=${searchQuery}`;
  const response = await fetch(url);
  const data = await response.json();
  cardContainer.innerHTML = "";

  CharacterCard(data.results);

  maxPage = data.info.pages;
  pagination.textContent = `${currPage} / ${maxPage}`;
  return data;
}

// Event Listeners for navigation
nextButton.addEventListener("click", () => {
  if (currPage < maxPage) {
    currPage++;
    fetchCharacters(currPage);
  }
});

prevButton.addEventListener("click", () => {
  if (currPage > 1) {
    currPage--;
    fetchCharacters(currPage);
  }
});
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.value;
  currPage = 1;
  fetchCharacters(currPage, searchQuery);
});

// Initial Fetch
fetchCharacters(currPage);
