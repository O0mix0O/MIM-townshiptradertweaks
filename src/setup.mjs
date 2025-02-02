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
        initializeTooltipLogicForAll();
        observer.disconnect(); // Stop the MutationObserver once elements are found
      } else {
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
        return;
      }

      let isClicking = false;
      let tooltipElements = []; // To store the tooltip elements

      const tooltipObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.id && node.id.startsWith('tippy-')) {
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
        } else {
        }
      });

      element.addEventListener('click', () => {
        isClicking = true;
        tooltipElements.forEach((tooltipElement) => {
          tooltipElement.style.display = 'none'; // Hide the tooltip after click
        });

        setTimeout(() => {
          isClicking = false;
        }, 300); // Delay to allow subsequent mouseenter events
      });

    }

  })();
};