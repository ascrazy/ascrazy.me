Highlighter = function() {
  this.queue = []
  this.paused = true
  this.className = 'active'
}

Highlighter.prototype = {
  _each: Array.prototype.forEach,
  unshift: function() {
    return this.queue.splice(0, 1)[0]
  },
  highlight: function(sectionId) {
    if (sectionId) {
      this.queue.push(sectionId)
      if (!this.paused)
        this.process()
    } else {
      this.resetHighlight()
    }
  },
  process: function() {
    var sectionId
    this.resetHighlight()
    if (sectionId = this.unshift()) {
      var element = document.getElementById(sectionId)

      if(element)
        element.className = element.className + ' ' + this.className
      
      if(this.queue.length)
        this.process()
    }
  },
  start: function() {
    this.paused = false
    this.process()
  },
  resetHighlight: function() {
    var _self = this
    this._each.call(document.querySelectorAll('section'), function(section){
      section.className = section.className.replace(_self.className, '')
    })
  }
}

new function(){
  var _hash = function() {
    return window.location.hash.replace(/#/, '')
  }
  var h = window.hh = new Highlighter()

  window.addEventListener('hashchange', function() {
    h.highlight(_hash())
  })

  document.addEventListener('DOMContentLoaded', function() {
    h.highlight(_hash())
    h.start()
  })
}



