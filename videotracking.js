Redfive = (function(Redfive) {
  Redfive.Video = Redfive.Video || {};

  function trackVideo(ad, video, duration, object, trackCallback) {
    window.MOAT = null;
    // If there are MOAT configuration parameters, then we should implement MOAT tracking
    if(ad.config.params.moatClientLevel1) {
      MOAT = initMoatTracking(video.parentElement, {
        level1: ad.config.params.moatClientLevel1,
        level2: ad.config.params.moatClientLevel2,
        level3: ad.config.params.moatClientLevel3,
        level4: ad.config.params.moatClientLevel4,
        slicer1: ad.config.params.moatClientSlicer1,
        slicer2: ad.config.params.moatClientSlicer2
      }, duration, "verveinappvideo189175689658");

      if(ad.interstitial) {
        ad.interstitial.on("click:close", function() {
          reportToMoat("AdStopped");
        });
      }
      if(ad.expandable) {
        ad.expandable.on("click:close", function() {
          reportToMoat("AdStopped");
        });
      }
      if(window.vrvsdk && window.vrvsdk.subscribeDeviceAttributesListener) {
        vrvsdk.subscribeDeviceAttributesListener(function(deviceAttributes) {
          MOAT.dispatchEvent({
            type: "AdVolumeChange",
            adVolume: getVideoVolume(),
            deviceVolume: deviceAttributes.volume
          });
        });
      }
    }

    function reportToMoat(type) {
      if(MOAT) {
        if(window.vrvsdk && window.vrvsdk.getDeviceAttributes) {
          // fuck it
          window.type = type;
          window.getVideoVolume = getVideoVolume;
          vrvsdk.getDeviceAttributes(function(data) {
            MOAT.dispatchEvent({
              type: type,
              adVolume: getVideoVolume(),
              deviceVolume: data.deviceAttributes.volume
            });
          });
        }
        else {
          MOAT.dispatchEvent({
            type: type,
            adVolume: getVideoVolume(),
            deviceVolume: getVideoVolume()
          });
        }
      }
    }

    function getVideoVolume() {
      if(video.muted) {
        return 0;
      }
      return video.volume;
    }

    var trackedQuartiles = [];
    var highestMOATInterval = -1;

    video.addEventListener("click", function() {
      if(video.paused) {
        video.play();
      }
      else {
        video.pause();
      }
    });

    video.addEventListener("volumechange", function(event) {
      if(MOAT) {
        reportToMoat("AdVolumeChange");
      }
    });

    video.addEventListener("play", function() {
      if(object) {
        ad.logger.track("cta_video", {o: object});
      }
      else {
        ad.logger.track("cta_video");
      }
      if(MOAT) {
        reportToMoat("AdVideoPlaying");
      }
    });

    var seeking = false;
    video.addEventListener("seeking", function() {
      seeking = true;
    });

    video.addEventListener("seeked", function() {
      seeking = false;
      trackedQuartiles = [];
    });

    video.addEventListener("timeupdate", function() {
      // Don't fire tracking if user has seeked but video playback hasn't begun
      if(!video.paused && !seeking) {
        // We report quartiles as Verve events each time they occur,
        // even on replays (as indicated in NAT-5091)
        var currentTime = video.currentTime;
        // Give some fudge room for video100
        if(duration - currentTime <= 0.5) {
          currentTime = duration;
        }

        var quartile = Math.floor(currentTime / duration * 4) * 25;

        if(trackedQuartiles.indexOf(quartile) === -1) {
          trackedQuartiles.push(quartile);

          if(trackCallback) {
            trackCallback(interval);
          }
          if(object) {
            ad.logger.track("video" + quartile, {o: object});
          }
          else {
            ad.logger.track("video" + quartile);
          }
        }
      }

      // MOAT quartile tracking is left intact
      // Let's skip this logic if MOAT doesn't exist to save some cycles
      if(MOAT) {
        // video.played is a collection of ranges
        // if the user skipped in the video, grab the range with the
        // longest end point
        var longest = 0;
        for(var i = 0; i < video.played.length; i++) {
          if(video.played.end(i) > longest) {
            longest = video.played.end(i);
          }
        }

        // give some fudge room for video100
        if(duration - longest <= 0.5) {
          longest = duration;
        }

        // longest / duration is a decimal from 0-1
        // multiply by 4 and floor it to make it 0,1,2,3 or 4
        // multiply that by 25 and we get our interval
        var interval = Math.floor(longest / duration * 4) * 25;
        if(interval > highestMOATInterval) {
          highestMOATInterval = interval;
        }
        else {
          return;
        }

        if(interval === 0) {
          reportToMoat("AdVideoStart");
        }
        if(interval === 25) {
          reportToMoat("AdVideoFirstQuartile");
        }
        if(interval === 50) {
          reportToMoat("AdVideoMidpoint");
        }
        if(interval === 75) {
          reportToMoat("AdVideoThirdQuartile");
        }
        if(interval === 100) {
          reportToMoat("AdVideoComplete");
        }
      }
    });

    video.addEventListener("pause", function() {
      if(MOAT) {
        reportToMoat("AdPaused");
      }
    });

    video.addEventListener("ended", function() {
      trackedQuartiles = [];
      highestMOATInterval = -1;
    });
  }

  var trackWithDelayTimer = 0;

  function trackWithDelay(ad, video, duration, callback) {
    // Exit if we already started tracking
    if(trackWithDelayTimer) {
      return;
    }

    trackWithDelayTimer = setTimeout(function() {
      trackVideo(ad, video, duration, callback);
    }, 500);
  }

  // Add Verve CTA tracking to video elements
  // if duration isn't specified, pull it from video element
  // ammo: ad, video, optional duration, optional trackCallback called on each tracking event, optional object to add as o: param
  Redfive.Video.track = function(ammo) {
    var video = ammo.video;
    if(!video || !video.play || !video.pause) {
      throw new Error("ammo.video must be HTMLMediaElement");
    }

    var ad = ammo.ad;
    if(!ad || !ad.logger || !ad.logger.track) {
      throw new Error("ammo.ad must implement ad.logger.track");
    }

    var duration;
    if(ammo.duration) {
      duration = parseInt(ammo.duration, 10);
      trackWithDelay(ad, video, duration);
    }
    else {
      duration = video.duration;
      // duration is 0 if the element hasn't loaded, and NaN if element loaded but duration still unknown
      if(duration === 0 || isNaN(duration)) {
        video.addEventListener("durationchange", function() {
          if(video.duration > 0) {
            trackWithDelay(ad, video, video.duration, ammo.object, ammo.trackCallback);
          }
        });
      }
      else {
        trackWithDelay(ad, video, duration, ammo.object, ammo.trackCallback);
      }
    }
  };

  // MOAT's tracking init script
  /*Copyright (c) 2011-2016 Moat Inc. All Rights Reserved.*/
  function initMoatTracking(a,c,d,h,k){var f=document.createElement("script"),b=[];c={adData:{ids:c,duration:d,url:k},dispatchEvent:function(a){this.sendEvent?(b&&(b.push(a),a=b,b=!1),this.sendEvent(a)):b.push(a)}};d="_moatApi"+Math.floor(1E8*Math.random());var e,g;try{e=a.ownerDocument,g=e.defaultView||e.parentWindow}catch(l){e=document,g=window}g[d]=c;f.type="text/javascript";a&&a.insertBefore(f,a.childNodes[0]||null);f.src="https://z.moatads.com/"+h+"/moatvideo.js#"+d;return c}; // jshint ignore:line

  return Redfive;
})(window["Redfive"] || {});