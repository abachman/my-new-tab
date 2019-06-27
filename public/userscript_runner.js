// Set up message event handler:
window.addEventListener('message', function(event) {
  if (event.data.docheck) {
    console.log('[userscript] do check!')
    event.source.postMessage({
      source: 'userscripts',
      status: 'ok'
    })
  } else if (event.data.code) {
    console.log('[userscript] got code')
    var sender = event.data.sender
    var domId = event.data.domId
    var code = event.data.code
    var size = event.data.size
    var state = event.data.state
    var userfunc = null

    try {
      userfunc = eval("var ufunc = " + code + "; ufunc");
    } catch(ex) {
      console.error("eval error", ex)
      userfunc = function (cb) { cb("failed to execute code: " + ex.message) }
    }

    userfunc(function (html, outState) {
      event.source.postMessage({
        sender: sender,
        html: html,
        state: outState
      }, event.origin);
    }, domId, size, state)
  }
});
