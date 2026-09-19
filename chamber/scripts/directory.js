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

getMembers();

// Grid/List view toggle
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const memberSection = document.querySelector('#member-list');

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