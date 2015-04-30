1. git clone
1. Create sites.js in your working copy with the following form:
```js
(function () {
  this.SITES = [
    ['Reddit', 'https://reddit.com'],
    ['Gmail', 'https://mail.google.com'],
    ['Twitter', 'https://twitter.com'],
    // ['label', 'URL'],
  ]
})();
```
1. From chrome://extensions, enable **Developer mode** and the "Load unpacked extension..." button to load the extension.
1. Done!
