const url = "data/members.json";
const spotlightSection = document.querySelector("#spotlight-cards");



async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();

    displayCompanies(data);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayCompanies(members) {
    spotlightSection.innerHTML = ""; // clear previous content

    // filter gold (3) or silver (2) members based on their string value
    const eliteMembers = members.filter(member => {
        return member.membershipLevel === "Gold" || member.membershipLevel === "Silver";
    });

    // shuffle and pick exactly 3
    const spotlightMembers = shuffle(eliteMembers).slice(0, 3);

    // create spotlight cards
    spotlightMembers.forEach(member => {
        const container = document.createElement("div");
        container.classList.add("spotlight-container"); // optional for styling

        const card = document.createElement("div");
        card.classList.add("spotlight-card");
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="spotlight-logo">
            <h3>${member.name}</h3>
            <p><strong>Membership:</strong> ${member.membershipLevel}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;

        container.appendChild(card);
        spotlightSection.appendChild(container);
    });
}

// initialize
getCompanyData();