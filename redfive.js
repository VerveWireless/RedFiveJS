/*
*  RedFive JS
*
*  A creative toolkit for AdDev.
*
*-----------------------------------------------------------------*/

;(function(d, w) {

  // Callback Handler
  // optional: callbackDelay(ms)
  // 
  var callback = function(ammo, options) {
    if (ammo.callback && typeof ammo.callback === 'function') {
      if (ammo.callbackDelay) {
        setTimeout(function() {
          ammo.callback(options);
        }, ammo.callbackDelay);
      } else {
        ammo.callback(options);
      }
    }
  };

  //
  // Detect vendor prefix
  //
  var vendor = (function() {
    var styles = w.getComputedStyle(d.documentElement, '');
    var prefix = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    return {
      css: '-' + prefix + '-',
      js: prefix[0].toUpperCase() + prefix.substr(1)
    };
  })();

  //
  // The Rebel Base
  //
  function buildBase() {
    var Redfive = {};
    
    Redfive.version = '1.0.0';

    /*  
    * Transitions & Animations
    *--------------------------*/

    // blur
    // ammo: value, important, callback, callbackDelay
    Redfive.blur = function(element, ammo) {
      element.style.setProperty(vendor.css + 'filter', 'blur(' + ammo.value + ')', ammo.important ? 'important' : null);
      element.style.setProperty(vendor.css + 'transform', 'translate3d(0, 0, 0)');
      callback(ammo);
    };

    // fade
    // ammo: blur, value, speed, timing, important, callback, callbackDelay
    Redfive.fade = function(element, ammo) {
      if (ammo.blur) {
        element.style.setProperty(vendor.css + 'filter', 'blur(' + ammo.blur + ')');
      }
      element.style.setProperty(vendor.css + 'opacity', ammo.value);
      element.style.setProperty(vendor.css + 'transition-property', 'opacity, ' + vendor.css + 'filter');
      element.style.setProperty(vendor.css + 'transition-property', 'opacity', ammo.important ? 'important' : null);
      element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
      element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear' + ', ease-in-out');
      element.style.setProperty(vendor.css + 'transform', 'translate3d(0, 0, 0)');
      callback(ammo);
    };

    // rotate
    // ammo: x, y, speed, timing, important, callback, callbackDelay
    Redfive.rotate = function(element, ammo) {
      if (ammo.x && !ammo.y) {
        element.style.setProperty(vendor.css + 'transform', 'rotateX(' + ammo.x + ')', ammo.important ? 'important' : null);
      } else if (!ammo.x && ammo.y) {
        element.style.setProperty(vendor.css + 'transform', 'rotateY(' + ammo.y + ')', ammo.important ? 'important' : null);
      }
      element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform');
      element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
      element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      callback(ammo);
    };

    // rotate3d
    // ammo: x, y, z, angle, speed, timing, important, callback, callbackDelay
    Redfive.rotate3d = function(element, ammo) {
      if(ammo.x && ammo.y && ammo.z && ammo.angle) {
        element.style.setProperty(vendor.css + 'transform', 'rotate3d(' + ammo.x + ', ' + ammo.y + ', ' + ammo.z + ', ' + ammo.angle + ')', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform');
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
        callback(ammo);
      } else {
        console.log('RedFive[rotate3d]: Param missing.');
      }
    };

    // scale
    // ammo: x, y, speed, timing, important, callback, callbackDelay
    Redfive.scale = function(element, ammo) {
      if (ammo.x && !ammo.y) {
        element.style.setProperty(vendor.css + 'transform', 'scaleX(' + ammo.x + ')', ammo.important ? 'important' : null);
      } else if (!ammo.x && ammo.y) {
        element.style.setProperty(vendor.css + 'transform', 'scaleY(' + ammo.y + ')', ammo.important ? 'important' : null);
      }
      element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform');
      element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
      element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      callback(ammo);
    };

    // scale3d
    // ammo: x, y, speed, timing, important, callback, callbackDelay
    Redfive.scale3d = function(element, ammo) {
      if (ammo.x && ammo.y) {
        element.style.setProperty(vendor.css + 'transform', 'scale3d(' + ammo.x + ', ' + ammo.y + ', 1)', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform');
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
        callback(ammo);
      } else {
        console.log('RedFive[scale3d]: Param missing.');
      }
    };

    // slide
    // ammo: value, direction, speed, timing, important, callback, callbackDelay
    Redfive.slide = function(element, ammo) {
      if (ammo.direction == 'left') {
        element.style.setProperty(vendor.css + 'transform', 'translate3d(-' + ammo.value + ', 0, 0)');
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      } else if (ammo.direction == 'right') {
        element.style.setProperty(vendor.css + 'transform', 'translate3d(' + ammo.value + ', 0, 0)');
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      } else if (ammo.direction == 'up') {
        element.style.setProperty(vendor.css + 'transform', 'translate3d(0, -' + ammo.value + ', 0)');
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      } else if (ammo.direction == 'down') {
        element.style.setProperty(vendor.css + 'transform', 'translate3d(0, ' + ammo.value + ', 0)');
        element.style.setProperty(vendor.css + 'transition-property', vendor.css + 'transform', ammo.important ? 'important' : null);
        element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
        element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      }
      callback(ammo);
    };

    // general transition
    // ammo: property, value, speed, timing, important, callback, callbackDelay
    Redfive.transition = function(element, ammo) {
      element.style.setProperty(ammo.property, ammo.value);
      element.style.setProperty(vendor.css + 'transition-property', ammo.property);
      element.style.setProperty(vendor.css + 'transition-duration', ammo.speed);
      element.style.setProperty(vendor.css + 'transition-timing-function', ammo.timing ? ammo.timing : 'linear');
      element.style.setProperty(vendor.css + 'transform', 'translate3d(0, 0, 0)');
      callback(ammo);
    };

    /*  
    * Gaming & Other neat stuff
    *--------------------------*/

    // timer
    // ammo: seconds, onStart, onEnd
    Redfive.timer = function(element, ammo) {
      var time = ammo.seconds;
      var seconds;
      if (ammo.onStart && typeof ammo.onStart === 'function') {
        ammo.onStart();
      }
      var instance = function() {
        seconds = parseInt(time);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        if (time < 0) {
          element.innerHTML = ':00';
          if (ammo.onEnd && typeof ammo.onEnd === 'function') {
            ammo.onEnd();
          }
          console.log('RedFive[Timer]: '+ ammo.seconds + ' Second Timer Ended');
          return;
        }
        time--;
        element.innerHTML =  ':' + seconds;
        timeout = setTimeout(instance, 1000);
      };
      console.log('RedFive[Timer]: '+ ammo.seconds + ' Second Timer Started');
      return instance();
    };

    // racking points
    // ammo: value, callback
    var rackedPoints = 0;
    Redfive.rackPoints = function(ammo) {
      var new_points = rackedPoints + ammo.value++;
      if (new_points < 0) {
        new_points = 0;
      }
      rackedPoints = new_points;
      var bucket = [];
      bucket.push({
        points: rackedPoints
      });
      callback(ammo, bucket);
      console.log('RedFive[Racking Points]: ' + rackedPoints);
    };

    // collide
    // ammo: movedElement, onCollide
    Redfive.collide = function(element, ammo) {
      var checkCollide = function() {
        var rect1 = element.getBoundingClientRect();
        var rect2 = ammo.movedElement.getBoundingClientRect();
        return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
      };
      if (checkCollide(element, ammo.movedElement)) {
        if (ammo.onCollide && typeof ammo.onCollide === 'function') {
          ammo.onCollide();
          console.log('RedFive[Collision]: Elements are touching.');
        }
      }
    };

    // api request
    // ammo: api url, onReturn, onError
    Redfive.request = function(ammo) {
      var request = new XMLHttpRequest();
      request.open('GET', ammo.url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {          
          var data = JSON.parse(request.responseText);
          if (ammo.onReturn && typeof ammo.onReturn === 'function') {
            ammo.onReturn(data);
            console.log('RedFive[API Request]: Success');
          }
        } else {
          if (ammo.onError && typeof ammo.onError === 'function') {
            ammo.onError();
            console.log('RedFive[API Request]: ' + request.status);
          }
        }
      }.bind(this);
      request.onerror = function() {
        if (ammo.onError && typeof ammo.onError === 'function') {
          ammo.onError();
          console.log('RedFive[API Request]: Request Error.');
        }
      };
      request.send();
    };

    // os/platform detection
    // ammo: ios, android, desktop
    Redfive.detectOS = function(ammo) {
      var ios = navigator.userAgent.match(/iPhone|iPad|iPod/i);
      var android = navigator.userAgent.match(/Android/i);
      var desktop = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) === null;
      if (ios) {
        if (ammo.ios && typeof ammo.ios === 'function') {
          ammo.ios();
          console.log('RedFive[OS Detection]:  iOS');
        }
      } else if (android) {
        if (ammo.android && typeof ammo.android === 'function') {
          ammo.android();
          console.log('RedFive[OS Detection]:  Android');
        }
      } else if (desktop) {
        if (ammo.desktop && typeof ammo.desktop === 'function') {
          ammo.desktop();
          console.log('RedFive[OS Detection]:  Desktop');
        }
      } else {
        console.log('RedFive[OS Detection]:  Not iOS, Android or Desktop.');
      }
    };

    // send email
    // ammo: mailto, subject, body, onSend
    Redfive.email = function(ammo) {
      if (ammo.mailto && ammo.subject && ammo.body) {
        window.location.href = 'mailto:'+ ammo.mailto +'?subject=' + encodeURIComponent(ammo.subject) + '&body=' + ammo.body;
        if (ammo.onSend && typeof ammo.onSend === 'function') {
          ammo.onSend();
        }
        console.log('RedFive[Email]:  Email Created.');
      } else {
        console.log('RedFive[Email]:  You\'re missing a param.');
      }
    };

    // create a list obj
    // ammo: value, getList
    var list = [];
    Redfive.list = function(ammo) {
      list.push({
        value: ammo.value
      });
      localStorage.setItem('TheList', JSON.stringify(list));
      if (ammo.getList && typeof ammo.getList === 'function') {
        ammo.getList(list);
        console.log('RedFive[List]:  Your list has ' + list.length + ' values.');
      }
    };

    // touch vs mouse events
    // ammo: touch(), mouse()
    Redfive.touchMouse = function(ammo) {
      if ('ontouchstart' in w) {
        if (ammo.touch && typeof ammo.touch === 'function') {
          ammo.touch();
          console.log('RedFive[touchMouse]: Touch Supported.');
        }
      } else {
        if (ammo.mouse && typeof ammo.mouse === 'function') {
          ammo.mouse();
          console.log('RedFive[touchMouse]: Touch Not Supported.');
        }
      }
    };

    // catch harrison
    // if you can...
    Redfive.catchHarrison = function() {};
    Redfive.catchHarrison.toString = function() {
      console.log('');
      console.log('%c  ', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;');
      setTimeout(function() {
        console.log('%cOMG he\'s Running! Hurry!', 'font-family:Verdana, sans-serif;');
        console.log('');
      }, 1000);
      setTimeout(function() {
        console.log('%c  %c  ', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;-webkit-transform: scaleX(-1);', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;');
      }, 2500);
      setTimeout(function() {
        console.log('');
        console.log('%cAlmost got him!', 'font-family:Verdana, sans-serif;');
        console.log('');
      }, 4000);
      setTimeout(function() {
        console.log('%c  %c  %c  ', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/runner.png"\);background-size:cover;background-repeat:no-repeat;');
      }, 5500);
      setTimeout(function() {
        console.log('');
        console.log('%c  %c YES! Got him! %c  ', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/tada.png"\);background-size:cover;background-repeat:no-repeat;', 'font-family:Verdana, sans-serif;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/tada.png"\);background-size:cover;background-repeat:no-repeat;');
      }, 7000);
      setTimeout(function() {
        console.log('');
        console.log('Achievement Unlocked');
        console.log('%c  %c  %c  %c  ', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/eggplant.png"\);background-size:cover;background-repeat:no-repeat;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/eggplant.png"\);background-size:cover;background-repeat:no-repeat;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/eggplant.png"\);background-size:cover;background-repeat:no-repeat;', 'background-image:url(\"http://www.emoji-cheat-sheet.com/graphics/emojis/eggplant.png"\);background-size:cover;background-repeat:no-repeat;');
      }, 8000);
      return " ";
    };
    
    return Redfive;
  }
  
  // Check for RedFive
  var checkBase = (typeof(Redfive)) === 'undefined' ? w.Redfive = buildBase() : console.log('RedFive has already gone in, but crashed! Alert your local AdDev\'r.');

  // This has been...
  console.log('');
  console.log('%cRedFive %cJS', 'font-family:Verdana,sans-serif;font-size:34px;color:#b20000;text-shadow:0 1px 3px #b20000;', 'font-family:Verdana,sans-serif;font-size:34px;color:#555;text-shadow:0 1px 3px #555;');
  console.log('%cAn AdDev Production', 'font-family:Verdana,sans-serif;font-size:16px;color:#aaa;');
  console.log('');
  console.log('%cWanna catch Harrison? Peruse the source to find out how!', 'font-family:Verdana,sans-serif;');
  console.log('');

})(document, window);