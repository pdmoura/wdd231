// scripts/thank-you.js

document.addEventListener('DOMContentLoaded', () => {
    const submittedNameSpan = document.getElementById('submittedName');
    const submittedEmailSpan = document.getElementById('submittedEmail');
    const submittedSuggestionSpan = document.getElementById('submittedSuggestion');

    // Retrieve the submitted data from localStorage
    const submittedData = JSON.parse(localStorage.getItem('latestSubmission'));

    if (submittedData) {
        // Display the submitted data
        submittedNameSpan.textContent = submittedData.name || 'N/A';
        submittedEmailSpan.textContent = submittedData.email || 'N/A';
        submittedSuggestionSpan.textContent = submittedData.suggestion || 'N/A';

        // Clear the data from localStorage after displaying it
        // This ensures it's only shown once per submission
        localStorage.removeItem('latestSubmission');
    } else {
        // Fallback if no data is found
        submittedNameSpan.textContent = 'No submission data found.';
        submittedEmailSpan.textContent = ''; // Clear email if no data
        submittedSuggestionSpan.textContent = 'Please go back to the Contact Us page and submit your feedback.';
        document.querySelector('.submitted-info h2').textContent = 'Submission Details Unavailable';
    }
});