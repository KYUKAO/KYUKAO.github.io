/**
 * i18n.js — Language switching logic
 *
 * Depends on: content.js (must be loaded first)
 *
 * Public API:
 *   window.applyLang(lang)   — apply 'zh' or 'en' immediately
 *   window.toggleLang()      — flip between zh/en
 *
 * Auto-init: reads localStorage on DOMContentLoaded, defaults to 'zh'.
 */

(function () {
  'use strict';
  var _portfolioVideoBound = false;

  function _escAttr(v) {
    return String(v || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function _normalizeMediaUrl(href) {
    var h = String(href || '').trim();
    if (!h || h === '#') return h;

    var raw = h.match(/^https:\/\/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/[^\/]+\/(.+)$/i);
    if (raw) {
      var owner = raw[1];
      var repo = raw[2];
      var path = raw[3];
      if (/\.github\.io$/i.test(repo)) return 'https://' + owner.toLowerCase() + '.github.io/' + path;
      return 'https://' + owner.toLowerCase() + '.github.io/' + repo + '/' + path;
    }

    var blob = h.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/[^\/]+\/(.+)$/i);
    if (blob) {
      var bOwner = blob[1];
      var bRepo = blob[2];
      var bPath = blob[3];
      if (/\.github\.io$/i.test(bRepo)) return 'https://' + bOwner.toLowerCase() + '.github.io/' + bPath;
      return 'https://' + bOwner.toLowerCase() + '.github.io/' + bRepo + '/' + bPath;
    }
    return h;
  }

  function _isDirectVideo(href) {
    return /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(String(href || '').trim());
  }

  function _getPreviewVideoUrl(links) {
    if (!Array.isArray(links)) return '';
    for (var i = 0; i < links.length; i++) {
      var h = _normalizeMediaUrl(links[i] && links[i].href);
      if (_isDirectVideo(h)) return h;
    }
    return '';
  }

  function _ensurePortfolioVideoModal() {
    if (document.getElementById('portfolioVideoModal')) return;
    var modal = document.createElement('div');
    modal.id = 'portfolioVideoModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.82);display:none;align-items:center;justify-content:center;padding:20px;z-index:1200;';
    modal.innerHTML =
      '<div style="width:min(1100px,100%);">' +
        '<div style="display:flex;justify-content:flex-end;margin-bottom:10px;">' +
          '<button type="button" id="portfolioVideoClose" style="border:1px solid #444;background:#111;color:#eee;padding:6px 12px;cursor:pointer;">关闭</button>' +
        '</div>' +
        '<video id="portfolioVideoPlayer" controls autoplay playsinline style="width:100%;max-height:80vh;background:#000;"></video>' +
      '</div>';
    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) _closePortfolioVideoModal();
    });
    var closeBtn = document.getElementById('portfolioVideoClose');
    if (closeBtn) closeBtn.addEventListener('click', _closePortfolioVideoModal);
  }

  function _openPortfolioVideoModal(url) {
    if (!url) return;
    _ensurePortfolioVideoModal();
    var modal = document.getElementById('portfolioVideoModal');
    var player = document.getElementById('portfolioVideoPlayer');
    if (!modal || !player) return;
    player.src = url;
    modal.style.display = 'flex';
    var p = player.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  function _closePortfolioVideoModal() {
    var modal = document.getElementById('portfolioVideoModal');
    var player = document.getElementById('portfolioVideoPlayer');
    if (player) {
      player.pause();
      player.removeAttribute('src');
      player.load();
    }
    if (modal) modal.style.display = 'none';
  }

  function _bindPortfolioVideoInteractions() {
    if (_portfolioVideoBound) return;
    _portfolioVideoBound = true;
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.js-video-open');
      if (!trigger) return;
      e.preventDefault();
      _openPortfolioVideoModal(trigger.getAttribute('data-video-url'));
    });
  }

  function _t(field, lang) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.en || '';
  }

  function _buildWorksFromConfig(lang) {
    if (typeof CONFIG === 'undefined' || !Array.isArray(CONFIG.works)) return [];
    return CONFIG.works.map(function (w) {
      var links = Array.isArray(w.links) ? w.links : [];
      var tags = Array.isArray(w.tags) ? w.tags : [];
      var bgStyle = w.image
        ? "background-image: url('" + w.image + "'); background-size: cover; background-position: center;"
        : '';
      return {
        category: w.category || '',
        group: w.group || ((w.category === 'tool' || w.category === 'code') ? 'project' : 'art'),
        bgStyle: bgStyle,
        hasVideo: !!w.hasVideo,
        tags: tags,
        title: _t(w.title, lang),
        desc: _t(w.desc, lang),
        links: links.map(function (l) {
          return {
            type: (l && l.type) || '',
            label: _t(l && l.label, lang),
            href: (l && l.href) || ''
          };
        })
      };
    });
  }

  /* ================================================================
     Core: apply a language to the current page
     ================================================================ */
  function applyLang(lang) {
    const strings = (typeof CONTENT !== 'undefined' && CONTENT && CONTENT[lang]) ? CONTENT[lang] : {};

    // 1. Swap all data-i18n text nodes / innerHTML
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        // Use innerHTML so we can embed <span> tags in values
        el.innerHTML = strings[key];
      }
    });

    // 2. Update the toggle button label & aria
    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.textContent = strings['nav.toggle'] || (lang === 'zh' ? 'EN' : '中文');
      btn.setAttribute('aria-label', 'Switch language');
      btn.dataset.currentLang = lang;
    }

    // 3. Update <html lang> attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // 4. Persist
    try { localStorage.setItem('lang', lang); } catch (e) {}

    // 5. Render dynamic sections if helpers are registered
    if (typeof renderPortfolioCards === 'function') renderPortfolioCards(lang);
    if (typeof renderFeaturedWorks === 'function') renderFeaturedWorks(lang);
    if (typeof renderResumeEntries  === 'function') renderResumeEntries(lang);
    if (typeof renderAboutInterests === 'function') renderAboutInterests(lang);
    if (typeof renderContactButtons === 'function') renderContactButtons(lang);
  }

  /* ================================================================
     Home page — render featured works from CONFIG/CONTENT
     ================================================================ */
  window.renderFeaturedWorks = function (lang) {
    var grid = document.getElementById('featuredWorksGrid');
    if (!grid) return;

    var works = (typeof CONTENT !== 'undefined' && CONTENT && CONTENT.works && CONTENT.works[lang])
      ? CONTENT.works[lang]
      : _buildWorksFromConfig(lang);
    if (!works) return;

    var featured = works.filter(function (w) {
      return _getPreviewVideoUrl(w.links);
    }).slice(0, 3);

    grid.innerHTML = featured.map(function (w) {
      var previewVideo = _getPreviewVideoUrl(w.links);
      var tag = Array.isArray(w.tags) && w.tags.length ? w.tags[0] : '';
      return '<a class="work-card reveal visible" href="portfolio.html">' +
        '<video class="work-card-video" src="' + _escAttr(previewVideo) + '" muted playsinline loop autoplay preload="metadata"></video>' +
        '<div class="work-card-overlay">' +
          '<p class="work-card-tag">' + tag + '</p>' +
          '<p class="work-card-title">' + w.title + '</p>' +
        '</div>' +
      '</a>';
    }).join('');
  };

  /* ================================================================
     Toggle helper
     ================================================================ */
  function toggleLang() {
    var current = (document.getElementById('langToggle') || {}).dataset.currentLang
      || localStorage.getItem('lang')
      || 'zh';
    applyLang(current === 'zh' ? 'en' : 'zh');
  }

  /* ================================================================
     Build and inject the toggle button into every navbar
     ================================================================ */
  function injectToggleButton() {
    var nav = document.querySelector('nav');
    if (!nav || document.getElementById('langToggle')) return;

    var btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.addEventListener('click', toggleLang);

    // Insert before the hamburger toggle (if present), otherwise append
    var hamburger = nav.querySelector('.nav-toggle');
    if (hamburger) {
      nav.insertBefore(btn, hamburger);
    } else {
      nav.appendChild(btn);
    }
  }

  /* ================================================================
     Portfolio page — render work cards from CONTENT.works
     ================================================================ */
  window.renderPortfolioCards = function (lang) {
    _ensurePortfolioVideoModal();
    _bindPortfolioVideoInteractions();

    var projectGrid = document.getElementById('workGridProject');
    var artGrid = document.getElementById('workGridArt');
    if (!projectGrid || !artGrid) return;

    var works = (typeof CONTENT !== 'undefined' && CONTENT && CONTENT.works && CONTENT.works[lang])
      ? CONTENT.works[lang]
      : _buildWorksFromConfig(lang);
    if (!works) return;

    var noResultsProject = document.getElementById('noResultsProject');
    var noResultsArt = document.getElementById('noResultsArt');

    projectGrid.querySelectorAll('.work-card').forEach(function (c) { c.remove(); });
    artGrid.querySelectorAll('.work-card').forEach(function (c) { c.remove(); });

    function isMediaHref(href) {
      var h = String(href || '').trim();
      if (!h || h === '#') return false;
      return /youtu\.be|youtube\.com|vimeo\.com|\.mp4($|\?)|\.webm($|\?)|\.mov($|\?)|\.m4v($|\?)|\.ogv($|\?)/i.test(h);
    }
    function isDirectVideo(href) {
      return /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(String(href || '').trim());
    }
    function getPreviewVideoUrl(links) {
      if (!Array.isArray(links)) return '';
      for (var i = 0; i < links.length; i++) {
        var h = _normalizeMediaUrl(links[i] && links[i].href);
        if (isDirectVideo(h)) return h;
      }
      return '';
    }

    works.forEach(function (w) {
      var previewVideo = getPreviewVideoUrl(w.links);
      var thumbContent = previewVideo
        ? '<video class="work-thumb-video" src="' + _escAttr(previewVideo) + '" muted playsinline loop autoplay preload="metadata"></video>'
        : (w.bgText
          ? '<div class="work-thumb-bg" style="' + w.bgStyle + '">' + w.bgText + '</div>'
          : '<div class="work-thumb-bg" style="' + w.bgStyle + '">[ 替换为作品截图 ]</div>');

      var videoBadge = (w.hasVideo && previewVideo)
        ? '<span class="video-badge">VIDEO</span><a href="' + _escAttr(previewVideo) + '" class="play-icon js-video-open" data-video-url="' + _escAttr(previewVideo) + '" aria-label="播放视频"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></a>'
        : '';

      var tagsHtml = (Array.isArray(w.tags) ? w.tags : []).map(function (t) {
        return '<span class="work-tag">' + t + '</span>';
      }).join('');

      var linksHtml = (w.links || []).filter(function (l) {
        var href = l && l.href;
        return href && href !== '#';
      }).map(function (l) {
        var href = _normalizeMediaUrl(l && l.href);
        if (isDirectVideo(href)) {
          return '<a href="' + _escAttr(href) + '" class="work-link js-video-open" data-video-url="' + _escAttr(href) + '">' + l.label + '</a>';
        }
        return '<a href="' + _escAttr(href) + '" class="work-link" target="_blank" rel="noopener">' + l.label + '</a>';
      }).join('');

      var card = document.createElement('div');
      card.className = 'work-card reveal visible';
      card.dataset.category = w.category;
      card.dataset.group = w.group || ((w.category === 'tool' || w.category === 'code') ? 'project' : 'art');
      card.innerHTML =
        '<div class="work-thumb">' +
          thumbContent +
          videoBadge +
        '</div>' +
        '<div class="work-info">' +
          '<div class="work-tags">' + tagsHtml + '</div>' +
          '<h3 class="work-title">' + w.title + '</h3>' +
          '<p class="work-desc">' + w.desc + '</p>' +
          '<div class="work-links">' + linksHtml + '</div>' +
        '</div>';

      var targetGrid = card.dataset.group === 'project' ? projectGrid : artGrid;
      var targetNo = card.dataset.group === 'project' ? noResultsProject : noResultsArt;
      if (targetNo) targetGrid.insertBefore(card, targetNo);
      else targetGrid.appendChild(card);
    });

    if (noResultsProject) noResultsProject.style.display = projectGrid.querySelectorAll('.work-card').length ? 'none' : 'block';
    if (noResultsArt) noResultsArt.style.display = artGrid.querySelectorAll('.work-card').length ? 'none' : 'block';

    // Re-attach IntersectionObserver for new cards
    if (typeof revealObserver !== 'undefined') {
      document.querySelectorAll('#workGridProject .reveal, #workGridArt .reveal').forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  };

  /* ================================================================
     Resume page — render education + work + indie from CONTENT
     ================================================================ */
  window.renderResumeEntries = function (lang) {
    _renderEducation(lang);
    _renderWorkExp(lang);
    _renderIndieProjects(lang);
  };

  function _renderEducation(lang) {
    var container = document.getElementById('educationList');
    if (!container) return;
    var entries = CONTENT.education[lang];
    if (!entries) return;
    container.innerHTML = entries.map(function (e) {
      return '<div class="glass-card">' +
        '<div class="flex flex-col md:flex-row justify-between mb-4 items-start">' +
          '<h3 class="text-xl font-bold text-white uppercase italic tracking-tight">' + e.school + '</h3>' +
          '<span class="text-slate-500 font-sync text-xs uppercase pt-1">' + e.period + '</span>' +
        '</div>' +
        '<p class="text-pink text-sm italic font-semibold mb-4">' + e.degree + '</p>' +
        '<p class="text-sm leading-relaxed">' + e.detail + '</p>' +
        (e.award ? '<p class="text-sm font-bold border-t border-white/5 pt-4 mt-4 tracking-wide italic uppercase">' + e.award + '</p>' : '') +
      '</div>';
    }).join('');
  }

  function _renderWorkExp(lang) {
    var container = document.getElementById('workExpList');
    if (!container) return;
    var entries = CONTENT.workExp[lang];
    if (!entries) return;
    container.innerHTML = entries.map(function (e) {
      var projectLine = e.projectUrl
        ? '<p class="text-[10px] font-sync text-slate-500 mb-6 uppercase tracking-widest italic border-b border-white/5 pb-2">Project: <a href="' + e.projectUrl + '" target="_blank" class="underline">' + e.projectUrl + '</a></p>'
        : '';
      var bullets = e.bullets.map(function (b) {
        return '<li>' + b + '</li>';
      }).join('');
      return '<div class="glass-card">' +
        '<div class="flex flex-col md:flex-row justify-between mb-4 items-start">' +
          '<h3 class="text-xl font-bold text-white uppercase italic tracking-tight">' + e.company + '</h3>' +
          '<span class="text-slate-500 font-sync text-xs uppercase pt-1">' + e.period + '</span>' +
        '</div>' +
        '<p class="text-pink text-sm italic font-semibold mb-6 uppercase tracking-wider">' + e.role + '</p>' +
        projectLine +
        '<ul class="space-y-4 text-sm list-disc ml-4">' + bullets + '</ul>' +
      '</div>';
    }).join('');
  }

  function _renderIndieProjects(lang) {
    var container = document.getElementById('indieProjectList');
    if (!container) return;
    var entries = CONTENT.indieProjects[lang];
    if (!entries) return;
    container.innerHTML = entries.map(function (e) {
      var awardLine = e.award
        ? '<p class="text-[10px] font-sync text-pink mb-4 uppercase tracking-widest italic border-b border-pink/10 pb-2">' + e.award + '</p>'
        : '';
      var projectLine = e.projectUrl
        ? '<p class="text-[10px] font-sync text-slate-500 mb-6 uppercase tracking-widest italic border-b border-white/5 pb-2">Project: <a href="' + e.projectUrl + '" target="_blank" class="underline">' + e.projectUrl + '</a></p>'
        : '';
      var bullets = e.bullets.map(function (b) {
        return '<li>' + b + '</li>';
      }).join('');
      return '<div class="glass-card">' +
        '<div class="flex flex-col md:flex-row justify-between mb-4 items-start">' +
          '<h3 class="text-xl font-bold text-white uppercase italic tracking-tight underline decoration-pink/20">' + e.title + '</h3>' +
          '<span class="text-slate-500 font-sync text-xs uppercase pt-1">' + e.period + '</span>' +
        '</div>' +
        '<p class="text-pink text-sm italic font-semibold mb-6 uppercase tracking-wider">' + e.role + '</p>' +
        awardLine +
        projectLine +
        '<ul class="space-y-4 text-sm list-disc ml-4">' + bullets + '</ul>' +
      '</div>';
    }).join('');
  }

  /* ================================================================
     About page — render interests grid from CONTENT.interests
     ================================================================ */
  window.renderAboutInterests = function (lang) {
    var grid = document.getElementById('interestsGrid');
    if (!grid) return;
    var items = CONTENT.interests[lang];
    if (!items) return;
    grid.innerHTML = items.map(function (item) {
      return '<div class="interest-item">' +
        '<div class="interest-icon">' + item.icon + '</div>' +
        '<h3 class="interest-title">' + item.title + '</h3>' +
        '<p class="interest-desc">' + item.desc + '</p>' +
      '</div>';
    }).join('');
  };

  window.renderContactButtons = function (lang) {
    var contacts = CONFIG.contact || {};
    var map = [
      { key: 'email', selector: '#contact-email', prefix: 'mailto:' },
      { key: 'github', selector: '#contact-github' },
      { key: 'artstation', selector: '#contact-artstation' },
      { key: 'linkedin', selector: '#contact-linkedin' },
    ];

    map.forEach(function (item) {
      var btn = document.querySelector(item.selector);
      if (!btn) return;
      var rawValue = contacts[item.key];
      var value = rawValue ? String(rawValue).trim() : '';
      var normalized = value.toLowerCase();
      if (!value || normalized === 'n/a') {
        btn.style.display = 'none';
        btn.removeAttribute('href');
        return;
      }
      btn.style.display = '';
      var href = item.prefix ? item.prefix + value : value;
      btn.href = href;
      var valEl = btn.querySelector('.contact-btn-val');
      if (valEl) {
        valEl.textContent = value;
        valEl.setAttribute('data-contact-key', item.key);
      }
    });
  };

  /* ================================================================
     Expose globals + auto-init
     ================================================================ */
  window.applyLang = applyLang;
  window.toggleLang = toggleLang;

  document.addEventListener('DOMContentLoaded', function () {
    injectToggleButton();
    var saved = 'en';
    try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
    applyLang(saved);
  });

}());
