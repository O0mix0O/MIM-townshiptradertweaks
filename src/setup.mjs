export function setup({ loadStylesheet, onCharacterLoaded }) {
  loadStylesheet('style.css');

  onCharacterLoaded(async (ctx) => {
    function addOnClickToSelector(selector, customClickHandler) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const originalClickHandler = element.onclick;

        element.onclick = function (event) {
          if (typeof originalClickHandler === 'function') {
            originalClickHandler(event);
          }

          customClickHandler(event);
        };
      });
    }

    function handleMouseLeaveEvent(event) {
      const mouseLeaveEvent = new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      event.target.dispatchEvent(mouseLeaveEvent);
    }

    addOnClickToSelector('#CONVERT_RESOURCES_DATA_TO_TOWN > ul > township-conversion > li > a', handleMouseLeaveEvent);
  });
};
