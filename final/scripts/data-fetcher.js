/**
 * Fetches JSON data from a specified URL.
 * @param {string} url - The URL/ to fetch data from.
 * @returns {Promise<any|null>} - A promise that resolves with the JSON data, or null if an error occurs.
 */


export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Throws an error to be caught by the catch block
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the successfully fetched data
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null; // Return null to indicate failure
    }
}