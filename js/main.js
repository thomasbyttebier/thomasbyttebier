var fontA = new FontFaceObserver('Tisa', {
    weight: 400
});

var fontB = new FontFaceObserver('Tisa', {
    weight: 700
});

Promise.all([fontA.load(), fontB.load()]).then(function () {
  document.documentElement.className += " js-fonts-loaded";
});

function onBlur() {
    document.body.className = 'js-is-blurred';
};
function onFocus() {
    document.body.className = 'js-is-focused';
};

window.onfocus = onFocus;
window.onblur = onBlur;
