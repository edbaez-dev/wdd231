import { places } from '../data/discover.mjs';

const cardContainer = document.querySelector('#discover-cards');

function displayPlaces(placeList) {
    placeList.forEach((place) => {
        const card = document.createElement('section');
        card.classList.add('card');

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}" alt="Image representing ${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button">Learn More</button>
        `;

        cardContainer.appendChild(card);
    });
}

displayPlaces(places);