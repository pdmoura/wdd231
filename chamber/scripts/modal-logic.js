document.addEventListener('DOMContentLoaded', () => {
    // Data for membership levels
    const membershipLevels = {
        ml1Btn: {
            title: 'Non Profit Membership',
            details: `
                <p>Benefits include:</p>
                <ul style="list-style-position: inside; margin-left: 1rem;">
                    <li>A plaque with the mayor's stamp.</li>
                    <li>Opportunity to ride on a float during the Saint Patrick's Day parade.</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>COST:</strong> Free</p>
            `
        },
        ml2Btn: {
            title: 'Bronze Membership',
            details: `
                <p>Benefits include:</p>
                <ul style="list-style-position: inside; margin-left: 1rem;">
                    <li>Access to monthly networking events.</li>
                    <li>Listing in our online business directory.</li>
                    <li>Discounts on chamber events and workshops.</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>COST:</strong> $50/year</p>
            `
        },
        ml3Btn: {
            title: 'Silver Membership',
            details: `
                <p>All Bronze benefits, plus:</p>
                <ul style="list-style-position: inside; margin-left: 1rem;">
                    <li>Enhanced directory listing with logo and description.</li>
                    <li>Opportunity to host one "Business After Hours" event.</li>
                    <li>Two complimentary tickets to the Annual Gala.</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>COST:</strong> $100/year</p>
            `
        },
        ml4Btn: {
            title: 'Gold Membership',
            details: `
                <p>All Silver benefits, plus:</p>
                <ul style="list-style-position: inside; margin-left: 1rem;">
                    <li>Premier placement in the business directory.</li>
                    <li>Company logo featured on the chamber homepage.</li>
                    <li>A dedicated feature in our monthly newsletter.</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>COST:</strong> $250/year</p>
            `
        }
    };

    const modal = document.querySelector('#mlModal');
    const modalTitle = document.querySelector('#mltitle');
    const modalDetails = document.querySelector('#mldetails');
    const closeModalBtn = document.querySelector('#closeModal');
    const body = document.body;

    // Check if all required modal elements are present
    if (!modal || !modalTitle || !modalDetails || !closeModalBtn) {
        console.error('Modal elements not found. Please check your HTML structure.');
        return;
    }

    // Function to open the modal
    const openModal = (levelId) => {
        const levelData = membershipLevels[levelId];
        if (levelData) {
            modalTitle.textContent = levelData.title;
            modalDetails.innerHTML = levelData.details;
            modal.showModal();
            body.classList.add('modal-open');
        }
    };

    // --- NEW: Add event listener to close modal on backdrop click ---
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });

    // Add event listener for the close button
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    // Add event listeners to all "Learn More" buttons
    Object.keys(membershipLevels).forEach(btnId => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', () => openModal(btnId));
        }
    });

    // When the dialog is closed, remove the class from the body
    modal.addEventListener('close', () => {
        body.classList.remove('modal-open');
    });

    // Also handle form submission timestamp
    const todayField = document.querySelector("#today");
    if (todayField) {
        todayField.value = new Date().toISOString();
    }
});

