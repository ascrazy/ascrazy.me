window.Highlighter = (function(){
  var klass = function() {
    this.queue = [];
    this.paused = true;
    this.className = 'active';
  }

  klass.prototype = {
    _each: Array.prototype.forEach,
    unshift: function() {
      return this.queue.splice(0, 1)[0];
    },
    highlight: function(sectionId) {
      if (sectionId) {
        this.queue.push(sectionId);
        if (!this.paused)
          this.process();
      } else {
        this.resetHighlight();
      }
    },
    process: function() {
      var sectionId;
      this.resetHighlight();
      if (sectionId = this.unshift()) {
        var element = document.getElementById(sectionId);

        if(element)
          element.className = element.className + ' ' + this.className;
        
        if(this.queue.length)
          this.process();
      }
    },
    start: function() {
      this.paused = false;
      this.process();
    },
    resetHighlight: function() {
      var _self = this;
      this._each.call(document.querySelectorAll('section'), function(section){
        section.className = section.className.replace(_self.className, '');
      })
    }
  };

  klass.hash = function() {
    return window.location.hash.replace(/#/, '');
  };

  return klass;
})();

window.Menu = (function(){
  var TRANSITION_END_EVENTS = [
    'transitionend',
    'webkitTransitionEnd',
    'oTransitionEnd',
    'otransitionend'
  ];

  var CLOSE_MENU_ON = [
    'click',
    'touchstart'
  ]
  var klass = function(button, menu, main) {
    this.button = button;
    this.menu = menu;
    this.main = main;

    this.button.addEventListener('click', this.toggle.bind(this));

    this._bindEvents(this.menu, TRANSITION_END_EVENTS, function(){
      if (!this.isOpened()) {
        this.menu.style.display = "none";
      }
    }.bind(this))

    this._bindEvents(this.main, CLOSE_MENU_ON, function(event){
      if (event.target != this.button && this.isOpened()) {
        this.close();
      }
    }.bind(this));
  }


  klass.prototype = {
    className: 'opened',
    isOpened: function() {
      return new RegExp(this.className).test(this.menu.className);
    },
    open: function() {
      this.menu.style.display = "block"
      this.menu.style.height = document.body.scrollHeight.toString() + "px";
      this.menu.className = this.className;
    },
    close: function() {
      this.menu.className = "";
    },
    toggle: function(event) {
      event.stopPropagation()
      if(this.isOpened()) {
        this.close();
      } else {
        this.open();
      }
    },
    _bindEvents: function(element, eventsList, callback) {
      for (var i = 0; i < eventsList.length; ++i) {
        eventName = eventsList[i];
        element.addEventListener(eventName, callback);
      };
    },
    _documentHeight: function() {
      var body = document.body,
          html = document.documentElement;

      return Math.max(
        body.scrollHeight, 
        body.offsetHeight, 
        html.clientHeight, 
        html.scrollHeight, 
        html.offsetHeight);
    }
  };

  return klass;
})();

(function(){
  var h, m;
  
  h = new Highlighter();

  window.addEventListener('hashchange', function() {
    h.highlight(Highlighter.hash());
  });

  document.addEventListener('DOMContentLoaded', function() {    
    m = new Menu(
      document.querySelector('button.opener'),
      document.querySelector('#main-header'),
      document.querySelector('#main-header + main'));

    h.highlight(Highlighter.hash());
    h.start();
  });

})();



