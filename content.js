// content.js
// This script operates on Medium.com pages, handling direct page manipulations and interactions.

// Listen for DOM changes to automate interactions or gather data
document.addEventListener('DOMContentLoaded', function() {
    injectCustomStyles();
    automateReading();
});

// Inject custom styles to hide automation traces
function injectCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .virtual-workforce-hide { 
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Simulate reading articles to boost engagement metrics
function automateReading() {
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        // Simulate a reading pattern
        setTimeout(() => {
            window.scrollTo(0, article.offsetTop);
        }, 1000);
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'simulateComment') {
        simulateComment(request.content);
    }
});

// Function to simulate commenting on an article
function simulateComment(content) {
    const commentBox = document.querySelector('textarea.commentBox');
    if (commentBox) {
        commentBox.value = content;
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.click();
        console.log('Comment simulated:', content);
    } else {
        console.log('No comment box found.');
    }
}

// Send engagement data to background script for analysis
function sendEngagementData() {
    const engagementData = collectEngagementData();
    chrome.runtime.sendMessage({ action: 'analyzeEngagement', data: engagementData }, response => {
        console.log('Engagement data sent for analysis:', response);
    });
}

// Collect engagement data from the page
function collectEngagementData() {
    const likes = document.querySelectorAll('.likeButton').length;
    const comments = document.querySelectorAll('.comment').length;
    return { likes, comments };
}

// Periodically check for new content to engage with
setInterval(() => {
    console.log('Checking for new content to engage...');
    sendEngagementData();
}, 60000); // Check every minute

