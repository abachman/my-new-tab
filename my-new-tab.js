(function(){
  // primary container
  var l = document.querySelector('#links')

  // Weather widget
  var weatherTemplate = document.querySelector('#weather-template')
  var w = document.importNode(weatherTemplate.content, true)
  l.appendChild(w)

  Weather('21211', function (response) {
    try {
      var responseJSON = JSON.parse(response.responseText)
      var weather = responseJSON['query']['results']['channel']
      console.log('[WEATHER]', weather)
    } catch (ex) {
      console.error('[My New Tab] failed to parse weather JSON')
    }

    var w = document.querySelector('.item.weather')
    w.querySelector('.weather-label').innerText = weather.description
    w.querySelector('.details').innerHTML = weather.item.description
  });

  var linkTemplate = document.querySelector('#item-template')

  for (link of SITES) {
    var li = document.importNode(linkTemplate.content, true)
    li.querySelector('a').href = link[1]
    li.querySelector('.item-label').innerText = link[0]
    l.appendChild(li)
  }
})();

