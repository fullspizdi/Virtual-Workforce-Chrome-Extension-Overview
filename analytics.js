// analytics.js
// This script is responsible for handling analytics and performance monitoring
// for the Virtual Workforce Chrome Extension on Medium.com.

// Function to log and store analytics data
function logAnalytics(data) {
    console.log('Logging analytics data:', data);
    chrome.storage.local.get({analyticsData: []}, function(result) {
        const updatedAnalyticsData = result.analyticsData;
        updatedAnalyticsData.push(data);
        chrome.storage.local.set({analyticsData: updatedAnalyticsData}, function() {
            console.log('Analytics data updated in storage.');
        });
    });
}

// Function to retrieve and display analytics data
function getAnalytics(callback) {
    chrome.storage.local.get('analyticsData', function(result) {
        console.log('Retrieved analytics data:', result.analyticsData);
        if (callback) {
            callback(result.analyticsData);
        }
    });
}

// Function to clear all stored analytics data
function clearAnalytics() {
    chrome.storage.local.set({analyticsData: []}, function() {
        console.log('All analytics data cleared.');
    });
}

// Export functions for use in other parts of the extension
export { logAnalytics, getAnalytics, clearAnalytics };
