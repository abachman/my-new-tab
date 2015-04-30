(function () {
  this.Weather = function Weather (location, callback) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + encodeURIComponent(location) + "+%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    var r = new XMLHttpRequest()
    r.open("GET", url, true)
    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) {
        return
      }
      callback(r)
    };
    r.send()
  }
})();
