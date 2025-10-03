getPlaces();
handleVisitorMessage();


// Fetching and displaying places from places.json
const container = document.getElementById("places");

async function getPlaces() {
    try {
        const answer = await fetch("data/places.json");

        if (!answer.ok) {
            throw new Error(
                "Error while trying to get the file: " + answer.status
            );
        }

        const data = await answer.json();

        data.forEach((place,index) => {
            const div = document.createElement("div");
            div.classList.add("place");

            // Prioritize the first image (LCP) and lazy load the rest.
            const isFirstImage = index === 0;
            const imgAttributes = isFirstImage 
                ? `fetchpriority="high"` 
                : `loading="lazy"`;

            div.innerHTML = `
                <h2>${place.name}</h2>
                    <figure>
                        <img src="${place.imageUrl}" alt="Image of ${place.name}" ${imgAttributes}  width="300" height="200" onerror="this.onerror=null;this.src='https://placehold.co/300x200/09622e/eaecee?text=Image+Not+Found';">
                    </figure>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <button>Learn More</button>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        console.error("Issue", erro);
        placesContainer.innerHTML = `<p style="text-align: center; color: red;">Could not load places data.</p>`;
    }
}


// --- Visitor Message Script ---
function handleVisitorMessage() {
    const messageElement = document.getElementById('visitor-message');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysDifference = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            message = 'Back so soon! Awesome!';
        } else if (daysDifference === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    messageElement.textContent = message;
    localStorage.setItem('lastVisit', now.toString());

}
