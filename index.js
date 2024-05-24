const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let currentPage = 1;
let searchQuery = "";

// Import JS&Urls
import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const url = "https://rickandmortyapi.com/api/character";

// Function to fetch character data and generate cards
async function fetchCharacters(page = 1) {
  try {
    // Updated URL with searchQuery
    const searchParam = searchQuery
      ? `&name=${encodeURIComponent(searchQuery)}`
      : "";
    const response = await fetch(`${url}?page=${page}${searchParam}`);
    const data = await response.json();
    const characters = data.results;

    // Update maxPage based on the API response
    maxPage = data.info.pages;

    // Clear any existing content in the container
    cardContainer.innerHTML = "";

    // Loop through each character and create a card
    characters.forEach((character) => {
      const characterCard = CharacterCard({
        image: character.image,
        name: character.name,
        status: character.status,
        type: character.type,
        occurrences: character.episode.length,
      });

      // Append the character card to the container
      cardContainer.appendChild(characterCard);
    });

    // Update pagination display
    updatePaginationDisplay();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Function to update pagination display
function updatePaginationDisplay() {
  pagination.textContent = `${currentPage} / ${maxPage}`;
}

// Event listener for search bar submit
searchBar.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  searchQuery = searchBar.querySelector(".search-bar__input").value;
  fetchCharacters(); // Fetch characters with updated search query
});

// Event listeners for pagination buttons
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < maxPage) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

// Call the fetchCharacters function to load the character cards
fetchCharacters(currentPage);
