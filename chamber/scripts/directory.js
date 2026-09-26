// Hamburger menu toggle
const menuButton = document.querySelector('#menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    const isOpen = primaryNav.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isOpen);
});

// Dynamic footer year and last modified date
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

// Fetch and display chamber members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.companies);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(companies) {
    const memberList = document.querySelector('#member-list');
    if (!memberList) return;

    memberList.innerHTML = '';

    companies.forEach((company) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        const membershipNames = {
            1: 'Member',
            2: 'Silver Member',
            3: 'Gold Member'
        };

        card.innerHTML = `
            <img src="images/${company.image}" alt="${company.name} logo" loading="lazy">
            <h2>${company.name}</h2>
            <p>${company.address}</p>
            <p>${company.phone}</p>
            <a href="${company.website}" target="_blank" rel="noopener">Visit Website</a>
            <p class="membership-level level-${company.membershipLevel}">${membershipNames[company.membershipLevel]}</p>
        `;

        memberList.appendChild(card);
    });
}

const memberListSection = document.querySelector('#member-list');
if (memberListSection) {
    getMembers();
}

// Grid/List view toggle
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const memberSection = document.querySelector('#member-list');

if (gridBtn && listBtn && memberSection) {
    gridBtn.addEventListener('click', () => {
        memberSection.classList.remove('list-view');
        memberSection.classList.add('grid-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        memberSection.classList.remove('grid-view');
        memberSection.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

// Weather - OpenWeatherMap API
const apiKey = '94a05800548e43d58a4347479f503e3e';
const lat = -25.3431;
const lon = -57.5094;
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const currentDescription = document.querySelector('#current-description');
    const forecastEl = document.querySelector('#forecast');

    if (!currentTemp || !currentDescription || !forecastEl) return;

    // Current conditions (first item in the list)
    const current = data.list[0];
    currentTemp.textContent = `${Math.round(current.main.temp)}°C`;
    currentDescription.textContent = current.weather[0].description;

    // 3-day forecast (API gives data every 3 hours; take one entry per day, around midday)
    const days = ['Day 1', 'Day 2', 'Day 3'];
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastEl.innerHTML = '';
    dailyForecasts.forEach((day, index) => {
        const dayCard = document.createElement('div');
        dayCard.classList.add('forecast-day');
        dayCard.innerHTML = `
            <p class="forecast-label">${days[index]}</p>
            <p class="forecast-temp">${Math.round(day.main.temp)}°C</p>
        `;
        forecastEl.appendChild(dayCard);
    });
}

getWeather();

// Company Spotlight
async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displaySpotlights(data.companies);
    } catch (error) {
        console.error('Error fetching spotlight data:', error);
    }
}

function displaySpotlights(companies) {
    const spotlightContainer = document.querySelector('#spotlight-cards');
    if (!spotlightContainer) return;

    // Only Gold (3) and Silver (2) members qualify
    const eligible = companies.filter(company => company.membershipLevel === 2 || company.membershipLevel === 3);

    // Shuffle and pick 3 (or fewer if not enough eligible members)
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const membershipNames = {
        2: 'Silver Member',
        3: 'Gold Member'
    };

    spotlightContainer.innerHTML = '';
    selected.forEach((company) => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img src="images/${company.image}" alt="${company.name} logo" loading="lazy">
            <h3>${company.name}</h3>
            <p>${company.address}</p>
            <p>${company.phone}</p>
            <a href="${company.website}" target="_blank" rel="noopener">Visit Website</a>
            <p class="membership-level level-${company.membershipLevel}">${membershipNames[company.membershipLevel]}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

const spotlightSection = document.querySelector('#spotlight-cards');
if (spotlightSection) {
    getSpotlights();
}