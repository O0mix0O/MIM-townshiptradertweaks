export function setup({ loadStylesheet }) {
  loadStylesheet('style.css');

  (function () {
    function waitForElements(selector, callback) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.matches(selector)) {
              observer.disconnect();
              callback();
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Initial check in case the elements are already present
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        observer.disconnect();
        callback();
      }
    }

    waitForElements('#CONVERT_RESOURCES_DATA_TO_TOWN > ul > township-conversion > li > a', () => {
      const elements = document.querySelectorAll('#CONVERT_RESOURCES_DATA_TO_TOWN > ul > township-conversion > li > a');

      elements.forEach(element => {
        element.addEventListener('click', (event) => {
          // Ensure the original click event is fired
          if (typeof element.onclick === 'function') {
            element.onclick(event);
          }

          // Your custom function
          customFunction(event, element);
        });
      });
    });

    function customFunction(event, element) {
      console.log('Custom function executed.');
      console.log(element); // Ensure the element is being logged

      // Avoid infinite loop by preventing the custom click event from triggering itself
      if (!event.customClick) {
        // Create and dispatch a custom MouseEvent
        const mouseEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });

        // Mark this event as a customClick to prevent recursion
        mouseEvent.customClick = true;
        element.dispatchEvent(mouseEvent);

        const mouseLeaveEvent = new MouseEvent('mouseleave', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        element.dispatchEvent(mouseLeaveEvent);
      } else {
        console.log('Custom click event, not firing again to prevent recursion.');
      }
    }



  })();
};