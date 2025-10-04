document.addEventListener('DOMContentLoaded', () => {
    const teamGrid = document.getElementById('teamGrid');

    async function fetchTeamData() {
        try {
            const response = await fetch('data/team.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const teamMembers = await response.json();
            displayTeamMembers(teamMembers);
        } catch (error) {
            console.error('Erro ao carregar dados da equipe:', error);
            if (teamGrid) {
                teamGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Falha ao carregar informações da equipe. Por favor, tente novamente mais tarde.</p>';
            }
        }
    }

    function displayTeamMembers(members) {
        if (!teamGrid) return;
        
        teamGrid.innerHTML = '';

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

    fetchTeamData();
});