document.addEventListener('DOMContentLoaded', function() {
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');
    const aiModelSelect = document.getElementById('aiModel');
    const operationModeSelect = document.getElementById('operationMode');
    const autoPostCheckbox = document.getElementById('autoPost');
    const analyticsTrackingCheckbox = document.getElementById('analyticsTracking');

    // Load saved settings from local storage
    function loadOptions() {
        chrome.storage.local.get(['aiModel', 'operationMode', 'autoPost', 'analyticsTracking'], function(items) {
            if (items.aiModel) {
                aiModelSelect.value = items.aiModel;
            }
            if (items.operationMode) {
                operationModeSelect.value = items.operationMode;
            }
            autoPostCheckbox.checked = items.autoPost || false;
            analyticsTrackingCheckbox.checked = items.analyticsTracking !== undefined ? items.analyticsTracking : true;
        });
    }

    // Save settings to local storage
    function saveOptions() {
        chrome.storage.local.set({
            aiModel: aiModelSelect.value,
            operationMode: operationModeSelect.value,
            autoPost: autoPostCheckbox.checked,
            analyticsTracking: analyticsTrackingCheckbox.checked
        }, function() {
            // Update status to let user know options were saved.
            const status = document.createElement('div');
            status.textContent = 'Options saved.';
            status.className = 'status-message';
            document.body.appendChild(status);
            setTimeout(function() {
                status.remove();
            }, 1500);
        });
    }

    // Event listener for the save button
    saveOptionsBtn.addEventListener('click', function(event) {
        event.preventDefault();
        saveOptions();
    });

    // Load any previously saved options
    loadOptions();
});
