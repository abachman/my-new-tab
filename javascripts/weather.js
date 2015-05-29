(function (root) {
  var Weather = function Weather (location, callback) {
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
      if (r.readyState != 4 || r.status != 200) {
        return
      }

      var responseJSON, weather

      try {
        responseJSON = JSON.parse(r.responseText)
        weather = responseJSON['query']['results']['channel']
        // console.log('[WEATHER]', weather)
      } catch (ex) {
        console.error('[My New Tab weather] failed to parse weather JSON')
      }

      callback(weather)
    };
    r.send()
  }

  this.WeatherWidget = Backbone.View.extend({
    initialize: function () {
      this.location = 'Baltimore, MD'
    },

    setLocation: function (location) {
      this.location = location
    },

    render: function () {
      this.$el.empty()
      var $t = $template('#weather-template', 'body').remove()
      this.$el.html($t)

      var self = this

      Weather(this.location, function (weather) {
        if (weather) {
          self.$('.weather-title').text(self.location)
          self.$('.weather-date').text(weather.item.forecast.date)

          self.$('.current-temp').text(weather.item.condition.temp)

          self.$('.high-temp').text(weather.item.forecast.high)
          self.$('.low-temp').text(weather.item.forecast.low)

          self.$('.sunset-text').text(weather.astronomy.sunset)

          self.$('.conditions').text(weather.item.forecast.text)
        }

        this.rendered = true
      })
    },

    show: function () {
      this.$el.parent().show()
    },

    hide: function () {
      this.$el.parent().hide()
    },
  })
})(window);
