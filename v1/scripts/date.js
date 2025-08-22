// scripts/date.js

// Set current year in the footer
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Set last modified date in the footer
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}
