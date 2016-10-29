export default function (location, callback, errCallback) {
  var query = 'select item.condition, item.forecast, astronomy.sunset from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '") limit 1',
      url = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(query) + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
  /*
    {
      "query": {
        "count": 1,
        "created": "2015-05-02T01:12:09Z",
        "lang": "en-US",
        "results": {
          "channel": {
            "astronomy": {
              "sunset": "6:49 pm"
            },
            "item": {
              "condition": {
                "code": "26",
                "date": "Fri, 01 May 2015 8:53 pm EDT",
                "temp": "53",
                "text": "Cloudy"
    } } } } } }
  */
  var r = new XMLHttpRequest()
  r.open("GET", url, true)
  r.onreadystatechange = function () {
    if (r.readyState !== 4 || r.status !== 200) {
      return
    }

    var responseJSON, weather

    try {
      responseJSON = JSON.parse(r.responseText)
      weather = responseJSON['query']['results']['channel']
    } catch (ex) {
      console.error('[My New Tab] failed to parse weather JSON', r.responseText)
      errCallback(ex)
    }

    callback(weather)
  };
  r.send()
}

