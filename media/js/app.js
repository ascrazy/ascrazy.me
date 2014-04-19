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
    if (sectionId && sectionId.length) {
      this.queue.push(sectionId)
      if (!this.paused)
        this.process()
    }
  },
  process: function() {
    var sectionId
    if (sectionId = this.unshift()) {
      console.log('process', sectionId)
      var element = document.getElementById(sectionId)
      if(element) {
        var _self = this
        this._each.call(document.querySelectorAll('section'), function(section){
          section.className = section.className.replace(_self.className, '')
        })
        element.className = element.className + ' ' + this.className
      }
      if(this.queue.length)
        console.log('process1')
        // this.process()
    }
  },
  start: function() {
    console.log('start')
    this.paused = false
    this.process()
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



