// This code sets up a MutationObserver to watch for changes in the DOM. When the observed mutations
// include changes to the child list of nodes, it checks if a popup with the class name 'popup-wrapper'
// is present and visible. If so, it hides the popup by modifying its display style property.
// The observer starts observing mutations when the window has finished loading.

// The code starts by creating a new MutationObserver using the MutationObserver constructor.
// The observer is defined with a callback function that will be called when mutations are
// observed in the specified target. Inside the callback function, the code iterates over the mutationsList,
// which contains a list of mutations that have been observed. It checks each mutation to see if it is of type
// 'childList', indicating that the structure of the DOM has changed.
//
// If the mutation is of type 'childList', the code proceeds to check if the popup exists in the DOM by querying
// the document for an element with the class name 'popup-wrapper'. The result is stored in the popup variable.
//
// Next, the code checks if the popup exists and if it has the class name 'visible'. This ensures that the popup is
// both present in the DOM and currently visible on the page.
//
// If the conditions are met, the code hides the popup by changing its display style property to 'none'.
// This effectively makes the popup invisible.
//
// Finally, there is a commented-out line (// observer.disconnect();) that shows an optional step to stop
// observing mutations after hiding the popup. If you uncomment this line, the observer will be disconnected,
// and no further mutations will be observed.
//
// Outside the observer callback function, there is an event listener attached to the window object for the 'load'
// event. This event is fired when the entire page has finished loading, including its dependencies such as
// stylesheets and images. When the 'load' event is triggered, the observer starts observing changes in the
// document body and its subtree. This is done by calling the observe method on the observer object,
// passing in the document.body as the target node to observe, and specifying the options object with childList: true
// and subtree: true to include all child nodes and their descendants in the mutation observations.

// MutationObserver method to auto hide Google Ads notification.
// ToDo: Condition this on user preference for option.
const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Check if the popup exists
            let popup = document.querySelector('.popup-wrapper');
            if(popup && popup.classList.contains('visible')) {
                // Hide the popup
                popup.style.display = 'none';
                // Stop observing if you want
                // observer.disconnect();
            }
        }
    }
});

window.addEventListener('load', (event) => {
    observer.observe(document.body, { childList: true, subtree: true });
});



// Code to check for a final URL field in Performance Max campaigns.
// Define a function to execute when mutations are observed
let checkDom = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Try finding the label
            let inputLabel = document.querySelector('.input-container');
            // If the label is found
            if (inputLabel !== null) {
                // Identify the input field within the label
                let urlInput = inputLabel.querySelector('.input-area');

                // If the element exists
                if (urlInput) {
                    // Create image
                    let img = document.createElement('img');
                    // img.src = chrome.runtime.getURL('icons/gptit.png'); // you may need to adjust the path to match your structure
                    img.id = 'gptit-icon';
                    img.style.display = 'none';
                    img.style.cursor = 'pointer';

                    // Get the image URL from the background script
                    chrome.runtime.sendMessage({contentScriptQuery: "fetchImage", path: 'icons/gptit.png'}, result => {
                        img.src = result.url;
                    });

                    // Inject the image just before the input field within the label
                    inputLabel.insertBefore(img, urlInput);

                    // Create modal and hide it initially
                    let modal = document.createElement('div');
                    modal.id = 'gptit-modal';
                    modal.style.display = 'none';
                    modal.innerHTML = `
                        <p>${urlInput.value}</p>
                        <button id="gptit-btn">Get Headline & Description suggestions from GPT</button>
                    `;
                    document.body.appendChild(modal);

                    // Add event listener to the image
                    img.addEventListener('click', function() {
                        modal.style.display = 'block'; // Show the modal
                        document.querySelector('#gptit-modal p').textContent = urlInput.value;
                    });

                    // Add event listener to the button
                    document.getElementById('gptit-btn').addEventListener('click', function() {
                        // TODO: Call the function that gets the headline & description suggestions from GPT
                        modal.style.display = 'none'; // Hide the modal
                    });

                    // Create a Mutation Observer instance to track changes
                    let observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type == 'attributes' && mutation.attributeName === 'value') {
                                if(urlInput.value !== '') {
                                    img.style.display = 'block';
                                } else {
                                    img.style.display = 'none';
                                }
                            }
                        });
                    });

                    // Configuration of the observer
                    let config = { attributes: true, childList: false, subtree: false };

                    // Pass in the target node and observer's configuration
                    observer.observe(urlInput, config);

                    // We found the label, so we can stop observing
                    observer.disconnect();
                    break;
                }
            }
        }
    }
};

// Create an observer instance linked to the callback function
let finalUrlObserver = new MutationObserver(checkDom);

// Start observing the document with the configured parameters
finalUrlObserver.observe(document.body, { childList: true, subtree: true });



