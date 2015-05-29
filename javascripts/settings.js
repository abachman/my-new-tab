(function (root) {
  root.SettingsManager = Backbone.View.extend({
    initialize: function () {
      this.store = GetDatabaseObject('settings')
      _.extend(this, Backbone.Events)
    },

    $i: function (name) {
      return this.$('input[name=' + name +']')
    },

    setInput: function (name, value) {
      this.$i(name).val(value)
    },

    setCheck: function (name, value) {
      this.$i(name).prop('checked', !!value)
    },

    getInput: function (name) {
      return this.$i(name).val()
    },

    getCheck: function (name) {
      return this.$i(name).is(':checked')
    },

    render: function () {
      // in a modal
      var $m = TemplateModal('#modal-form-template')
      var $t = $template('#settings-form-template', $m.find('.modal-body'))
      this.setElement($m)

      this.$('.modal-title').text('Update Settings')

      // set current values
      this.setInput('weather_address', this.store.get('weather_address'))
      this.setInput('background_color', this.store.get('background_color'))
      this.setCheck('show_edit_by_default', this.store.get('show_edit_by_default'))
      this.setCheck('hide_weather', this.store.get('hide_weather'))

      return this
    },

    events: {
      'click .save-js': 'onUpdate',
      'change input[name=background_color],input[type=checkbox]': 'onChange'
    },

    onChange: function () {
      this.store.set('background_color', this.getInput('background_color'))
      this.store.set('show_edit_by_default', this.getCheck('show_edit_by_default'))
      this.store.set('hide_weather', this.getCheck('hide_weather'))

      this.trigger('changed')
    },

    onUpdate: function () {
      this.store.set('weather_address', this.getInput('weather_address'))
      this.store.set('background_color', this.getInput('background_color'))
      this.store.set('show_edit_by_default', this.getCheck('show_edit_by_default'))
      this.store.set('hide_weather', this.getCheck('hide_weather'))

      this.trigger('updated')
    },

    hide: function () {
      this.$el.modal('hide')
    }
  })
})(window)
