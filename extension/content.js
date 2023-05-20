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

// ToDo: Condition this on user preference for option.
// MutationObserver method to auto hide Google Ads notification.
const observer = new MutationObserver((mutationsList, observer) => {
  for(let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      let popup = document.querySelector('.popup-wrapper');
      if(popup && popup.classList.contains('visible')) {
        popup.style.display = 'none';
      }
    }
  }
});

window.addEventListener('load', (event) => {
  observer.observe(document.body, { childList: true, subtree: true });
});



// Code to check for a final URL field in Performance Max campaigns.
// Define a function to execute when mutations are observed
// let checkDom = function(mutationsList, observer) {
//   for(let mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       let inputLabel = document.querySelector('.input-container');
//       if (inputLabel !== null) {
//         let urlInput = inputLabel.querySelector('.input-area');
//
//         if (urlInput) {
//           let span = document.createElement('span');
//           span.id = 'gptit-icon';
//           span.style.display = 'none';
//           span.style.cursor = 'pointer';
//           span.textContent = '🧠';
//
//           inputLabel.insertBefore(span, urlInput);
//
//           let modal = document.createElement('div');
//           modal.id = 'gptit-modal';
//           modal.style.display = 'none';
//
//           if(urlInput.value !== undefined) {
//             modal.innerHTML = `
//               <p>${urlInput.value}</p>
//               <button id="gptit-btn">Get Headline & Description suggestions from GPT</button>
//             `;
//           } else {
//             modal.innerHTML = `
//               <p>No Value Found</p>
//               <button id="gptit-btn">Get Headline & Description suggestions from GPT</button>
//             `;
//           }
//
//           document.body.appendChild(modal);
//
//           span.addEventListener('click', function() {
//             modal.style.display = 'block';
//           });
//
//           document.querySelector('#gptit-btn').addEventListener('click', function() {
//             chrome.runtime.sendMessage({text: urlInput.value}, function(response) {
//               let para = document.createElement("p");
//               let node = document.createTextNode(response.farewell);
//               para.appendChild(node);
//
//               let element = document.getElementById("gptit-modal");
//               element.appendChild(para);
//             });
//           });
//         }
//       }
//     }
//   }
// };
//
// // Create an observer instance linked to the callback function
// let observer2 = new MutationObserver(checkDom);
//
// // Start observing the document with the configured parameters
// observer2.observe(document, { childList: true, subtree: true });



// Check DOM every 500ms for the required input field.
setInterval(checkDom, 500);

function checkDom() {
  let inputLabel = document.querySelector('.input-container');
  if (inputLabel !== null && !inputLabel.querySelector('#gptit-icon')) {
    let urlInput = inputLabel.querySelector('.input-area');
    if (urlInput) {
      let span = document.createElement('span');
      span.id = 'gptit-icon';
      span.style.cursor = 'pointer';
      span.textContent = '🧠';

      inputLabel.insertBefore(span, urlInput);

      let modal = document.createElement('div');
      modal.id = 'gptit-modal';
      modal.style.display = 'none';

      if(urlInput.value !== undefined) {
        console.log("URL input was indeed found and is " + urlInput.value.toString())
        modal.innerHTML = `
            <p>${urlInput.value}</p>
            <button id="gptit-btn">Get Headline & Description suggestions from GPT</button>
          `;
      } else {
        console.log("No URL input found")
        modal.innerHTML = `
            <p>No Value Found</p>
            <button id="gptit-btn">Get Headline & Description suggestions from GPT</button>
          `;
      }

      document.body.appendChild(modal);

      span.addEventListener('click', function() {
        modal.style.display = 'block';
      });

      document.querySelector('#gptit-btn').addEventListener('click', function() {
        // ToDo: Send urlInput.value to GPT-3 and get headline & description suggestions.
      });
    }
  }
}