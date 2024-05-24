export default function CharacterCard(characterData) {
  const cardContainer = document.querySelector("[data-js='card-container']");
  const firstTwenty = characterData.slice(0, 20);
  firstTwenty.forEach((character) => {
    const {
      name: charName,
      type: charType,
      status: charStatus,
      image: charImage,
      ...rest
    } = character;
    const newCard = document.createElement("li");
    newCard.classList.add("card");
    newCard.innerHTML = `<div class="card__image-container">
      <img
        class="card__image"
        src="${charImage}"
        alt="${charName}"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">${charName}</h2>
      <dl class="card__info">
        <dt class="card__info-title">${charStatus}</dt>
        <dd class="card__info-description">Alive</dd>
        <dt class="card__info-title">${charType}</dt>
        <dd class="card__info-description"></dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">51</dd>
      </dl>
    </div>`;
    cardContainer.append(newCard);
    //return newCard;
  });
}
