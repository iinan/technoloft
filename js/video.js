'use strict';

var videoIds = {
  video1: 'CoQVX9hAUk4',
  video2: 'bV5CmOfR450',
  video3: 'qu8sXPkBtnk'
}

function loadYouTubeIframeAPI() {
  var tag = document.createElement('script');

   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function loadYouTubeVideo(id) {
  var body = document.querySelector('body');
  var wrapper = document.getElementById(id);

  var player = new YT.Player(id + '-frame', {
    videoId: videoIds[id],
    suggestedQuality: 'hd1080',
    playerVars: {
      controls: 0,
      loop: 1,
      rel: 0,
      color: 'white',
      showinfo: 1,
      mute: 1,
      VQ: 'HD1080',
    },
    events: {
      onReady: function(event) {
        wrapper.classList.add('loaded');
      },
      onStateChange: function(event) {
        if (event.data == YT.PlayerState.ENDED) {
          player.seekTo(0);
          player.playVideo();
        }
      }
    }
  });

  function click() {
    if (wrapper.classList.contains('active')) {
      wrapper.classList.remove('active');

      /*
      if (body.classList.contains('mobile-portrait')) {
        wrapper.style = '';
      }
      */

      setTimeout(function() {
        player.pauseVideo();
      }, 150);
    }
    else {
      player.playVideo();

      /*
      if (body.classList.contains('mobile-portrait')) {
        wrapper.style = 'transform: rotate(90deg) scale(' + (window.innerHeight / window.innerWidth) + ')';
      }
      */

      setTimeout(function() {
        wrapper.classList.add('active');
      }, 150);
    }
  };

  wrapper.addEventListener('click', click);
}

function onYouTubeIframeAPIReady() {
  loadYouTubeVideo('video1');
  loadYouTubeVideo('video2');
  loadYouTubeVideo('video3');
}

(function() {
  if (window.addEventListener) window.addEventListener('load', loadYouTubeIframeAPI);
  else window.attachEvent('load', loadYouTubeIframeAPI);
})();
