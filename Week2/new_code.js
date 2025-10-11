// new_code.js

/**
 * This script processes user data from a local JSON file.
 * For each user, it fetches additional data from an external API,
 * filters and transforms the items (only active items, doubles their value,
 * adds a timestamp, and keeps those with value > 10),
 * and writes the processed results to an output file.
 * Refactored to use async/await and improved naming conventions.
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

/**
 * Reads user data from a local JSON file asynchronously.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<Array>} - Array of user objects.
 */
async function readUserData(filePath) {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Fetches additional data for a user from an external API.
 * @param {string} apiUrl - API endpoint URL.
 * @param {Object} user - User object.
 * @returns {Promise<Array>} - Array of items for the user.
 */
async function fetchUserItems(apiUrl, user) {
    try {
        const response = await axios.get(`${apiUrl}/users/${user.id}/items`);
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching items for user ${user.id}:`, error.message);
        return [];
    }
}

/**
 * Processes items by filtering active ones, doubling their value,
 * adding a timestamp, and keeping those with value > 10.
 * @param {Array} items - Array of item objects.
 * @returns {Array} - Array of processed item objects.
 */
function processItems(items) {
    const timestamp = new Date().toISOString();
    return items
        .filter(item => item.active)
        .map(item => ({
            ...item,
            value: item.value * 2,
            processedAt: timestamp
        }))
        .filter(item => item.value > 10);
}

/**
 * Writes processed results to an output file asynchronously.
 * @param {string} outputFilePath - Path to the output file.
 * @param {Array} results - Array of processed results.
 */
async function writeProcessedResults(outputFilePath, results) {
    const data = JSON.stringify(results, null, 2);
    await fs.writeFile(outputFilePath, data, 'utf-8');
}

/**
 * Main function to orchestrate the processing workflow.
 */
async function main() {
    const userFilePath = path.resolve(__dirname, 'users.json');
    const apiUrl = 'https://api.example.com';
    const outputFilePath = path.resolve(__dirname, 'processed_results.json');

    try {
        const users = await readUserData(userFilePath);
        const processedResults = [];

        for (const user of users) {
            const items = await fetchUserItems(apiUrl, user);
            const processedItems = processItems(items);
            processedResults.push({
                userId: user.id,
                processedItems
            });
        }

        await writeProcessedResults(outputFilePath, processedResults);
        console.log('Processing complete. Results written to', outputFilePath);
    } catch (error) {
        console.error('Error during processing:', error.message);
    }
}

main();