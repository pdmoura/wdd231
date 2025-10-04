document.addEventListener('DOMContentLoaded', () => {
    const suggestionForm = document.getElementById('suggestionForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const suggestionTextarea = document.getElementById('suggestion');
    const messageDiv = document.getElementById('message');

    if (!suggestionForm) return;

    // Load saved data from storage (for pre-filling)
    const savedData = {
        name: localStorage.getItem('currentSuggestionName') || '',
        email: localStorage.getItem('currentSuggestionEmail') || '',
        suggestion: localStorage.getItem('currentSuggestionContent') || ''
    };

    if (savedData.name) nameInput.value = savedData.name;
    if (savedData.email) emailInput.value = savedData.email;
    if (savedData.suggestion) suggestionTextarea.value = savedData.suggestion;

    // Save data to localStorage on input
    nameInput.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionName', nameInput.value);
    });

    emailInput.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionEmail', emailInput.value);
    });

    suggestionTextarea.addEventListener('input', () => {
        localStorage.setItem('currentSuggestionContent', suggestionTextarea.value);
    });

    // Handle form submission
    suggestionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Create submission object
        const submissionData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            suggestion: suggestionTextarea.value.trim()
        };

        // Validate
        if (!submissionData.name || !submissionData.email || !submissionData.suggestion) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Save to temporary storage
        // Save the single submission object to localStorage
        localStorage.setItem('latestSubmission', JSON.stringify(submissionData));

        // Clear form and localStorage
        nameInput.value = '';
        emailInput.value = '';
        suggestionTextarea.value = '';
        localStorage.removeItem('currentSuggestionName');
        localStorage.removeItem('currentSuggestionEmail');
        localStorage.removeItem('currentSuggestionContent');

        // Show success message immediately
        showMessage('✓ Mensagem enviada com sucesso! Redirecionando...', 'success');

        // Wait 3 seconds, then redirect to the thank you page
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 3000); // 3000 milliseconds = 3 seconds
            });

    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
        }
    }
});