var font = new FontFaceObserver('Tisa');

font.load().then(function () {
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
