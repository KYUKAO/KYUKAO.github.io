(function () {
  function prefetchNavigation() {
    var links = document.querySelectorAll('a[href]');
    var seen = {};

    links.forEach(function (link) {
      var rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.charAt(0) === '#' || /^(mailto:|tel:|https?:\/\/)/i.test(rawHref)) return;

      var url;
      try {
        url = new URL(rawHref, window.location.href);
      } catch (e) {
        return;
      }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      var key = url.pathname + url.search;
      if (seen[key]) return;
      seen[key] = true;

      var prefetched = false;
      var prefetch = function () {
        if (prefetched) return;
        prefetched = true;
        var hint = document.createElement('link');
        hint.rel = 'prefetch';
        hint.as = 'document';
        hint.href = url.href;
        document.head.appendChild(hint);
      };

      link.addEventListener('mouseenter', prefetch, { once: true, passive: true });
      link.addEventListener('focus', prefetch, { once: true, passive: true });
      link.addEventListener('touchstart', prefetch, { once: true, passive: true });
    });
  }

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

  // Mount the background before DOMContentLoaded so the first paint never
  // falls back to a plain dark page while the shared image layer is created.
  ensureBackground();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefetchNavigation, { once: true });
  } else {
    prefetchNavigation();
  }
})();
