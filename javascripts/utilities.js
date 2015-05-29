(function (root) {
  var S4 = function () {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
  }

  // a unique enough ID
  root.NEWID = function () {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4()).toLowerCase();
  }

  root.Database = function () {
    this.get = function (key) {
      var item = localStorage.getItem(key)
      try {
        item = JSON.parse(item)
      } catch (ex) {
        console.error('[Database] failed to get item with key', key)
        console.error(ex)
        item = null
      }
      return item
    }

    this.set = function (key, value) {
      localStorage.setItem(key, JSON.stringify(value))
      return value
    }
  }

  // A persistent js object
  DatabaseObject = function (key) {
    this._key = key
    this._db = new Database();
    this._store = this._db.get(key) || {}
  }

  DatabaseObject.prototype._sync = function () {
    this._db.set(this._key, this._store)
  }

  DatabaseObject.prototype.toJSON = function () {
    return _.clone(this._store)
  }

  DatabaseObject.prototype.get = function (key) {
    return this._store[key]
  }

  DatabaseObject.prototype.set = function (key, value) {
    this._store[key] = value
    this._sync()
  }

  DatabaseObject.prototype.remove = function (key) {
    delete this._store[key]
    this._sync()
  }

  // make sure everyone loading an object gets the same instance
  var db_object_cache = {}
  root.GetDatabaseObject = function (key) {
    if (!db_object_cache.hasOwnProperty(key)) {
      db_object_cache[key] = new DatabaseObject(key)
    }
    return db_object_cache[key]
  }

  // A single JSON object keyed with ID
  root.DatabaseSet = function (key) {
    this._key = key;
    this._db = new Database();
    this._store = this._db.get(key) || {}
  }

  DatabaseSet.prototype._sync = function () {
    this._db.set(this._key, this._store)
  }

  DatabaseSet.prototype.all = function () {
    return _.values(this._store)
  }

  DatabaseSet.prototype.each = function (callback) {
    _.each(this.all(), callback)
  }

  DatabaseSet.prototype.create = function (item, safe) {
    if (safe) {
      var found = _.findWhere(_.values(this._store), item)
      if (found) {
        return found;
      }
    }

    item.id = NEWID()
    this._store[item.id] = item
    this._sync()
    return item
  }

  DatabaseSet.prototype.find = function (id) {
    return this._store[id]
  }

  DatabaseSet.prototype.where = function (attrs) {
    var found = _.findWhere(_.values(this._store), item)
    if (found) {
      return found;
    }
    return null;
  }

  DatabaseSet.prototype.exists = function (item) {
    return !!_.findWhere(_.values(this._store), item)
  }

  DatabaseSet.prototype.update = function (id, attributes) {
    var existing = this.find(id)

    if (existing) {
      this._store[id] = _.extend(existing, attributes)
      this._sync()
      return existing
    } else {
      return null
    }
  }

  DatabaseSet.prototype.remove = function (id) {
    var existing = this.find(id)

    if (existing) {
      delete this._store[id]
      this._sync()
      return true
    } else {
      return false
    }
  }

  DatabaseSet.prototype.count = function () {
    return _.keys(this._store).length
  }

  //********************************************//
  // Image handling
  //
  var imageFit = function (w1, h1, w2, h2) {
    // console.log('fit', {w: w1, h:h1}, 'into', {w: w2, h: h2})

    var wscale = 1, hscale = 1;

    if (w1 >= w2) {
      // scale for a snug width
      wscale = w2 / w1
    }

    if (h1 >= h2) {
      // scale for a snug height
      hscale = h2 / h1
    }

    // choose smallest scale
    var scale = hscale < wscale ? hscale : wscale;
    // console.log('constrain, chose scale', scale)

    w3 = w1 * scale
    h3 = h1 * scale

    // center new rect in w2
    x3 = (w2 / 2.0) - (w3 / 2.0)
    y3 = (h2 / 2.0) - (h3 / 2.0)

    var measure = {
      ox: x3,
      oy: y3,
      width: w3,
      height: h3
    }
    // console.log('final measure', measure)

    return measure
  }

  root.SetImageOnCanvas = function (canvas, dataUrl) {
    var img = new Image()
    img.onload = function(){
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // fit centered within the canvas having the appropriate aspect ratio
      var newSize = imageFit(img.width, img.height, canvas.width, canvas.height)

      // console.log('fit image', {width: img.width, height: img.height}, 'with size', newSize)
      ctx.drawImage(img, newSize.ox, newSize.oy, newSize.width, newSize.height) // destination rectangle

      // console.log('[ImageUploadToCanvas] store', canvas.toDataURL())
    }
    img.src = dataUrl
  }

  root.UploadImage = function (target, callback) {
    var reader = new FileReader()
    // display file when it finishes loading
    reader.onload = function(event){
      callback(event.target.result)
    }
    reader.readAsDataURL(target.files[0])
  }

  root.ImageUploadToCanvas = function (canvas, target, callback) {
    var reader = new FileReader()
    // display file when it finishes loading
    reader.onload = function(event){
      SetImageOnCanvas(canvas, event.target.result)
      if (callback) callback(event.target.result)
    }
    // console.log('[ImageUploadToCanvas] get', target.files[0])
    reader.readAsDataURL(target.files[0])
  }

  //********************************************//
  // Color handling
  //

  root.Color = {
    colorIsLight: function (r, g, b) {
      // Counting the perceptive luminance
      // human eye favors green color...
      var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return (a < 0.5);
    },

    componentToHex: function (c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex: function (r, g, b) {
        return "#" + Color.componentToHex(r) +
                     Color.componentToHex(g) +
                     Color.componentToHex(b);
    },

    hexToRgb: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }
  }

  root.TemplateToString = function (domId) {
    var $t = $template(domId, '#template-prerender')
    return $t.remove().html()
  }

  root.$template = function (templateId, targetEl) {
    if (targetEl) {
      if (typeof targetEl === 'string') {
        var container = document.querySelector(targetEl)
      } else {
        // assume jQuery object
        var container = targetEl.get(0)
      }
    } else {
      var container = document.querySelector('body')
    }
    var template = document.querySelector(templateId)
    var fragment = document.importNode(template.content, true)
    container.appendChild(fragment)
    return $(container).children().last()
  }

})(window);
