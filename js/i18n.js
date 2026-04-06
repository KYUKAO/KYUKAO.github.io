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

  /* ================================================================
     Core: apply a language to the current page
     ================================================================ */
  function applyLang(lang) {
    const strings = CONTENT[lang];
    if (!strings) return;

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
    if (typeof renderResumeEntries  === 'function') renderResumeEntries(lang);
    if (typeof renderAboutInterests === 'function') renderAboutInterests(lang);
    if (typeof renderContactButtons === 'function') renderContactButtons(lang);
  }

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
    var projectGrid = document.getElementById('workGridProject');
    var artGrid = document.getElementById('workGridArt');
    if (!projectGrid || !artGrid) return;

    var works = CONTENT.works[lang];
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

    works.forEach(function (w) {
      var thumbContent = w.bgText
        ? '<div class="work-thumb-bg" style="' + w.bgStyle + '">' + w.bgText + '</div>'
        : '<div class="work-thumb-bg" style="' + w.bgStyle + '">[ 替换为作品截图 ]</div>';

      var videoBadge = w.hasVideo
        ? '<span class="video-badge">▶ VIDEO</span><div class="play-icon"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>'
        : '';

      var tagsHtml = w.tags.map(function (t) {
        return '<span class="work-tag">' + t + '</span>';
      }).join('');

      var linksHtml = (w.links || []).filter(function (l) {
        return isMediaHref(l && l.href);
      }).map(function (l) {
        return '<a href="' + l.href + '" class="work-link">' + l.label + '</a>';
      }).join('');

      var card = document.createElement('div');
      card.className = 'work-card reveal';
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
      targetGrid.insertBefore(card, targetNo);
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
