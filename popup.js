document.addEventListener('DOMContentLoaded', function() {
    const statusDisplay = document.getElementById('extensionStatus');
    const contentToPost = document.getElementById('contentToPost');
    const postContentBtn = document.getElementById('postContentBtn');
    const analyzeEngagementBtn = document.getElementById('analyzeEngagementBtn');
    const engagementResults = document.getElementById('engagementResults');
    const toggleExtensionBtn = document.getElementById('toggleExtensionBtn');

    // Toggle the extension's active status
    toggleExtensionBtn.addEventListener('click', function() {
        if (statusDisplay.textContent === 'Active') {
            statusDisplay.textContent = 'Inactive';
            chrome.runtime.sendMessage({ command: 'deactivate' });
        } else {
            statusDisplay.textContent = 'Active';
            chrome.runtime.sendMessage({ command: 'activate' });
        }
    });

    // Post content to Medium.com
    postContentBtn.addEventListener('click', function() {
        const content = contentToPost.value;
        if (content) {
            chrome.runtime.sendMessage({ command: 'postContent', content: content }, function(response) {
                alert('Content posted successfully!');
                contentToPost.value = ''; // Clear the textarea after posting
            });
        } else {
            alert('Please enter some content to post.');
        }
    });

    // Analyze engagement on posted content
    analyzeEngagementBtn.addEventListener('click', function() {
        chrome.runtime.sendMessage({ command: 'analyzeEngagement' }, function(response) {
            engagementResults.textContent = 'Engagement Score: ' + response.engagementScore;
        });
    });
});
