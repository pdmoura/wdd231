// Import the function from the module
import { fetchData } from './data-fetcher.js';


document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('teamGrid');
    const TEAM_DATA_URL = 'data/team.json'; // Defining the data URL

    // Function to create and display team member cards
    function displayTeamMembers(members) {
        if (!teamGrid) return;
        
        teamGrid.innerHTML = ''; // Clear existing content

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('team-member-card');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="title">${member.title}</p>
                <p>${member.description}</p>
            `;
            teamGrid.appendChild(card);
        });
    }
    
    // Fetch team data from JSON file
    async function loadTeam() {
        const teamMembers = await fetchData(TEAM_DATA_URL);

        if (teamMembers) {
            // If data is successfully fetched, display it
            displayTeamMembers(teamMembers);
        } else {
            // Otherwise if fetchData returned null (due to an error), show an error message
            if (teamGrid) {
                teamGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Failed to load team information. Please try again later.</p>';
            }
        }
    }

    loadTeam();
});