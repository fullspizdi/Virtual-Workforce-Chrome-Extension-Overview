// background.js
// This script serves as the service worker for the Virtual Workforce Chrome Extension,
// handling background tasks and integrating AI functionalities for Medium.com automation.

importScripts('ai_integration.js');

chrome.runtime.onInstalled.addListener(() => {
    console.log('Virtual Workforce Chrome Extension installed.');
    // Initialize default settings or perform any necessary setup
    chrome.storage.local.set({ active: true }, () => {
        console.log('Initial active state set to true.');
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log('Virtual Workforce Chrome Extension starting up.');
    // Perform any necessary checks or initializations
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'postContent') {
        handlePostContent(request.content);
    } else if (request.action === 'analyzeEngagement') {
        analyzeEngagement().then(sendResponse);
        return true; // Indicates asynchronous response
    }
});

// Function to handle automated posting of content to Medium.com
function handlePostContent(content) {
    AIIntegration.postContentToMedium(content, (success) => {
        if (success) {
            console.log('Content posted successfully.');
        } else {
            console.log('Failed to post content.');
        }
    });
}

// Function to analyze engagement on posted content
async function analyzeEngagement() {
    const data = await AIIntegration.fetchEngagementData();
    console.log('Engagement data fetched:', data);
    return data;
}

// Set up alarms for periodic tasks
chrome.alarms.create('checkMediumActivity', { periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkMediumActivity') {
        console.log('Running scheduled check for Medium activity.');
        analyzeEngagement().then(data => {
            console.log('Periodic engagement analysis completed.', data);
        });
    }
});
