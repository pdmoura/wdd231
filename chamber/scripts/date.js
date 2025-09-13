//population

const container = document.getElementById('members');

async function getMember() {
    try {
        const answer = await fetch('data/members.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const data = await answer.json();

        data.forEach(member => {
            const div = document.createElement('div');
            div.classList.add('member');

            div.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3 id="name">${member.name}</h3>
            <p><strong>Level:</strong> ${member.membershipLevel}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Adress:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" class="links">${member.website}</a></p>
            <p> ${member.description}</p>
            `;

            container.appendChild(div);
        });

    } catch (erro) {
        console.error("Issue", erro);
    }
}

getMember();

//second menu

const gridbtn = document.querySelector('#grid');
const listbtn = document.querySelector('#list');

gridbtn.addEventListener('click', () => {
    container.classList.add('grid');
    container.classList.remove('list');
});

listbtn.addEventListener('click', () => {
    container.classList.add('list');
    container.classList.remove('grid');
})