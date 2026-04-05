/**
 * typography.js — Single source of truth for all font & text styling
 *
 * HOW TO USE:
 *   Edit the TYPOGRAPHY object below, then save.
 *   Changes apply to ALL pages automatically.
 *
 * LOAD ORDER in each HTML page:
 *   <script src="typography.js"></script>   ← first
 *   <script src="content.js"></script>
 *   <script src="i18n.js"></script>
 */

/* ================================================================
   ✏️  EDIT HERE — Typography Configuration
   ================================================================ */
const TYPOGRAPHY = {

  /* ── Google Fonts
     Set to '' to disable (use system fonts only)            */
  googleFonts: 'https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;600;700&display=swap',

  /* ── Font Families
     fontBody    : used on home / portfolio / about pages
     fontDisplay : used on resume page headings & nav logo
     fontResume  : used on resume page body text             */
  fontBody:    "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontDisplay: "'Syncopate', sans-serif",
  fontResume:  "'Inter', sans-serif",

  /* ── Base Body                                            */
  lineHeightBody: '1.6',

  /* ── Navigation                                          */
  navLogoSize:      '1.2rem',
  navLogoWeight:    '700',
  navLogoSpacing:   '0.15em',

  navLinkSize:      '0.85rem',
  navLinkSpacing:   '0.10em',

  navToggleSize:    '0.75rem',   // lang-toggle button
  navToggleSpacing: '0.10em',

  /* ── Resume Nav (uses fontDisplay)                       */
  resumeNavLogoSize:    '1rem',
  resumeNavLogoSpacing: '0.20em',
  resumeNavLinkSize:    '0.65rem',
  resumeNavLinkSpacing: '0.15em',
  resumeNavToggleSize:  '0.60rem',

  /* ── Eyebrow / Section Label
     Small ALL-CAPS labels above titles                     */
  eyebrowSize:    '0.75rem',
  eyebrowSpacing: '0.30em',
  labelSize:      '0.70rem',
  labelSpacing:   '0.30em',

  /* ── Hero Title (home page big KYUKAO text)              */
  heroTitleSize:    'clamp(3.5rem, 10vw, 9rem)',
  heroTitleWeight:  '800',
  heroTitleSpacing: '0.08em',
  heroTitleLineH:   '1',

  /* ── Hero Subtitle                                       */
  heroSubtitleSize:    'clamp(1rem, 2.5vw, 1.4rem)',
  heroSubtitleSpacing: '0.20em',

  /* ── About-page hero name                                */
  heroNameSize:   'clamp(2.5rem, 6vw, 5.5rem)',
  heroNameWeight: '800',
  heroNameSpacing: '0.05em',
  heroNameLineH:  '1.1',

  /* ── Section Title (h2 under section labels)             */
  sectionTitleSize:    'clamp(1.8rem, 4vw, 3rem)',
  sectionTitleWeight:  '700',
  sectionTitleSpacing: '0.05em',

  /* ── Portfolio page big header title                     */
  pageTitleSize:    'clamp(2rem, 5vw, 4rem)',
  pageTitleWeight:  '700',
  pageTitleSpacing: '0.05em',

  /* ── Section Description text                            */
  sectionDescSize:   '1rem',     // inherits body; override if needed
  sectionDescLineH:  '1.8',

  /* ── Stat Block numbers & labels (home page)             */
  statNumSize:      '2.5rem',
  statNumWeight:    '800',
  statLabelSize:    '0.80rem',
  statLabelSpacing: '0.10em',

  /* ── Buttons                                             */
  btnSize:    '0.85rem',
  btnSpacing: '0.15em',

  /* ── Work Cards (portfolio & home featured)              */
  workCardTagSize:    '0.65rem',
  workCardTagSpacing: '0.15em',
  workCardTitleSize:  '1rem',
  workCardTitleWeight:'600',

  workTagSize:    '0.65rem',
  workTagSpacing: '0.12em',
  workTitleSize:  '1.05rem',
  workTitleWeight:'600',
  workDescSize:   '0.82rem',
  workDescLineH:  '1.6',
  workLinkSize:   '0.75rem',
  workLinkSpacing:'0.10em',

  /* ── Skill Tags (home page)                              */
  skillTagSize:    '0.80rem',
  skillTagSpacing: '0.10em',

  /* ── Footer                                              */
  footerSize:        '0.80rem',
  footerLogoWeight:  '700',
  footerLogoSpacing: '0.15em',

  /* ── About Page — Info List                              */
  infoListSize:  '0.88rem',
  infoTextSize:  '0.92rem',
  infoTextLineH: '1.9',
  infoKeySpacing:'0.05em',
  contactBtnLabelSize: '0.65rem',
  contactBtnValSize:   '0.82rem',

  /* ── About Page — Interests Grid                         */
  interestTitleSize:  '0.90rem',
  interestTitleWeight:'600',
  interestDescSize:   '0.78rem',
  interestDescLineH:  '1.6',

  /* ── About Page — Block Title                            */
  blockTitleSize:    '0.70rem',
  blockTitleSpacing: '0.30em',

  /* ── Resume Specific                                     */
  resumeSectionTitleSize:    '1.25rem',
  resumeSectionTitleWeight:  '700',
  resumeSectionTitleSpacing: '0.20em',
  resumeTagSize:    '0.75rem',
  resumeBtnSize:    '10px',
  resumeBtnSpacing: '0.20em',
  resumeBodyLineH:  '1.6',

  /* ── Scroll Hint                                         */
  scrollHintSize:    '0.70rem',
  scrollHintSpacing: '0.20em',
};

/* ================================================================
   🔧  Engine — do not edit below unless you know what you're doing
   ================================================================ */
(function () {
  'use strict';

  /* ── 1. Inject Google Fonts link ── */
  function injectFonts() {
    if (!TYPOGRAPHY.googleFonts) return;
    if (document.querySelector('link[data-ty-fonts]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = TYPOGRAPHY.googleFonts;
    link.setAttribute('data-ty-fonts', '1');
    document.head.insertBefore(link, document.head.firstChild);
  }

  /* ── 2. Build CSS string from config ── */
  function buildCSS() {
    var T = TYPOGRAPHY;

    /* Detect resume page (index.html) by presence of .font-sync class usage */
    var isResume = !!document.querySelector('body.antialiased') ||
                   !!document.querySelector('.font-sync');

    var css = '';

    if (isResume) {
      /* ───── RESUME PAGE (index.html, Tailwind + custom CSS) ───── */
      css += [
        /* Body */
        'body { font-family: ' + T.fontResume + ' !important; line-height: ' + T.resumeBodyLineH + ' !important; }',

        /* font-sync class (Syncopate headings) */
        '.font-sync { font-family: ' + T.fontDisplay + ' !important; }',

        /* Nav logo */
        '.nav-logo { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavLogoSize + ' !important; letter-spacing: ' + T.resumeNavLogoSpacing + ' !important; }',

        /* Nav links */
        '.nav-links a { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavLinkSize + ' !important; letter-spacing: ' + T.resumeNavLinkSpacing + ' !important; }',

        /* Lang toggle */
        '.lang-toggle { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavToggleSize + ' !important; }',

        /* Section title */
        '.section-title { font-size: ' + T.resumeSectionTitleSize + ' !important; font-weight: ' + T.resumeSectionTitleWeight + ' !important; letter-spacing: ' + T.resumeSectionTitleSpacing + ' !important; }',

        /* Tags */
        '.tag { font-size: ' + T.resumeTagSize + ' !important; }',

        /* Contact button */
        '.btn-contact { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeBtnSize + ' !important; letter-spacing: ' + T.resumeBtnSpacing + ' !important; }',
      ].join('\n');

    } else {
      /* ───── HOME / PORTFOLIO / ABOUT (custom CSS pages) ───── */
      css += [
        /* Body */
        'body { font-family: ' + T.fontBody + '; line-height: ' + T.lineHeightBody + '; }',

        /* Nav logo */
        '.nav-logo { font-size: ' + T.navLogoSize + '; font-weight: ' + T.navLogoWeight + '; letter-spacing: ' + T.navLogoSpacing + '; }',

        /* Nav links */
        '.nav-links a { font-size: ' + T.navLinkSize + '; letter-spacing: ' + T.navLinkSpacing + '; }',

        /* Lang toggle */
        '.lang-toggle { font-size: ' + T.navToggleSize + '; letter-spacing: ' + T.navToggleSpacing + '; }',

        /* Eyebrow (hero page) */
        '.hero-eyebrow { font-size: ' + T.eyebrowSize + '; letter-spacing: ' + T.eyebrowSpacing + '; }',

        /* Section label (small pink ALL-CAPS) */
        '.section-label { font-size: ' + T.labelSize + '; letter-spacing: ' + T.labelSpacing + '; }',

        /* Hero title */
        '.hero-title { font-size: ' + T.heroTitleSize + '; font-weight: ' + T.heroTitleWeight + '; letter-spacing: ' + T.heroTitleSpacing + '; line-height: ' + T.heroTitleLineH + '; }',

        /* Hero subtitle */
        '.hero-subtitle { font-size: ' + T.heroSubtitleSize + '; letter-spacing: ' + T.heroSubtitleSpacing + '; }',

        /* About-page hero name */
        '.hero-name { font-size: ' + T.heroNameSize + '; font-weight: ' + T.heroNameWeight + '; letter-spacing: ' + T.heroNameSpacing + '; line-height: ' + T.heroNameLineH + '; }',

        /* Hero role (about page) */
        '.hero-role { font-size: ' + T.navLinkSize + '; letter-spacing: ' + T.navLogoSpacing + '; }',

        /* Section title */
        '.section-title { font-size: ' + T.sectionTitleSize + '; font-weight: ' + T.sectionTitleWeight + '; letter-spacing: ' + T.sectionTitleSpacing + '; }',

        /* Portfolio page big title */
        '.page-header .section-title { font-size: ' + T.pageTitleSize + '; font-weight: ' + T.pageTitleWeight + '; letter-spacing: ' + T.pageTitleSpacing + '; }',

        /* Section description */
        '.section-desc { font-size: ' + T.sectionDescSize + '; line-height: ' + T.sectionDescLineH + '; }',

        /* Scroll hint */
        '.scroll-hint { font-size: ' + T.scrollHintSize + '; letter-spacing: ' + T.scrollHintSpacing + '; }',

        /* Stat numbers & labels */
        '.stat-num { font-size: ' + T.statNumSize + '; font-weight: ' + T.statNumWeight + '; }',
        '.stat-label { font-size: ' + T.statLabelSize + '; letter-spacing: ' + T.statLabelSpacing + '; }',

        /* Buttons */
        '.btn-primary { font-size: ' + T.btnSize + '; letter-spacing: ' + T.btnSpacing + '; }',
        '.btn-outline  { font-size: ' + T.btnSize + '; letter-spacing: ' + T.btnSpacing + '; }',

        /* Home featured work-card overlay */
        '.work-card-tag   { font-size: ' + T.workCardTagSize + '; letter-spacing: ' + T.workCardTagSpacing + '; }',
        '.work-card-title { font-size: ' + T.workCardTitleSize + '; font-weight: ' + T.workCardTitleWeight + '; }',

        /* Portfolio work cards */
        '.work-tag   { font-size: ' + T.workTagSize + '; letter-spacing: ' + T.workTagSpacing + '; }',
        '.work-title { font-size: ' + T.workTitleSize + '; font-weight: ' + T.workTitleWeight + '; }',
        '.work-desc  { font-size: ' + T.workDescSize + '; line-height: ' + T.workDescLineH + '; }',
        '.work-link  { font-size: ' + T.workLinkSize + '; letter-spacing: ' + T.workLinkSpacing + '; }',

        /* Skill tags */
        '.skill-tag { font-size: ' + T.skillTagSize + '; letter-spacing: ' + T.skillTagSpacing + '; }',

        /* Footer */
        'footer { font-size: ' + T.footerSize + '; }',
        '.footer-logo { font-weight: ' + T.footerLogoWeight + '; letter-spacing: ' + T.footerLogoSpacing + '; }',

        /* About — info list */
        '.info-list li { font-size: ' + T.infoListSize + '; }',
        '.info-text     { font-size: ' + T.infoTextSize + '; line-height: ' + T.infoTextLineH + '; }',
        '.info-key      { letter-spacing: ' + T.infoKeySpacing + '; }',
        '.contact-btn-label { font-size: ' + T.contactBtnLabelSize + '; }',
        '.contact-btn-val   { font-size: ' + T.contactBtnValSize + '; }',

        /* About — interests */
        '.interest-title { font-size: ' + T.interestTitleSize + '; font-weight: ' + T.interestTitleWeight + '; }',
        '.interest-desc  { font-size: ' + T.interestDescSize + '; line-height: ' + T.interestDescLineH + '; }',

        /* About — block title */
        '.block-title { font-size: ' + T.blockTitleSize + '; letter-spacing: ' + T.blockTitleSpacing + '; }',
      ].join('\n');
    }

    return css;
  }

  /* ── 3. Inject <style> tag into <head> ── */
  function injectStyles() {
    var existing = document.getElementById('ty-styles');
    if (existing) existing.remove();

    var style = document.createElement('style');
    style.id = 'ty-styles';
    style.textContent = buildCSS();
    document.head.appendChild(style);
  }

  /* ── 4. Auto-run ── */
  injectFonts();

  /* Run immediately if DOM is ready, otherwise wait */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectStyles);
  } else {
    injectStyles();
  }

  /* Expose for manual re-trigger if needed */
  window.applyTypography = injectStyles;

}());
