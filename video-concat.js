Redfive = (function(Redfive) {
  Redfive.Video = Redfive["Video"] || {};

  // Combine multiple video files into one psuedo-video canvas
  // ammo: 
  //  videos, an array of either URLs to video files or video elements
  //  width
  //  height
  //  poster, an image to render before the user hits play
  //  onLoad, function called when all the videos are loaded and ready
  Redfive.Video.concat = function(ammo) {
    var vids = ammo.videos;
    vids = vids.map(function(vid) {
      if(typeof vid == "string") { // assumed to be URL
        var vidElem = document.createElement("video");
        vidElem.src = vid;
        return vidElem;
      }

      return vid;
    });

    var totalLoadedVids = 0;
    var playing = false;

    var onLoad;

    function play() {
      console.log("play");
      if(totalLoadedVids < vids.length) {
        onLoad = function() { play(); };
      }
      else {
        playing = true;
        vids[getCurrentVideoIndex()].play();
      }
    }
    function pause() {
      console.log("pause");
      if(totalLoadedVids < vids.length) {
        onLoad = null;
      }
      else {
        playing = false;
        vids[getCurrentVideoIndex()].pause();
      }
    }

    vids.forEach(function(vid) {
      vid.preload = "auto";
      vid.addEventListener("durationchange", function() {
        if(vid.duration > 0) {
          totalLoadedVids++;
          if(totalLoadedVids >= vids.length) {
            buildDurationMap();
            if(onLoad) {
              onLoad();
            }
            if(ammo.onLoad) {
              ammo.onLoad();
            }
          }
        }
      });
    });

    var durationMap = [];
    function buildDurationMap() {
      var currentTotal = 0;
      for(var i = 0; i < vids.length; i++) {
        durationMap[i] = currentTotal;
        currentTotal += vids[i].duration;
      }
      console.log(durationMap);
    }

    var oldIndex = -1;

    function getCurrentVideoIndex() {
      var pos = vids.length;
      for(var i = 0; i < durationMap.length; i++) {
        if(durationMap[i] > progress / 1000) {
          pos = i - 1;
          break;
        }
      }
      if(pos < 0) {
        pos = 0;
      }
      if(pos >= vids.length) {
        pos = vids.length - 1;
      }
      if(pos != oldIndex) {
        console.log("Got new vidIndex", pos);
        if(vids[oldIndex]) {
          console.log("Paused old video");
          vids[oldIndex].pause()
        }
        vids[pos].play();
        oldIndex = pos;
      }
      return pos;
    }

    var poster = document.createElement("img");
    poster.src = ammo.poster;


    var canvas = document.createElement("canvas");
    canvas.width = ammo.width;
    canvas.height = ammo.height;

    var context = canvas.getContext("2d");

    var lastFrameTime = performance.now();
    var progress = 0;
    var animationFrame = function(time) {
      if(playing) {
        progress += time - lastFrameTime; 
        var vidI = getCurrentVideoIndex();
        var vid = vids[vidI];
        var start = durationMap[vidI];
        //vid.currentTime = progress - start * 1000;
        context.drawImage(vid, 0, 0, ammo.width, ammo.height);
      }
      else {
        // if we haven't hit play ever
        if(oldIndex === -1) {
          context.drawImage(poster, 0, 0, ammo.width, ammo.height);
        }
      }

      requestAnimationFrame(animationFrame);
      lastFrameTime = time;
    };


    canvas.addEventListener("click", function() {
      if(!playing) {
        play();
      }
      else {
        pause();
      }
    });

    animationFrame(performance.now());

    return canvas;
  };


  return Redfive;
})(window["Redfive"] || {});
