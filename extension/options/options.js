// Saves options to chrome.storage
const saveOptions = () => {
    const openApiKey = document.getElementById('open-api-key').value;
    const googleAdsApiKey = document.getElementById('google-ads-api-key').value;
    const gptVersion = document.getElementById('gpt-version').value;

    chrome.storage.local.set(
        { OPEN_API_KEY: openApiKey, GOOGLE_ADS_API_KEY: googleAdsApiKey, GPT_VERSION: gptVersion },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and input field state using the preferences
// stored in chrome.storage.local.
const restoreOptions = () => {
    chrome.storage.local.get(
        { OPEN_API_KEY: '', GOOGLE_ADS_API_KEY: '', GPT_VERSION: 'GPT 3.5' },
        (items) => {
            document.getElementById('open-api-key').value = items.OPEN_API_KEY;
            document.getElementById('google-ads-api-key').value = items.GOOGLE_ADS_API_KEY;
            document.getElementById('gpt-version').value = items.GPT_VERSION;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
