(function () {
  function ensureBackground() {
    var existingVideo = document.getElementById('portfolioBg') || document.querySelector('.scene-bg-video');
    if (existingVideo) existingVideo.style.display = 'none';

    if (!document.querySelector('.scene-bg-image')) {
      var image = document.createElement('div');
      image.className = 'scene-bg-image';
      image.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(image, document.body.firstChild);
    }

    if (!document.querySelector('.scene-bg-grade') && !document.querySelector('.portfolio-bg-grade')) {
      var grade = document.createElement('div');
      grade.className = 'scene-bg-grade';
      grade.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(grade, document.body.children[1] || null);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureBackground);
  } else {
    ensureBackground();
  }
})();
