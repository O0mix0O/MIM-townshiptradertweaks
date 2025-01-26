export function setup({ loadStylesheet }) {
  loadStylesheet('style.css');

  (function () {
    const selector = 'township-conversion > li > a';

    function initializeTooltipLogicForAll() {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        initializeTooltipLogic(element);
      });
    }

    function checkElements() {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log('Elements found!');
        initializeTooltipLogicForAll();
        observer.disconnect(); // Stop the MutationObserver once elements are found
      } else {
        console.log('Elements not found, retrying...');
      }
    }

    const observer = new MutationObserver(() => {
      checkElements();
    });

    // Start observing for changes in the document body (or a more specific container)
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check in case the elements are already loaded
    checkElements();

    function initializeTooltipLogic(element) {
      const tippyInstance = element?._tippy;
      if (!tippyInstance) {
        console.error('Tippy instance not found!');
        return;
      }

      let isClicking = false;
      let tooltipElements = []; // To store the tooltip elements

      const tooltipObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.id && node.id.startsWith('tippy-')) {
                console.log('New Tooltip Element Added:', node);
                tooltipElements.push(node); // Store the tooltip elements
              }
            });
          }
        }
      });

      tooltipObserver.observe(document.body, { childList: true, subtree: true });

      element.addEventListener('mouseenter', () => {
        if (!isClicking) {
          tooltipElements.forEach((tooltipElement) => {
            tooltipElement.style.display = 'block';
          });
          console.log('Mouseenter without click. Showing tooltip.');
        } else {
          console.log('Mouseenter during click window. Tooltip suppressed.');
        }
      });

      element.addEventListener('click', () => {
        console.log('Element clicked! Suppressing tooltips...');
        isClicking = true;
        tooltipElements.forEach((tooltipElement) => {
          tooltipElement.style.display = 'none'; // Hide the tooltip after click
        });
        console.log('Tooltips hidden during click.');

        setTimeout(() => {
          isClicking = false;
          console.log('isClicking reset to false.');
        }, 300); // Delay to allow subsequent mouseenter events
      });

      console.log('Tooltip logic initialized for element.');
    }

  })();
};