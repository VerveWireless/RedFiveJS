Redfive = (function(Redfive) {
  Redfive.Video = Redfive.Video || {};


  function trackVideo(ad, video, duration) {
    var highestInterval = -1;

    video.addEventListener("click", function() {
      if(video.paused) {
        video.play();
      }
      else {
        video.pause();
      }
    });

    video.addEventListener("play", function() {
      ad.logger.track("cta_video");
    });

    video.addEventListener("pause", function() {
      // video.played is a collection of ranges
      // if the user skipped in the video, grab the range with the
      // longest end point
      var longest = 0;
      for(var i = 0; i < video.played.length; i++) {
        if(video.played.end(i) > longest)
          longest = video.played.end(i);
      }

      // give some fudge room for video100
      if(duration - longest <= 0.5)
        longest = duration;

      // longest / duration is a decimal from 0-1
      // multiply by 4 and floor it to make it 0,1,2,3 or 4
      // multiply that by 25 and we get our interval
      var interval = Math.floor(longest / duration * 4) * 25;

      // we should only send a given interval once, and if it's the highest
      if(interval > highestInterval) {
        highestInterval = interval;
        ad.logger.track("video" + interval);
      }
    });

    video.addEventListener("ended", function() {
      highestInterval = -1;
    });
  }

  // Add Verve CTA tracking to video elements
  // if duration isn't specified, pull it from video element
  // ammo: ad, video, optional duration
  Redfive.Video.track = function(ammo) {
    var video = ammo.video;
    if(!video || !(video instanceof HTMLMediaElement)) {
      throw new Error("ammo.video must be HTMLMediaElement");
    }

    var ad = ammo.ad;
    if(!ad || !ad.logger || !ad.logger.track) {
      throw new Error("ammo.ad must implement ad.logger.track");
    }

    var duration;
    if(ammo.duration) {
      duration = parseInt(ammo.duration, 10);
      trackVideo(ad, video, duration);
    }
    else {
      duration = video.duration;
      // duration is 0 if the element hasn't loaded, and NaN if element loaded but duration still unknown
      if(duration === 0 || isNaN(duration)) {
        video.addEventListener("durationchange", function() {
          if(video.duration > 0) {
            trackVideo(ad, video, video.duration);
          }
        });
      }
    }
  };

  return Redfive;
})(window["Redfive"] || {});
