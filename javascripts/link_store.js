(function (root) {
  root.LinkStore = function (key) {
    this.db = new DatabaseSet(key || 'links')
  }

  LinkStore.prototype.dump = function () {
    return JSON.stringify(this.db._store, null, '  ')
  }

  LinkStore.prototype.exists = function (item) {
    return this.db.exists(item)
  }

  LinkStore.prototype.add = function (item) {
    var item = {
      label: item.label,
      url: item.url,
      backgroundColor: item.backgroundColor,
      hideLabel: !!item.hideLabel,
      imageData: item.imageData
    }
    return this.db.create(item, true)
  }

  LinkStore.prototype.update = function (id, linkItem) {
    return this.db.update(id, linkItem)
  }

  LinkStore.prototype.remove = function (id) {
    return this.db.remove(id)
  }

  LinkStore.prototype.each = function (callback) {
    // ordered walk
    var links = _.sortBy(this.db.all(), function (l) { return l.position })
    _.each(links, callback)
  }

})(window)
