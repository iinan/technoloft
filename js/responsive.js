'use strict';

(function() {
  var allClass = [
    'xxl', 'desktop', 'laptop',
    'tablet', 'tablet-portrait', 'tablet-landscape',
    'mobile', 'mobile-portrait', 'mobile-landscape',
  ];


  function init() {
    var body = document.querySelector('body');
    var __marker = document.createElement('div');
    __marker.classList.add('--responsive-marker');
    body.append(__marker);
  }


  function sync() {
    var body = document.querySelector('body');

    var classes = window.getComputedStyle(document.querySelector('.--responsive-marker'), ':before')
      .getPropertyValue('content').replace(/\"/g, '').split(',');

    var classMap = {};

    for (var index = 0; index < allClass.length; index++)
      classMap[allClass[index]] = false;

    for (var index = 0; index < classes.length; index++)
      classMap[classes[index].trim()] = true;

    for (var index = 0; index < allClass.length; index++) {
      var clazz = allClass[index];
      if (classMap[clazz] && !body.classList.contains(clazz))
        body.classList.add(clazz);

      if (!classMap[clazz] && body.classList.contains(clazz))
        body.classList.remove(clazz);
    }
  };

  if (window.addEventListener) {
    window.addEventListener('load', function(){init(); sync()});
    window.addEventListener('resize', sync);
  }
  else if (window.attachEvent) {
    window.attachEvent('load',  function(){init(); sync()});
    window.attachEvent('resize', sync);
  }
})();
