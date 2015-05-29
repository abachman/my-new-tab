(function(){
  // global settings
  var settings = GetDatabaseObject('settings')

  // primary container
  var l = document.querySelector('#links')

  // Weather widget
  var weather = new WeatherWidget(), weatherRendered = false
  var renderWeatherWidget = function () {
    var location = settings.get('weather_address') || "Baltimore, MD"
    weather.setLocation(location)
    weather.render()
    $(l).append(weather.el)
    weatherRendered = true
  }

  if (!settings.get('hide_weather')) {
    renderWeatherWidget()
  }

  var Links = new LinkStore();

  var sizeCanvasToContainer = function (canvas) {
    var parent = canvas.parent()

    // resize drawing context
    var ctx = canvas[0].getContext('2d');
    ctx.canvas.width = parent.width()
    ctx.canvas.height = parent.height()

    // resize canvas element
    canvas.width(parent.width())
    canvas.height(parent.height())
  }

  var refreshLink = function (item) {
    var $l = $("#link-"+ item.id)
    renderLinkIntoContainer(item, $l)
  }

  var renderLink = function (item, links) {
    var linkTemplate = document.querySelector('#item-template')
    var li = document.importNode(linkTemplate.content, true)

    if (typeof links === 'undefined') {
      var links = document.querySelector('#links')
    }

    li.querySelector('a').href = item.url
    li.querySelector('.item-label').innerText = item.label
    links.appendChild(li)

    var itemEl = $(links.children[links.children.length - 1])

    renderLinkIntoContainer(item, itemEl)
  }

  var renderLinkIntoContainer = function (item, itemEl) {
    if (!item.transparentBackground) {
      var bg = Color.hexToRgb(item.backgroundColor || "#FFFFFF");
      if (bg) {
        itemEl.find('.item-container').css({background: Color.rgbToHex(bg.r, bg.g, bg.b)})
        if (Color.colorIsLight(bg.r, bg.g, bg.b)) {
          itemEl.find('.item-label').css({color: "#444444"});
        } else {
          itemEl.find('.item-label').css({color: "#ffffff"});
        }
      }
    } else {
      itemEl.find('.item-container').css({'background-color': 'transparent'})
    }

    if (item.hideLabel) {
      itemEl.find('.item-label').hide()
    } else {
      itemEl.find('.item-label').show()
    }

    if (item.imageData) {
      itemEl.find('.item-image').show()
      sizeCanvasToContainer(itemEl.find('.item-image'))
      SetImageOnCanvas(itemEl.find('.item-image')[0], item.imageData)
    } else {
      itemEl.find('.item-image').hide()
    }

    itemEl.prop('id', "link-" + item.id)
    itemEl.data('item', item)
  }

  var renderLinkForm = function (linkItem) {
    // var body = document.querySelector('body')
    // var modalTemplate = document.querySelector('#link-form-modal-template')
    // var w = document.importNode(modalTemplate.content, true)

    // body.appendChild(w)

    // var $w = $(body).children().last()
    // $w.modal()

    var $w = TemplateModal('#link-form-modal-template')
    var w = $w[0]

    if (linkItem) {
      // console.log("[renderLinkForm] with link", linkItem)
      w.querySelector('.modal-title').innerText = 'Edit Link'

      // preload
      w.querySelector('input[name=link_id]').value = linkItem.id
      w.querySelector('input[name=link_label]').value = linkItem.label
      w.querySelector('input[name=background_color]').value = linkItem.backgroundColor
      w.querySelector('input[name=link_url]').value = linkItem.url
      w.querySelector('input[name=hide_label]').checked = linkItem.hideLabel
      w.querySelector('input[name=transparent_background]').checked = linkItem.transparentBackground
    } else {
      w.querySelector('.modal-title').innerText = 'Add Link'
    }

    $w.on('hidden.bs.modal', function (evt) {
      $w.remove()
    });

    var renderPreview = function (item) {
        $('.item-preview').empty()
      var _item = {}

      _item.label = $w.find('input[name=link_label]').val()
      _item.backgroundColor = $w.find('input[name=background_color]').val()
      _item.url = $w.find('input[name=link_url]').val()
      _item.hideLabel = $w.find('input[name=hide_label]').is(':checked')
      _item.transparentBackground = $w.find('input[name=transparent_background]').is(':checked')

      if (linkItem) {
        _item.imageData = linkItem.imageData
      }

      var image = $w.find('input[name=image_upload]')

      if (image[0].files && image[0].files[0]) {
        UploadImage(image[0], function (dataUrl) {
          _item.imageData = dataUrl
          renderLink(_item, $('.item-preview')[0])
          $('.item-preview item').removeClass('col-md-3 col-sm-3 col-xs-4')
        });
      } else {
        renderLink(_item, $('.item-preview')[0])
        $('.item-preview item').removeClass('col-md-3 col-sm-3 col-xs-4')
      }
    }

    // render preview
    $w.on('change',
          'input[name=image_upload],input[name=link_label],input[name=background_color],input[name=hide_label]',
          _.throttle(renderPreview, 100));

    $w.on('click', '.save-js', function (evt) {
      // console.log("SAVE")

      var item = {}, id

      if (linkItem) {
        id = item.id = linkItem.id
      }

      item.label = $w.find('input[name=link_label]').val()
      item.url = $w.find('input[name=link_url]').val()
      item.backgroundColor = $w.find('input[name=background_color]').val()
      item.hideLabel = $w.find('input[name=hide_label]').is(':checked')
      item.transparentBackground = $w.find('input[name=transparent_background]').is(':checked')

      var image = $w.find('input[name=image_upload]')

      if (linkItem) {
        // update existing link
        if (image[0].files && image[0].files[0]) {
          UploadImage(image[0], function (dataUrl) {
            item.imageData = dataUrl
            var link = Links.update(id, item)
            refreshLink(link)
          });
        } else {
          var link = Links.update(id, item)
          refreshLink(link)
          // update in page if it has already been rendered
        }
      } else {
        // create new link
        if (image[0].files && image[0].files[0]) {
          UploadImage(image[0], function (dataUrl) {
            item.imageData = dataUrl
            renderLink(Links.add(item))
          });
        } else {
          renderLink(Links.add(item))
        }
      }

      $w.modal('hide')
    })

    renderPreview()
  }

  $('.add-item-js').on('click', function (evt) {
    evt.preventDefault()
    renderLinkForm()
  })

  $('body').on('click', '.item .edit-item-js', function (evt) {
    evt.preventDefault()
    var $i = $(evt.target).closest('.item')
    renderLinkForm($i.data('item'))
  })

  $('body').on('click', '.item .remove-item-js', function (evt) {
    evt.preventDefault()
    var $i = $(evt.target).closest('.item')
    if (confirm("Are you sure you want to remove " + $i.data('item').label)) {
      Links.remove($i.data('item').id)
      $i.remove()
    }
  })

  $('.edit-items-js').on('click', function (evt) {
    evt.preventDefault()
    if ($('.edit-item-js').first().is(':visible')) {
      $('.edit-item-js').hide();
      $('.remove-item-js').hide();
    } else {
      $('.edit-item-js').show()
      $('.remove-item-js').show();
      $( "#links" ).sortable({
        items: ".link-item"
      }).on('sortupdate', function (evt, ui) {
        var idx = 0
        _.each($('#links').sortable('toArray'), function (linkId) {
          var _id = /link-(.+)/i.exec(linkId)[1]

          if (_id) {
            Links.update(_id, {position: idx})
          }

          idx += 1
        })
        // console.log('sorted!')
      })
    }
  })

  $('.remove-items-js').on('click', function (evt) {
    evt.preventDefault()
  })

  $('.export-items-js').on('click', function (evt) {
    evt.preventDefault()
    // $('body').append(
    var body = document.querySelector('body')
    var modalTemplate = document.querySelector('#source-modal-template')
    var w = document.importNode(modalTemplate.content, true)

    body.appendChild(w)

    $w = $(body).children().last()

    $w.find('code').text(Links.dump())
    $w.modal()
  });

  var storedLinks = Links.each(function (link) {
    // console.log('rendering ', link)
    renderLink(link)
  })

  $(window).resize(_.debounce(function () {
    $('.link-item').each(function () {
      var item = $(this).data('item')
      if (item.imageData) {
        refreshLink(item)
      }
    })
  }, 150))

  var setBackground = function () {
    var bgHex = settings.get('background_color')
    if (settings.get('background_color')) {
      var bgRgb = Color.hexToRgb(bgHex)

      $('body').css({'background-color': bgHex})
      if (Color.colorIsLight(bgRgb.r, bgRgb.g, bgRgb.b)) {
        $('body').addClass('bg-light')
        $('body').removeClass('bg-dark')
      } else {
        $('body').removeClass('bg-light')
        $('body').addClass('bg-dark')
      }
    }
  }

  $('.edit-settings-js').on('click', function (evt) {
    var view = (new SettingsManager).render()
    view.on('changed', function () {
      console.log('[MyNewTab] changed settings', settings.toJSON())

      setBackground()

      if (settings.get('show_edit_by_default')) {
        $('.remove-item-js').show()
        $('.edit-item-js').show()
      } else {
        $('.remove-item-js').hide()
        $('.edit-item-js').hide()
      }

      if (settings.get('hide_weather')) {
        if (weather.rendered) {
          weather.hide()
        }
      } else {
        if (weather.rendered) {
          weather.show()
          weather.setLocation(settings.get('weather_address'))
          weather.render()
        } else {
          renderWeatherWidget()
        }
      }
    })

    view.on('updated', function () {
      console.log('[MyNewTab] updated settings', weather.rendered, settings.toJSON())

      if (settings.get('hide_weather')) {
        if (weather.rendered) {
          weather.hide()
        }
      } else {
        if (weather.rendered) {
          weather.show()
          weather.setLocation(settings.get('weather_address'))
          weather.render()
        } else {
          renderWeatherWidget()
        }
      }

      view.hide()
    })
  })

  setBackground()

  if (settings.get('show_edit_by_default')) {
    $('.remove-item-js').show()
    $('.edit-item-js').show()
  } else {
    $('.remove-item-js').hide()
    $('.edit-item-js').hide()
  }
})()
