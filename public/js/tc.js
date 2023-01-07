// eslint-disable-next-line no-unused-vars
const tc = {
  c: (pSelector, combs, callback) => {
    let combType = typeof combs;

    if (combType == "string") {
      combs = combs.split(" ");
    } else if (combType != "object") {
      console.error(
        `Tailwind Combinator expects a string or array as combinations. Received ${combType}`
      );
      return;
    }

    // eslint-disable-next-line no-undef
    const elements = document.querySelectorAll(pSelector);
    for (let i = 0; i < elements.length; i++) {
      for (let x = 0; x < combs.length; x++) {
        elements[i].classList.add(combs[x]);
      }
    }

    if (typeof callback == "function") {
      callback();
    }
  },
};
