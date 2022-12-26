(() => {
  const observeObject = (function () {
    const _class = {
      init: function (selector, callback) {
        const element = document.querySelector(selector);

        try {
          const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              callback(
                mutation.target,
                mutation.attributeName,
                mutation.oldValue
              );
            });
          });

          observer.observe(element, {
            attributes: true,
            subtree: true,
            attributeOldValue: true,
          });
        } catch (z) {
          element.addEventListener(
            'DOMAttrModified',
            function (e) {
              callback(e.target, e.attrName, e.prevValue);
            },
            false
          );
        }
      },
    };

    return _class;
  })();

  const targetSelector = '.js-overlay-modal';
  const targetState = 'active';

  const overlay = document.querySelector(targetSelector);
  const header = document.querySelector('.header');
  const headerBtnBuyNow = document.querySelector('.header__btn');

  observeObject.init(targetSelector, () => {
    const modalIsOpen = overlay.classList.contains(targetState);
    const headerIsShaded = header.classList.contains('header--shaded');

    // toggle Buy now anim
    //
    headerBtnBuyNow.style.animation = modalIsOpen ? 'unset' : null;

    // body scroll lock
    //
    toggleScroll(modalIsOpen);
    header.style.display = headerIsShaded && modalIsOpen ? 'none' : null;

    // fix top for .modal.active
    //
    const activeModal = document.querySelector('.modal.active');
    const pos = activeModal.getBoundingClientRect();
    const activeModalHeight = pos.height;
    const viewportHeight = document.documentElement.clientHeight;

    if (viewportHeight <= activeModalHeight) {
      activeModal.style.top = 0;
      activeModal.style.transform = 'translate(-50%, 0)';
    } else {
      activeModal.style.top = null;
      activeModal.style.transform = null;
    }
  });
})();
