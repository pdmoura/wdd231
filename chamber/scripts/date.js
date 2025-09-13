//population

const container = document.getElementById('members');

async function getMember() {
    try {
        const answer = await fetch('data/members.json');

        if (!answer.ok) {
            throw new Error('Error while trying to get the file: ' + answer.status);
        }

        const data = await answer.json();

        // Use the 'index' from forEach to track the position of each member
        data.forEach((member, index) => {
            const div = document.createElement('div');
            div.classList.add('member');

            let imgTag; // Create a variable to hold the image tag

            // Check if the image is one of the first 6 (index 0-5)
            if (index < 6) {
                // First 6 images: Eager loading with high priority
                imgTag = `<img src="${member.image}" alt="${member.name}" width="170" height="170" fetchpriority="high">`;
            } else {
                // 7th image and beyond: Lazy loading
                imgTag = `<img src="${member.image}" alt="${member.name}" width="170" height="170" loading="lazy">`;
            }

            // Use the generated imgTag in your innerHTML
            div.innerHTML = `
                ${imgTag}
                <h3 class="name">${member.name}</h3>
                <p><strong>Level:</strong> ${member.membershipLevel}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" class="links" target="_blank">${member.website}</a></p>
                <p>${member.description}</p>
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