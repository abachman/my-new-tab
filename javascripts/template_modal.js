(function (root) {
  root.TemplateModal = function (key) {
    var body = document.querySelector('body')
    var modalTemplate = document.querySelector(key)
    var w = document.importNode(modalTemplate.content, true)
    body.appendChild(w)
    var $w = $(body).children().last()
    $w.modal()

    return $w
  }
})(window)
