const saveOptions = () => {
    const openApiKey = document.getElementById('open-api-key').value;
    const googleAdsApiKey = document.getElementById('google-ads-api-key').value;
    const gptVersion = document.getElementById('gpt-version').value;

    const hideNotifications = document.querySelector('input[name="hide-notifications"]:checked').value === 'true';
    const dismissAds = document.querySelector('input[name="dismiss-ads"]:checked').value === 'true';

    chrome.storage.local.set(
        { OPEN_API_KEY: openApiKey, GOOGLE_ADS_API_KEY: googleAdsApiKey, GPT_VERSION: gptVersion, HIDE_NOTIFICATIONS: hideNotifications, DISMISS_ADS: dismissAds },
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

const restoreOptions = () => {
    chrome.storage.local.get(
        { OPEN_API_KEY: '', GOOGLE_ADS_API_KEY: '', GPT_VERSION: 'GPT 3.5', HIDE_NOTIFICATIONS: false, DISMISS_ADS: false },
        (items) => {
            document.getElementById('open-api-key').value = items.OPEN_API_KEY;
            document.getElementById('google-ads-api-key').value = items.GOOGLE_ADS_API_KEY;
            document.getElementById('gpt-version').value = items.GPT_VERSION;

            document.querySelector(`input[name="hide-notifications"][value="${items.HIDE_NOTIFICATIONS ? 'true' : 'false'}"]`).checked = true;
            document.querySelector(`input[name="dismiss-ads"][value="${items.DISMISS_ADS ? 'true' : 'false'}"]`).checked = true;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
