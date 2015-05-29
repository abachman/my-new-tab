(function () {
  var BookmarkModel = Backbone.Model.extend({
    remove: function () {
      var self = this
      chrome.bookmarks.remove(this.id, function () {
        self.trigger('remove')
      })
    }
  })

  // on launch
  var BookmarkView = Backbone.View.extend({
    tagName: 'li',

    className: 'bookmark-link',

    template: function (options) {
      return Mustache.render(
        "<a class='remove remove-item-js' style='display:none' href><span class='glyphicon glyphicon-remove'></span></a>  " +
        "<a class='link' href='{{ url }}'>{{ title }}</a>",
        options
      )
    },

    initialize: function (options) {
      var self = this

      this.model.on('remove', function () {
        self.remove()
      })
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
      return this
    },

    events: {
      'click .remove': 'onRemove'
    },

    onRemove: function (evt) {
      evt.preventDefault()
      console.log('deleting bookmark', this.model.toJSON())
      var self = this
      this.model.remove(function () {
        self.remove()
      })
    },

    remove: function () {
      this.stopListening(this.model)
      this.$el.remove()
    }
  })

  var renderWithFolder = function (folder) {
    if (folder) {
      var links = document.querySelector('#links'),
          bookmarkTemplate = document.querySelector('#bookmarks-template')

      chrome.bookmarks.getChildren(
        folder.id,
        function (results) {
          var bookmarksEl = document.importNode(bookmarkTemplate.content, true)

          if (results.length > 0) {
            results = _.sortBy(results, function (i) { return i.dateAdded })

            for (var result of results) {
              var link = new BookmarkModel(result),
                  view = new BookmarkView({model: link})
              bookmarksEl.querySelector('.bookmark-links').appendChild(view.render().el)
            }
          } else {
            // show "add bookmarks to FolderName" message
            var container = bookmarksEl.querySelector('.item-container'),
                bmLinks = bookmarksEl.querySelector('.bookmark-links')

            container.removeChild(bmLinks)

            var message = document.createElement('p')
            message.innerText = 'Add bookmarks to the folder named "' + folder.title + '" to see them here.'
            container.appendChild(message)
          }

          links.appendChild(bookmarksEl)
        }
      )
    }

  }

  chrome.bookmarks.search(
    'Reading List',
    function (results) {
      // console.log('[My New Tab bookmarks] got results', results)
      if (results.length == 1) {
        // console.log("[My New Tab] got Reading List", results[0])
        renderWithFolder(results[0])
        return
      } else if (results.length > 1) {
        // too many (shrug)
        for (var result of results) {
          if (typeof result.url === 'undefined') {
            // pick first folder and bail
            renderWithFolder(result)
            return
          }
        }
      } else {
        chrome.bookmarks.create(
          {
            'parentId': null,
            'title': 'Reading List'
          },
          function(newFolder) {
            console.log("[My New Tab] added folder: " + newFolder.title)
            renderWithFolder(newFolder)
          }
        )
      }
    }
  )
})()
