
// ════════════════════════════════════════════
//  TYPOGRAPHY STATE
// ════════════════════════════════════════════
let TY = {
  googleFonts: 'https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;600;700&display=swap',
  fontBody:    "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fontDisplay: "'Syncopate', sans-serif",
  fontResume:  "'Inter', sans-serif",
  lineHeightBody: '1.6',
  navLogoSize: '1.2rem', navLogoWeight: '700', navLogoSpacing: '0.15em',
  navLinkSize: '0.85rem', navLinkSpacing: '0.10em',
  navToggleSize: '0.75rem', navToggleSpacing: '0.10em',
  resumeNavLogoSize: '1rem', resumeNavLogoSpacing: '0.20em',
  resumeNavLinkSize: '0.65rem', resumeNavLinkSpacing: '0.15em',
  resumeNavToggleSize: '0.60rem',
  eyebrowSize: '0.75rem', eyebrowSpacing: '0.30em',
  labelSize: '0.70rem', labelSpacing: '0.30em',
  heroTitleSize: 'clamp(3.5rem, 10vw, 9rem)', heroTitleWeight: '800',
  heroTitleSpacing: '0.08em', heroTitleLineH: '1',
  heroSubtitleSize: 'clamp(1rem, 2.5vw, 1.4rem)', heroSubtitleSpacing: '0.20em',
  heroNameSize: 'clamp(2.5rem, 6vw, 5.5rem)', heroNameWeight: '800',
  heroNameSpacing: '0.05em', heroNameLineH: '1.1',
  sectionTitleSize: 'clamp(1.8rem, 4vw, 3rem)', sectionTitleWeight: '700', sectionTitleSpacing: '0.05em',
  pageTitleSize: 'clamp(2rem, 5vw, 4rem)', pageTitleWeight: '700', pageTitleSpacing: '0.05em',
  sectionDescSize: '1rem', sectionDescLineH: '1.8',
  statNumSize: '2.5rem', statNumWeight: '800',
  statLabelSize: '0.80rem', statLabelSpacing: '0.10em',
  btnSize: '0.85rem', btnSpacing: '0.15em',
  workCardTagSize: '0.65rem', workCardTagSpacing: '0.15em',
  workCardTitleSize: '1rem', workCardTitleWeight: '600',
  workTagSize: '0.65rem', workTagSpacing: '0.12em',
  workTitleSize: '1.05rem', workTitleWeight: '600',
  workDescSize: '0.82rem', workDescLineH: '1.6',
  workLinkSize: '0.75rem', workLinkSpacing: '0.10em',
  skillTagSize: '0.80rem', skillTagSpacing: '0.10em',
  footerSize: '0.80rem', footerLogoWeight: '700', footerLogoSpacing: '0.15em',
  infoListSize: '0.88rem', infoTextSize: '0.92rem', infoTextLineH: '1.9',
  infoKeySpacing: '0.05em', contactBtnLabelSize: '0.65rem', contactBtnValSize: '0.82rem',
  interestTitleSize: '0.90rem', interestTitleWeight: '600',
  interestDescSize: '0.78rem', interestDescLineH: '1.6',
  blockTitleSize: '0.70rem', blockTitleSpacing: '0.30em',
  resumeSectionTitleSize: '1.25rem', resumeSectionTitleWeight: '700', resumeSectionTitleSpacing: '0.20em',
  resumeTagSize: '0.75rem', resumeBtnSize: '10px', resumeBtnSpacing: '0.20em',
  resumeBodyLineH: '1.6',
  scrollHintSize: '0.70rem', scrollHintSpacing: '0.20em',
};

function populateTY() {
  const set = (id, val) => { const el=document.getElementById(id); if(el) el.value=val||''; };
  const setSelect = (id, val) => {
    const el=document.getElementById(id); if(!el) return;
    // try to match an existing option, else add a custom one
    let found = false;
    for(let opt of el.options) { if(opt.value===val){opt.selected=true;found=true;break;} }
    if(!found) { const opt=document.createElement('option'); opt.value=val; opt.text='自定义: '+val; opt.selected=true; el.appendChild(opt); }
  };
  setSelect('ty_fontBody', TY.fontBody);
  set('ty_fontDisplay', TY.fontDisplay);
  set('ty_fontResume', TY.fontResume);
  set('ty_googleFonts', TY.googleFonts);
  set('ty_lineHeightBody', TY.lineHeightBody);
  set('ty_resumeBodyLineH', TY.resumeBodyLineH);
  set('ty_heroTitleSize', TY.heroTitleSize);
  set('ty_heroTitleWeight', TY.heroTitleWeight);
  set('ty_heroSubtitleSize', TY.heroSubtitleSize);
  set('ty_heroNameSize', TY.heroNameSize);
  set('ty_navLogoSize', TY.navLogoSize);
  set('ty_navLinkSize', TY.navLinkSize);
  set('ty_sectionTitleSize', TY.sectionTitleSize);
  set('ty_sectionDescSize', TY.sectionDescSize);
  set('ty_statNumSize', TY.statNumSize);
  set('ty_skillTagSize', TY.skillTagSize);
  set('ty_workTitleSize', TY.workTitleSize);
  set('ty_workDescSize', TY.workDescSize);
  set('ty_resumeSectionTitleSize', TY.resumeSectionTitleSize);
  set('ty_resumeTagSize', TY.resumeTagSize);
}

// ════════════════════════════════════════════
//  STATE — mirrors CONFIG structure
// ════════════════════════════════════════════
let S = {
  name:     { en:'', zh:'', alias:'' },
  role:     { en:'', zh:'' },
  location: { en:'', zh:'' },
  experience:{ en:'', zh:'' },
  languages:{ en:'', zh:'' },
  status:   { en:'', zh:'' },
  contact:  { email:'', github:'', artstation:'', linkedin:'', tel:'' },
  copyright:'',
  home: {
    subtitle: { en:'', zh:'' },
    about: { title:{en:'',zh:''}, desc:{en:'',zh:''} },
    stats: [],
    skills: [],
  },
  about: {
    bio:  { en:'', zh:'' },
    desc: { en:'', zh:'' },
    photo:'',
    interests: [],
  },
  works: [],
  education: [],
  workExp: [],
  indieProjects: [],
};

// ════════════════════════════════════════════
//  UNDO / REDO STACK
// ════════════════════════════════════════════
const UNDO_MAX = 50;
let undoStack = [];
let redoStack = [];
let undoLocked = false; // prevent recording during restore

function snapshot() {
  if (undoLocked) return;
  const snap = JSON.stringify(S);
  if (undoStack.length && undoStack[undoStack.length-1] === snap) return;
  undoStack.push(snap);
  if (undoStack.length > UNDO_MAX) undoStack.shift();
  redoStack = []; // clear redo on new change
  updateUndoButtons();
}

function undo() {
  if (undoStack.length < 2) return;
  redoStack.push(undoStack.pop()); // current → redo
  const prev = undoStack[undoStack.length-1];
  undoLocked = true;
  Object.assign(S, JSON.parse(JSON.stringify(JSON.parse(prev))));
  // Deep replace S
  const parsed = JSON.parse(prev);
  for (const k in parsed) S[k] = parsed[k];
  renderAll();
  undoLocked = false;
  updateUndoButtons();
  toast('⟲ 已撤销', 'success');
}

function redo() {
  if (!redoStack.length) return;
  const next = redoStack.pop();
  undoStack.push(next);
  undoLocked = true;
  const parsed = JSON.parse(next);
  for (const k in parsed) S[k] = parsed[k];
  renderAll();
  undoLocked = false;
  updateUndoButtons();
  toast('⟳ 已重做', 'success');
}

function updateUndoButtons() {
  const u = document.getElementById('btn_undo');
  const r = document.getElementById('btn_redo');
  if (u) u.disabled = undoStack.length < 2;
  if (r) r.disabled = !redoStack.length;
}

// ════════════════════════════════════════════
//  AUTO-BACKUP (every 30s)
// ════════════════════════════════════════════
function autoBackup() {
  try {
    const backup = { ts: Date.now(), S: JSON.parse(JSON.stringify(S)) };
    localStorage.setItem('kyukao_backup', JSON.stringify(backup));
  } catch(e) {}
}

function checkBackup() {
  try {
    const raw = localStorage.getItem('kyukao_backup');
    if (!raw) return;
    const backup = JSON.parse(raw);
    const ageMin = (Date.now() - backup.ts) / 60000;
    const d = new Date(backup.ts);
    document.getElementById('restoreDesc').textContent =
      `检测到 ${d.toLocaleString()} 的自动备份（${ageMin < 1 ? '刚刚' : Math.round(ageMin) + ' 分钟前'}），是否恢复？`;
    // Only offer restore if backup has actual data
    const hasData = backup.S && (backup.S.name && backup.S.name.en || (backup.S.works && backup.S.works.length));
    if (hasData) openModal('restoreModal');
  } catch(e) {}
}

function restoreBackup() {
  try {
    const raw = localStorage.getItem('kyukao_backup');
    if (!raw) return;
    const backup = JSON.parse(raw);
    undoLocked = true;
    for (const k in backup.S) S[k] = backup.S[k];
    renderAll();
    undoLocked = false;
    snapshot();
    toast('✓ 备份已恢复', 'success');
  } catch(e) {
    toast('✗ 恢复失败：' + e.message, 'error');
  }
  closeModal('restoreModal');
}

// ════════════════════════════════════════════
//  STATUS BAR
// ════════════════════════════════════════════
function updateStatus() {
  const set = (id, n) => { const el=document.getElementById(id); if(el) el.textContent=n; };
  set('st_works', S.works.length);
  set('st_work6', S.workExp.length);
  set('st_edu', S.education.length);
  set('st_indie', S.indieProjects.length);
}

// ════════════════════════════════════════════
//  MODAL HELPERS
// ════════════════════════════════════════════
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
}
// Click backdrop to close
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('show');
  }
});

// ════════════════════════════════════════════
//  CONFIRM DELETE HELPER
// ════════════════════════════════════════════
function confirmDelete(title, desc, onConfirm) {
  document.getElementById('confirmTitle').textContent = title || '确认删除';
  document.getElementById('confirmDesc').textContent = desc || '此操作不可撤销，确认继续？';
  const btn = document.getElementById('confirmOkBtn');
  btn.onclick = () => { closeModal('confirmModal'); onConfirm(); };
  openModal('confirmModal');
}

// ════════════════════════════════════════════
//  FSA HANDLE PERSISTENCE (IndexedDB)
// ════════════════════════════════════════════
const FSA_DB_NAME = 'kyukao_editor';
const FSA_DB_VER  = 1;
const FSA_STORE   = 'handles';
const FSA_KEY     = 'config_js_handle';

function openHandleDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(FSA_DB_NAME, FSA_DB_VER);
    req.onupgradeneeded = e => e.target.result.createObjectStore(FSA_STORE);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

async function saveHandle(handle) {
  try {
    const db = await openHandleDB();
    const tx = db.transaction(FSA_STORE, 'readwrite');
    tx.objectStore(FSA_STORE).put(handle, FSA_KEY);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch(e) { /* IndexedDB 不可用时静默失败 */ }
}

async function loadHandle() {
  try {
    const db = await openHandleDB();
    const handle = await new Promise((res, rej) => {
      const req = db.transaction(FSA_STORE, 'readonly').objectStore(FSA_STORE).get(FSA_KEY);
      req.onsuccess = e => res(e.target.result);
      req.onerror   = e => rej(e.target.error);
    });
    db.close();
    return handle || null;
  } catch(e) { return null; }
}

async function clearHandle() {
  try {
    const db = await openHandleDB();
    const tx = db.transaction(FSA_STORE, 'readwrite');
    tx.objectStore(FSA_STORE).delete(FSA_KEY);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });
    db.close();
  } catch(e) {}
}

// ════════════════════════════════════════════
//  EXPORT DIALOG
// ════════════════════════════════════════════
async function showExportDialog() {
  // 尝试读取上次保存的路径并更新 UI
  if (window.showSaveFilePicker) {
    const handle = await loadHandle();
    const hint = document.getElementById('fsaPathHint');
    const resetBtn = document.getElementById('fsaResetBtn');
    if (hint) {
      if (handle) {
        hint.textContent = '上次路径：' + handle.name;
        hint.style.display = 'block';
        if (resetBtn) resetBtn.style.display = 'inline-block';
      } else {
        hint.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';
      }
    }
  }
  openModal('exportModal');
}

async function doExportFSA() {
  closeModal('exportModal');
  if (!window.showSaveFilePicker) {
    toast('⚠ 当前浏览器不支持 File System Access API，自动改用下载', 'error');
    doExportDownload();
    return;
  }
  try {
    // 尝试复用上次保存的 handle
    let handle = await loadHandle();
    if (handle) {
      // 验证权限（用户可能已撤销）
      const perm = await handle.queryPermission({ mode: 'readwrite' });
      if (perm !== 'granted') {
        const req = await handle.requestPermission({ mode: 'readwrite' });
        if (req !== 'granted') handle = null; // 权限被拒绝，重新选择
      }
    }
    if (!handle) {
      // 首次或权限失效：弹出文件选择框
      handle = await window.showSaveFilePicker({
        suggestedName: 'config.js',
        types: [{ description: 'JavaScript', accept: {'text/javascript': ['.js']} }],
      });
      await saveHandle(handle); // 记住这次选的路径
    }
    const writable = await handle.createWritable();
    await writable.write(buildConfigJs());
    await writable.close();
    toast('✓ config.js 已保存至 ' + handle.name + '！', 'success');
  } catch(e) {
    if (e.name !== 'AbortError') toast('✗ 保存失败：' + e.message, 'error');
  }
}

async function fsaResetPath() {
  await clearHandle();
  const hint = document.getElementById('fsaPathHint');
  const resetBtn = document.getElementById('fsaResetBtn');
  if (hint) hint.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'none';
  toast('✓ 已清除保存路径，下次将重新选择', 'success');
}

function doExportDownload() {
  closeModal('exportModal');
  exportConfig();
}

// ════════════════════════════════════════════
//  EXPAND / COLLAPSE ALL
// ════════════════════════════════════════════
function expandAll(containerId) {
  document.querySelectorAll(`#${containerId} .card-body`).forEach(b => {
    b.classList.add('open');
    const arr = b.previousElementSibling && b.previousElementSibling.querySelector('.card-toggle');
    if (arr) arr.classList.add('open');
  });
}
function collapseAll(containerId) {
  document.querySelectorAll(`#${containerId} .card-body`).forEach(b => {
    b.classList.remove('open');
    const arr = b.previousElementSibling && b.previousElementSibling.querySelector('.card-toggle');
    if (arr) arr.classList.remove('open');
  });
}

// ════════════════════════════════════════════
//  TRANSLATION (Google Translate free endpoint)
// ════════════════════════════════════════════
async function translateText(text, targetLang) {
  if (!text || !text.trim()) return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  // Response structure: [[["translated","original",null,null,1],...],...]
  return data[0].map(seg => seg[0]).join('');
}

async function translateField(fromId, toId, targetLang) {
  const fromEl = document.getElementById(fromId);
  const toEl   = document.getElementById(toId);
  if (!fromEl || !toEl) return;
  const text = fromEl.value.trim();
  if (!text) { toast('⚠ 源字段为空，无法翻译', 'error'); return; }

  // Find the button that triggered this (nearest .translate-btn)
  const btn = document.activeElement;
  if (btn && btn.classList.contains('translate-btn')) btn.classList.add('loading');

  try {
    const result = await translateText(text, targetLang);
    toEl.value = result;
    toEl.dispatchEvent(new Event('input', { bubbles: true }));
    toast('✓ 翻译完成', 'success');
  } catch(e) {
    if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
      toast('✗ 翻译失败：CORS 限制。请用 VS Code Live Server 插件打开编辑器后重试', 'error');
    } else {
      toast('✗ 翻译失败：' + e.message, 'error');
    }
  } finally {
    if (btn && btn.classList.contains('translate-btn')) btn.classList.remove('loading');
  }
}


function copyField(fromId, toId) {
  const from = document.getElementById(fromId);
  const to = document.getElementById(toId);
  if (!from || !to) return;
  to.value = from.value;
  to.dispatchEvent(new Event('input', {bubbles:true}));
  toast('✓ 已复制到另一侧', 'success');
}

// ════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ════════════════════════════════════════════
document.addEventListener('keydown', function(e) {
  // Ignore when typing in input/textarea
  const tag = document.activeElement && document.activeElement.tagName;
  const inInput = (tag === 'INPUT' || tag === 'TEXTAREA');

  if (e.ctrlKey && e.key === 's') { e.preventDefault(); showExportDialog(); return; }
  if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); return; }
  if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) { e.preventDefault(); redo(); return; }
  if (!inInput && e.key === '?') { openModal('helpModal'); }
});

// ════════════════════════════════════════════
//  PANEL SWITCH
// ════════════════════════════════════════════
function switchPanel(id, el) {
  document.querySelectorAll('.panel').forEach(p => { p.classList.remove('active'); p.classList.remove('anim'); });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const panel = document.getElementById(id);
  panel.classList.add('active');
  // Add animation class on next frame so display:block has already taken effect
  requestAnimationFrame(() => panel.classList.add('anim'));
  el.classList.add('active');
  if (id === 'p4') {
    renderWorkMediaLibraryPanel();
    if (!uploadedAssetsCache.length) refreshWorkMediaLibrary(false);
  }
}

// ════════════════════════════════════════════
//  BIND §1 simple fields
// ════════════════════════════════════════════
function bindSimple() {
  const map = [
    ['name_en','name','en'],['name_zh','name','zh'],['name_alias','name','alias'],
    ['role_en','role','en'],['role_zh','role','zh'],
    ['location_en','location','en'],['location_zh','location','zh'],
    ['experience_en','experience','en'],['experience_zh','experience','zh'],
    ['languages_en','languages','en'],['languages_zh','languages','zh'],
    ['status_en','status','en'],['status_zh','status','zh'],
    ['contact_email','contact','email'],['contact_tel','contact','tel'],
    ['contact_github','contact','github'],['contact_linkedin','contact','linkedin'],
    ['contact_artstation','contact','artstation'],
    ['home_subtitle_en','home.subtitle','en'],['home_subtitle_zh','home.subtitle','zh'],
    ['home_about_title_en','home.about.title','en'],['home_about_title_zh','home.about.title','zh'],
    ['home_about_desc_en','home.about.desc','en'],['home_about_desc_zh','home.about.desc','zh'],
    ['about_bio_en','about.bio','en'],['about_bio_zh','about.bio','zh'],
    ['about_desc_en','about.desc','en'],['about_desc_zh','about.desc','zh'],
    ['about_photo','about','photo'],
  ];
  map.forEach(([id, path, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      const parts = path.split('.');
      let obj = S;
      parts.forEach(p => obj = obj[p]);
      if (key) obj[key] = el.value;
      else S[path] = el.value;
    });
  });
  // copyright special
  document.getElementById('copyright').addEventListener('input', e => { S.copyright = e.target.value; });

  // Global snapshot on any input change in main area (covers rendered cards too)
  document.getElementById('main').addEventListener('input', function() {
    snapshot();
    updateStatus();
  });
}

// ════════════════════════════════════════════
//  STATS (§2)
// ════════════════════════════════════════════
function renderStats() {
  const c = document.getElementById('stats_list');
  c.innerHTML = '';
  S.home.stats.forEach((stat, i) => {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-number">${i+1}</div>
        <div class="card-title">统计卡片 <small>${stat.num || '—'}</small></div>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeStat(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="bilingual">
          <div class="form-group">
            <label class="form-label">数字</label>
            <input type="text" value="${esc(stat.num)}" oninput="S.home.stats[${i}].num=this.value;updateCardTitle(this,'${i}');_s()">
          </div>
          <div class="form-group"><label class="form-label">&nbsp;</label></div>
        </div>
        <div class="bilingual">
          <div class="form-group">
            <label class="form-label">标签 <span class="lang-badge lang-en">EN</span></label>
            <input type="text" value="${esc(stat.label.en)}" oninput="S.home.stats[${i}].label.en=this.value">
          </div>
          <div class="form-group">
            <label class="form-label">标签 <span class="lang-badge lang-zh">ZH</span></label>
            <input type="text" value="${esc(stat.label.zh)}" oninput="S.home.stats[${i}].label.zh=this.value">
          </div>
        </div>
      </div>`;
    c.appendChild(d);
  });
}
function addStat() {
  S.home.stats.push({ num:'', label:{en:'',zh:''} });
  renderStats();
  snapshot();
  // auto-expand last card
  setTimeout(() => {
    const cards = document.querySelectorAll('#stats_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeStat(i) {
  confirmDelete('删除统计卡片', `确认删除第 ${i+1} 个统计卡片？`, () => { S.home.stats.splice(i,1); renderStats(); snapshot(); });
}

// ════════════════════════════════════════════
//  SKILLS chips (§2)
// ════════════════════════════════════════════
function renderSkills() {
  const wrap = document.getElementById('skills_chips');
  wrap.querySelectorAll('.chip').forEach(c => c.remove());
  const inp = document.getElementById('skills_input');
  S.home.skills.forEach((sk, i) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.innerHTML = `<span>${esc(sk)}</span><button class="chip-del" onclick="removeSkill(${i})">×</button>`;
    wrap.insertBefore(chip, inp);
  });
}
function addSkill(e) {
  if (e.key !== 'Enter') return;
  const v = e.target.value.trim();
  if (!v) return;
  S.home.skills.push(v);
  e.target.value = '';
  renderSkills();
  snapshot();
}
function removeSkill(i) {
  confirmDelete('删除技能标签', `确认删除标签「${S.home.skills[i]}」？`, () => { S.home.skills.splice(i,1); renderSkills(); snapshot(); });
}

// ════════════════════════════════════════════
//  INTERESTS (§3)
// ════════════════════════════════════════════
function renderInterests() {
  const c = document.getElementById('interests_list');
  c.innerHTML = '';
  S.about.interests.forEach((it, i) => {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-number">${it.icon||'⭐'}</div>
        <div class="card-title">${it.title.zh||it.title.en||'新兴趣方向'}</div>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeInterest(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label class="form-label">图标 Emoji</label>
          <input type="text" value="${esc(it.icon)}" oninput="S.about.interests[${i}].icon=this.value;renderInterests()" style="width:80px">
        </div>
        <div class="bilingual">
          <div class="form-group">
            <label class="form-label">标题 <span class="lang-badge lang-en">EN</span>
              <button class="translate-btn" title="翻译为中文" onclick="translateField('it_title_en_${i}','it_title_zh_${i}','zh-CN')">🌐→ZH</button>
            </label>
            <input type="text" id="it_title_en_${i}" value="${esc(it.title.en)}" oninput="S.about.interests[${i}].title.en=this.value">
          </div>
          <div class="form-group">
            <label class="form-label">标题 <span class="lang-badge lang-zh">ZH</span>
              <button class="translate-btn" title="翻译为英文" onclick="translateField('it_title_zh_${i}','it_title_en_${i}','en')">🌐→EN</button>
            </label>
            <input type="text" id="it_title_zh_${i}" value="${esc(it.title.zh)}" oninput="S.about.interests[${i}].title.zh=this.value;renderInterests()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group">
            <label class="form-label">描述 <span class="lang-badge lang-en">EN</span>
              <button class="translate-btn" title="翻译为中文" onclick="translateField('it_desc_en_${i}','it_desc_zh_${i}','zh-CN')">🌐→ZH</button>
            </label>
            <textarea id="it_desc_en_${i}" oninput="S.about.interests[${i}].desc.en=this.value">${esc(it.desc.en)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">描述 <span class="lang-badge lang-zh">ZH</span>
              <button class="translate-btn" title="翻译为英文" onclick="translateField('it_desc_zh_${i}','it_desc_en_${i}','en')">🌐→EN</button>
            </label>
            <textarea id="it_desc_zh_${i}" oninput="S.about.interests[${i}].desc.zh=this.value">${esc(it.desc.zh)}</textarea>
          </div>
        </div>
      </div>`;
    c.appendChild(d);
  });
}
function addInterest() {
  S.about.interests.push({icon:'⭐',title:{en:'',zh:''},desc:{en:'',zh:''}});
  renderInterests();
  snapshot();
  setTimeout(() => {
    const cards = document.querySelectorAll('#interests_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeInterest(i) {
  confirmDelete('删除兴趣方向', `确认删除「${S.about.interests[i].title.zh||S.about.interests[i].title.en||'此项'}」？`, () => { S.about.interests.splice(i,1); renderInterests(); snapshot(); });
}

// ════════════════════════════════════════════
//  WORKS (§4)
// ════════════════════════════════════════════
const WORK_CATS = ['shader','vfx','tool','render','code'];
const WORK_VIDEO_EXT_RE = /\.(mp4|webm|mov|m4v|ogv|avi|mkv)(\?.*)?$/i;
let currentWorkIndex = 0;
let uploadedAssetsCache = [];

function getYoutubeEmbedUrl(url) {
  try {
    const u = new URL(url);
    const host = (u.hostname || '').toLowerCase();
    if (host.includes('youtu.be')) {
      const id = u.pathname.replace('/', '').trim();
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    if (host.includes('youtube.com')) {
      if (u.pathname.startsWith('/shorts/')) {
        const id = u.pathname.split('/')[2] || '';
        return id ? `https://www.youtube.com/embed/${id}` : '';
      }
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith('/embed/')) return url;
    }
  } catch (e) {}
  return '';
}

function getVimeoEmbedUrl(url) {
  try {
    const u = new URL(url);
    const host = (u.hostname || '').toLowerCase();
    if (!host.includes('vimeo.com')) return '';
    const parts = u.pathname.split('/').filter(Boolean);
    const id = parts.find(p => /^\d+$/.test(p)) || '';
    return id ? `https://player.vimeo.com/video/${id}` : '';
  } catch (e) {}
  return '';
}

function isDirectVideoUrl(url) { return WORK_VIDEO_EXT_RE.test(url || ''); }
function normalizeWorkIndex(i) {
  if (!Array.isArray(S.works) || !S.works.length) return -1;
  if (typeof i !== 'number' || Number.isNaN(i)) return 0;
  return Math.max(0, Math.min(S.works.length - 1, i));
}

function getWorkVideoPreview(work) {
  const links = (work && work.links) || [];
  for (let i = 0; i < links.length; i++) {
    const href = String((links[i] && links[i].href) || '').trim();
    if (!href) continue;
    const yt = getYoutubeEmbedUrl(href);
    if (yt) return { kind: 'iframe', src: yt, from: href };
    const vimeo = getVimeoEmbedUrl(href);
    if (vimeo) return { kind: 'iframe', src: vimeo, from: href };
    if (isDirectVideoUrl(href)) return { kind: 'video', src: href, from: href };
  }
  return null;
}

function buildWorkVideoPreviewHtml(work) {
  const preview = getWorkVideoPreview(work);
  if (!preview) {
    return `<div style="font-size:11px;color:var(--text-muted);padding:10px 12px;background:var(--bg3);border:1px dashed var(--border2);border-radius:6px;">
      未检测到可预览视频链接（支持 YouTube / Vimeo / .mp4/.webm 直链）
    </div>`;
  }

  if (preview.kind === 'iframe') {
    return `<div style="border:1px solid var(--border2);border-radius:8px;overflow:hidden;background:#000;">
      <iframe src="${esc(preview.src)}" style="width:100%;aspect-ratio:16/9;border:0;display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      <div style="padding:8px 10px;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        来源：${esc(preview.from)}
      </div>
    </div>`;
  }

  return `<div style="border:1px solid var(--border2);border-radius:8px;overflow:hidden;background:#000;">
    <video src="${esc(preview.src)}" controls preload="metadata" style="width:100%;aspect-ratio:16/9;display:block;background:#000;"></video>
    <div style="padding:8px 10px;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      来源：${esc(preview.from)}
    </div>
  </div>`;
}

function renderWorkVideoPreview(i) {
  const mount = document.getElementById(`wvideo_preview_${i}`);
  if (!mount) return;
  mount.innerHTML = buildWorkVideoPreviewHtml(S.works[i] || {});
}
function getWorkVideoLinkIndex(work) {
  if (!work || !Array.isArray(work.links)) return -1;
  for (let i = 0; i < work.links.length; i++) {
    const href = String((work.links[i] && work.links[i].href) || '').trim();
    if (!href) continue;
    if (getYoutubeEmbedUrl(href) || getVimeoEmbedUrl(href) || isDirectVideoUrl(href)) return i;
  }
  return -1;
}
function ensureWorkVideoLink(work) {
  if (!work.links || !Array.isArray(work.links)) work.links = [];
  let idx = getWorkVideoLinkIndex(work);
  if (idx >= 0) return idx;
  work.links.push({ label: { en: 'Watch', zh: '观看视频' }, href: '' });
  return work.links.length - 1;
}
function getUploadedVideoAssets() {
  return (uploadedAssetsCache || []).filter(a => WORK_VIDEO_EXT_RE.test(String((a && a.name) || '')));
}
function setCurrentWorkIndex(i, keepCardOpen) {
  const next = normalizeWorkIndex(i);
  if (next < 0) {
    currentWorkIndex = 0;
    renderWorkMediaLibraryPanel();
    return;
  }
  currentWorkIndex = next;
  renderWorks();
  if (!keepCardOpen) return;
  setTimeout(() => {
    const body = document.querySelector(`#works_list .card[data-work-index="${currentWorkIndex}"] .card-body`);
    const arrow = document.querySelector(`#works_list .card[data-work-index="${currentWorkIndex}"] .card-toggle`);
    if (body && !body.classList.contains('open')) body.classList.add('open');
    if (arrow && !arrow.classList.contains('open')) arrow.classList.add('open');
  }, 0);
}
function applyLibraryVideoByAssetId(assetId) {
  const asset = (uploadedAssetsCache || []).find(a => a && a.id === assetId);
  if (!asset) return toast('未找到对应视频资源，请先刷新视频库。', 'error');
  const wi = normalizeWorkIndex(currentWorkIndex);
  if (wi < 0) return toast('请先创建作品后再绑定视频。', 'error');

  const work = S.works[wi];
  const li = ensureWorkVideoLink(work);
  work.links[li].href = asset.browser_download_url;
  work.hasVideo = true;

  renderWorks();
  snapshot();
  toast(`已绑定视频：${asset.name}`, 'success');
}
function renderWorkMediaLibraryPanel() {
  const listEl = document.getElementById('works_media_list');
  const hintEl = document.getElementById('works_active_hint');
  const previewEl = document.getElementById('works_active_preview');
  if (!listEl || !hintEl || !previewEl) return;

  const wi = normalizeWorkIndex(currentWorkIndex);
  if (wi < 0) {
    hintEl.textContent = '当前还没有作品，请先添加作品。';
    previewEl.innerHTML = '';
  } else {
    currentWorkIndex = wi;
    const w = S.works[wi];
    const title = (w.title && (w.title.zh || w.title.en)) || `作品 ${wi + 1}`;
    hintEl.textContent = `当前作品：${title}`;
    previewEl.innerHTML = buildWorkVideoPreviewHtml(w);
  }

  const videos = getUploadedVideoAssets();
  if (!videos.length) {
    listEl.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:6px 0;">视频库为空。可在 §8 上传后点击刷新。</div>';
    return;
  }
  const activeWork = wi >= 0 ? S.works[wi] : null;
  const activeLi = activeWork ? getWorkVideoLinkIndex(activeWork) : -1;
  const activeHref = activeLi >= 0 ? String(activeWork.links[activeLi].href || '').trim() : '';

  listEl.innerHTML = videos.map(v => {
    const size = v.size > 1024 * 1024 ? `${(v.size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(v.size / 1024))} KB`;
    const activeClass = activeHref && activeHref === v.browser_download_url ? ' active' : '';
    return `<div class="works-media-item${activeClass}" onclick="applyLibraryVideoByAssetId(${v.id})">
      <video class="works-media-thumb" src="${esc(v.browser_download_url)}" preload="metadata" muted playsinline></video>
      <div class="works-media-meta">
        <div class="name">${esc(v.name)}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span>${size}</span>
          <button class="btn btn-add" style="padding:4px 10px;font-size:10px;" onclick="event.stopPropagation();applyLibraryVideoByAssetId(${v.id})">绑定到当前作品</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
async function refreshWorkMediaLibrary(showToast) {
  const c = getGhConfig();
  if (!c.owner || !c.repo || !c.token) {
    uploadedAssetsCache = [];
    renderWorkMediaLibraryPanel();
    if (showToast) toast('请先在 §8 填写 GitHub 配置。', 'error');
    return false;
  }
  const ok = await fetchUploadedFiles({ silent: !showToast, skipListLoading: true });
  if (showToast && ok) toast('视频库已刷新。', 'success');
  return ok;
}
function renderWorks() {
  const c = document.getElementById('works_list');
  c.innerHTML = '';
  S.works.forEach((w, i) => {
    const catOpts = WORK_CATS.map(c => `<option value="${c}" ${w.category===c?'selected':''}>${c}</option>`).join('');
    const tagsHtml = (w.tags||[]).map((t,ti) =>
      `<div class="chip"><span>${esc(t)}</span><button class="chip-del" onclick="removeWorkTag(${i},${ti})">×</button></div>`
    ).join('');
    const linksHtml = (w.links||[]).map((lk,li) => `
      <div class="card" style="margin-bottom:8px;">
        <div class="card-header" onclick="toggleCard(this)" style="padding:8px 12px;">
          <div class="card-title" style="font-size:11px;">链接 ${li+1}</div>
          <button class="btn btn-danger" onclick="event.stopPropagation();removeWorkLink(${i},${li})">删除</button>
          <span class="card-toggle">▾</span>
        </div>
        <div class="card-body">
          <div class="bilingual">
            <div class="form-group"><label class="form-label">文字 <span class="lang-badge lang-en">EN</span></label>
              <input type="text" value="${esc((lk.label&&lk.label.en)||'')}" oninput="if(!S.works[${i}].links[${li}].label)S.works[${i}].links[${li}].label={en:'',zh:''};S.works[${i}].links[${li}].label.en=this.value">
            </div>
            <div class="form-group"><label class="form-label">文字 <span class="lang-badge lang-zh">ZH</span></label>
              <input type="text" value="${esc((lk.label&&lk.label.zh)||'')}" oninput="if(!S.works[${i}].links[${li}].label)S.works[${i}].links[${li}].label={en:'',zh:''};S.works[${i}].links[${li}].label.zh=this.value">
            </div>
          </div>
          <div class="form-group"><label class="form-label">URL</label>
            <input type="url" value="${esc(lk.href)}" oninput="S.works[${i}].links[${li}].href=this.value;renderWorkVideoPreview(${i});if(currentWorkIndex===${i})renderWorkMediaLibraryPanel()">
          </div>
        </div>
      </div>`).join('');

    const d = document.createElement('div');
    d.className = `card${i === currentWorkIndex ? ' work-card-active' : ''}`;
    d.dataset.workIndex = String(i);
    d.innerHTML = `
      <div class="card-header" onclick="setCurrentWorkIndex(${i});toggleCard(this)">
        <div class="card-number">${i+1}</div>
        <div class="card-title">${w.title.zh||w.title.en||'新作品'}<small> · ${w.category||'—'}</small></div>
        <button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="event.stopPropagation();setCurrentWorkIndex(${i}, true)">设为当前</button>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeWork(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="bilingual">
          <div class="form-group"><label class="form-label">分类</label>
            <select oninput="S.works[${i}].category=this.value;renderWorks()">${catOpts}</select>
          </div>
          <div class="form-group"><label class="form-label">是否有视频</label>
            <div class="toggle-row" style="margin-top:8px;">
              <label class="switch">
                <input type="checkbox" ${w.hasVideo?'checked':''} onchange="S.works[${i}].hasVideo=this.checked;renderWorkVideoPreview(${i});if(currentWorkIndex===${i})renderWorkMediaLibraryPanel()">
                <span class="slider"></span>
              </label>
              <span style="color:var(--text-muted);font-size:12px;">显示视频角标</span>
            </div>
          </div>
        </div>
        <div class="form-group"><label class="form-label">缩略图路径</label>
          <input type="text" value="${esc(w.image)}" placeholder="assets/works/xxx.jpg" oninput="S.works[${i}].image=this.value">
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">标题 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('w_title_en_${i}','w_title_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <input type="text" id="w_title_en_${i}" value="${esc(w.title.en)}" oninput="S.works[${i}].title.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">标题 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('w_title_zh_${i}','w_title_en_${i}','en')">🌐→EN</button>
          </label>
            <input type="text" id="w_title_zh_${i}" value="${esc(w.title.zh)}" oninput="S.works[${i}].title.zh=this.value;renderWorks();if(currentWorkIndex===${i})renderWorkMediaLibraryPanel()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">描述 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('w_desc_en_${i}','w_desc_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <textarea id="w_desc_en_${i}" oninput="S.works[${i}].desc.en=this.value">${esc(w.desc.en)}</textarea>
          </div>
          <div class="form-group"><label class="form-label">描述 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('w_desc_zh_${i}','w_desc_en_${i}','en')">🌐→EN</button>
          </label>
            <textarea id="w_desc_zh_${i}" oninput="S.works[${i}].desc.zh=this.value">${esc(w.desc.zh)}</textarea>
          </div>
        </div>
        <div class="form-group"><label class="form-label">标签（回车添加）</label>
          <div class="chips-wrapper" id="wtags_${i}">${tagsHtml}
            <input class="chip-input" placeholder="新增标签…" onkeydown="addWorkTag(event,${i})">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="margin-bottom:10px;">链接列表</label>
          <div id="wlinks_${i}">${linksHtml}</div>
          <button class="btn btn-add" style="margin-top:4px;" onclick="addWorkLink(${i})">＋ 添加链接</button>
        </div>
        <div class="form-group">
          <label class="form-label" style="margin-bottom:10px;">视频预览（自动匹配）</label>
          <div id="wvideo_preview_${i}">${buildWorkVideoPreviewHtml(w)}</div>
        </div>
      </div>`;
    c.appendChild(d);
  });
  renderWorkMediaLibraryPanel();
}
function addWork() {
  S.works.push({category:'shader',hasVideo:false,image:'',title:{en:'',zh:''},desc:{en:'',zh:''},tags:[],links:[]});
  currentWorkIndex = S.works.length - 1;
  renderWorks();
  snapshot();
  updateStatus();
  setTimeout(() => {
    const cards = document.querySelectorAll('#works_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeWork(i) {
  confirmDelete('删除作品', `确认删除「${S.works[i].title.zh||S.works[i].title.en||'此作品'}」？`, () => {
    S.works.splice(i,1);
    currentWorkIndex = normalizeWorkIndex(currentWorkIndex);
    renderWorks();
    snapshot();
    updateStatus();
  });
}
function addWorkTag(e, i) {
  if(e.key!=='Enter') return;
  const v = e.target.value.trim(); if(!v) return;
  S.works[i].tags.push(v); e.target.value=''; renderWorks(); snapshot();
}
function removeWorkTag(i,ti) {
  confirmDelete('删除标签', `确认删除标签「${S.works[i].tags[ti]}」？`, () => { S.works[i].tags.splice(ti,1); renderWorks(); snapshot(); });
}
function addWorkLink(i) {
  S.works[i].links.push({label:{en:'',zh:''},href:''});
  renderWorks(); snapshot();
}
function removeWorkLink(i,li) {
  confirmDelete('删除链接', `确认删除链接 ${li+1}？`, () => { S.works[i].links.splice(li,1); renderWorks(); snapshot(); });
}

// ════════════════════════════════════════════
//  EDUCATION (§5)
// ════════════════════════════════════════════
function renderEdu() {
  const c = document.getElementById('edu_list');
  c.innerHTML = '';
  S.education.forEach((e, i) => {
    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-number">${i+1}</div>
        <div class="card-title">${e.school.zh||e.school.en||'新学校'}<small> · ${e.period.zh||''}</small></div>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeEdu(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="bilingual">
          <div class="form-group"><label class="form-label">学校 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('edu_school_en_${i}','edu_school_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <input type="text" id="edu_school_en_${i}" value="${esc(e.school.en)}" oninput="S.education[${i}].school.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">学校 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('edu_school_zh_${i}','edu_school_en_${i}','en')">🌐→EN</button>
          </label>
            <input type="text" id="edu_school_zh_${i}" value="${esc(e.school.zh)}" oninput="S.education[${i}].school.zh=this.value;renderEdu()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-en">EN</span></label>
            <input type="text" value="${esc(e.period.en)}" oninput="S.education[${i}].period.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-zh">ZH</span></label>
            <input type="text" value="${esc(e.period.zh)}" oninput="S.education[${i}].period.zh=this.value;renderEdu()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">学位/专业 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('edu_degree_en_${i}','edu_degree_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <input type="text" id="edu_degree_en_${i}" value="${esc(e.degree.en)}" oninput="S.education[${i}].degree.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">学位/专业 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('edu_degree_zh_${i}','edu_degree_en_${i}','en')">🌐→EN</button>
          </label>
            <input type="text" id="edu_degree_zh_${i}" value="${esc(e.degree.zh)}" oninput="S.education[${i}].degree.zh=this.value">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">课程详情 <span class="lang-badge lang-en">EN</span>（支持HTML）
            <button class="translate-btn" title="翻译为中文" onclick="translateField('edu_detail_en_${i}','edu_detail_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <textarea id="edu_detail_en_${i}" style="min-height:90px;" oninput="S.education[${i}].detail.en=this.value">${esc(e.detail.en)}</textarea>
          </div>
          <div class="form-group"><label class="form-label">课程详情 <span class="lang-badge lang-zh">ZH</span>（支持HTML）
            <button class="translate-btn" title="翻译为英文" onclick="translateField('edu_detail_zh_${i}','edu_detail_en_${i}','en')">🌐→EN</button>
          </label>
            <textarea id="edu_detail_zh_${i}" style="min-height:90px;" oninput="S.education[${i}].detail.zh=this.value">${esc(e.detail.zh)}</textarea>
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">奖项 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('edu_award_en_${i}','edu_award_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <textarea id="edu_award_en_${i}" oninput="S.education[${i}].award.en=this.value">${esc(e.award.en)}</textarea>
          </div>
          <div class="form-group"><label class="form-label">奖项 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('edu_award_zh_${i}','edu_award_en_${i}','en')">🌐→EN</button>
          </label>
            <textarea id="edu_award_zh_${i}" oninput="S.education[${i}].award.zh=this.value">${esc(e.award.zh)}</textarea>
          </div>
        </div>
      </div>`;
    c.appendChild(d);
  });
}
function addEdu() {
  S.education.push({school:{en:'',zh:''},period:{en:'',zh:''},degree:{en:'',zh:''},detail:{en:'',zh:''},award:{en:'',zh:''}});
  renderEdu();
  snapshot();
  updateStatus();
  setTimeout(() => {
    const cards = document.querySelectorAll('#edu_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeEdu(i) {
  confirmDelete('删除教育经历', `确认删除「${S.education[i].school.zh||S.education[i].school.en||'此条目'}」？`, () => { S.education.splice(i,1); renderEdu(); snapshot(); updateStatus(); });
}

// ════════════════════════════════════════════
//  WORK EXP (§6)
// ════════════════════════════════════════════
function renderWork6() {
  const c = document.getElementById('work_list');
  c.innerHTML = '';
  S.workExp.forEach((w, i) => {
    const bulletsHtml = (w.bullets||[]).map((b,bi) => `
      <div class="bullet-item">
        <div class="bullet-num">${bi+1}</div>
        <div style="flex:1">
          <div class="bilingual">
            <div class="form-group"><label class="form-label"><span class="lang-badge lang-en">EN</span>
              <button class="translate-btn" title="翻译为中文" onclick="translateField('we_b_en_${i}_${bi}','we_b_zh_${i}_${bi}','zh-CN')">🌐→ZH</button>
            </label>
              <textarea id="we_b_en_${i}_${bi}" oninput="S.workExp[${i}].bullets[${bi}].en=this.value">${esc(b.en)}</textarea>
            </div>
            <div class="form-group"><label class="form-label"><span class="lang-badge lang-zh">ZH</span>
              <button class="translate-btn" title="翻译为英文" onclick="translateField('we_b_zh_${i}_${bi}','we_b_en_${i}_${bi}','en')">🌐→EN</button>
            </label>
              <textarea id="we_b_zh_${i}_${bi}" oninput="S.workExp[${i}].bullets[${bi}].zh=this.value">${esc(b.zh)}</textarea>
            </div>
          </div>
        </div>
        <button class="btn btn-danger" style="margin-top:24px;flex-shrink:0;" onclick="removeWorkBullet(${i},${bi})">×</button>
      </div>`).join('');

    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-number">${i+1}</div>
        <div class="card-title">${esc((w.company&&(w.company.zh||w.company.en))||w.company||'新公司')}<small> · ${w.period.zh||''}</small></div>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeWork6(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="bilingual">
          <div class="form-group"><label class="form-label">公司名称 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('we_co_en_${i}','we_co_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <input type="text" id="we_co_en_${i}" value="${esc(w.company&&w.company.en!=null?w.company.en:w.company)}" oninput="S.workExp[${i}].company.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">公司名称 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('we_co_zh_${i}','we_co_en_${i}','en')">🌐→EN</button>
          </label>
            <input type="text" id="we_co_zh_${i}" value="${esc(w.company&&w.company.zh!=null?w.company.zh:'')}" oninput="S.workExp[${i}].company.zh=this.value">
          </div>
        </div>
        <div class="form-group"><label class="form-label">项目链接 URL</label>
          <input type="url" value="${esc(w.projectUrl)}" oninput="S.workExp[${i}].projectUrl=this.value">
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-en">EN</span></label>
            <input type="text" value="${esc(w.period.en)}" oninput="S.workExp[${i}].period.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-zh">ZH</span></label>
            <input type="text" value="${esc(w.period.zh)}" oninput="S.workExp[${i}].period.zh=this.value;renderWork6()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">职位 <span class="lang-badge lang-en">EN</span>
            <button class="translate-btn" title="翻译为中文" onclick="translateField('we_role_en_${i}','we_role_zh_${i}','zh-CN')">🌐→ZH</button>
          </label>
            <input type="text" id="we_role_en_${i}" value="${esc(w.role.en)}" oninput="S.workExp[${i}].role.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">职位 <span class="lang-badge lang-zh">ZH</span>
            <button class="translate-btn" title="翻译为英文" onclick="translateField('we_role_zh_${i}','we_role_en_${i}','en')">🌐→EN</button>
          </label>
            <input type="text" id="we_role_zh_${i}" value="${esc(w.role.zh)}" oninput="S.workExp[${i}].role.zh=this.value">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="margin-bottom:10px;">工作内容（支持 HTML）</label>
          <div id="wbullets_${i}">${bulletsHtml}</div>
          <button class="btn btn-add" onclick="addWorkBullet(${i})">＋ 添加条目</button>
        </div>
      </div>`;
    c.appendChild(d);
  });
}
function addWork6() {
  S.workExp.push({company:{en:'',zh:''},period:{en:'',zh:''},role:{en:'',zh:''},projectUrl:'',bullets:[]});
  renderWork6();
  snapshot();
  updateStatus();
  setTimeout(() => {
    const cards = document.querySelectorAll('#work_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeWork6(i) {
  confirmDelete('删除工作经历', `确认删除「${(S.workExp[i].company&&(S.workExp[i].company.zh||S.workExp[i].company.en))||S.workExp[i].company||'此公司'}」？`, () => { S.workExp.splice(i,1); renderWork6(); snapshot(); updateStatus(); });
}
function addWorkBullet(i) { S.workExp[i].bullets.push({en:'',zh:''}); renderWork6(); snapshot(); }
function removeWorkBullet(i,bi) {
  confirmDelete('删除条目', `确认删除工作内容第 ${bi+1} 条？`, () => { S.workExp[i].bullets.splice(bi,1); renderWork6(); snapshot(); });
}

// ════════════════════════════════════════════
//  INDIE PROJECTS (§7)
// ════════════════════════════════════════════
function renderIndie() {
  const c = document.getElementById('indie_list');
  c.innerHTML = '';
  S.indieProjects.forEach((p, i) => {
    const bulletsHtml = (p.bullets||[]).map((b,bi) => `
      <div class="bullet-item">
        <div class="bullet-num">${bi+1}</div>
        <div style="flex:1">
          <div class="bilingual">
            <div class="form-group"><label class="form-label"><span class="lang-badge lang-en">EN</span>
              <button class="translate-btn" title="翻译为中文" onclick="translateField('ip_b_en_${i}_${bi}','ip_b_zh_${i}_${bi}','zh-CN')">🌐→ZH</button>
            </label>
              <textarea id="ip_b_en_${i}_${bi}" oninput="S.indieProjects[${i}].bullets[${bi}].en=this.value">${esc(b.en)}</textarea>
            </div>
            <div class="form-group"><label class="form-label"><span class="lang-badge lang-zh">ZH</span>
              <button class="translate-btn" title="翻译为英文" onclick="translateField('ip_b_zh_${i}_${bi}','ip_b_en_${i}_${bi}','en')">🌐→EN</button>
            </label>
              <textarea id="ip_b_zh_${i}_${bi}" oninput="S.indieProjects[${i}].bullets[${bi}].zh=this.value">${esc(b.zh)}</textarea>
            </div>
          </div>
        </div>
        <button class="btn btn-danger" style="margin-top:24px;flex-shrink:0;" onclick="removeIndieBullet(${i},${bi})">×</button>
      </div>`).join('');

    const d = document.createElement('div');
    d.className = 'card';
    d.innerHTML = `
      <div class="card-header" onclick="toggleCard(this)">
        <div class="card-number">${i+1}</div>
        <div class="card-title">${esc(p.title||'新项目')}<small> · ${p.period.zh||''}</small></div>
        <button class="btn btn-danger" onclick="event.stopPropagation();removeIndie(${i})">删除</button>
        <span class="card-toggle">▾</span>
      </div>
      <div class="card-body">
        <div class="bilingual">
          <div class="form-group"><label class="form-label">项目名称</label>
            <input type="text" value="${esc(p.title)}" oninput="S.indieProjects[${i}].title=this.value;renderIndie()">
          </div>
          <div class="form-group"><label class="form-label">项目链接 URL</label>
            <input type="url" value="${esc(p.projectUrl)}" oninput="S.indieProjects[${i}].projectUrl=this.value">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-en">EN</span></label>
            <input type="text" value="${esc(p.period.en)}" oninput="S.indieProjects[${i}].period.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">时间段 <span class="lang-badge lang-zh">ZH</span></label>
            <input type="text" value="${esc(p.period.zh)}" oninput="S.indieProjects[${i}].period.zh=this.value;renderIndie()">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">职位/角色 <span class="lang-badge lang-en">EN</span></label>
            <input type="text" value="${esc(p.role.en)}" oninput="S.indieProjects[${i}].role.en=this.value">
          </div>
          <div class="form-group"><label class="form-label">职位/角色 <span class="lang-badge lang-zh">ZH</span></label>
            <input type="text" value="${esc(p.role.zh)}" oninput="S.indieProjects[${i}].role.zh=this.value">
          </div>
        </div>
        <div class="bilingual">
          <div class="form-group"><label class="form-label">奖项 <span class="lang-badge lang-en">EN</span></label>
            <textarea oninput="S.indieProjects[${i}].award.en=this.value">${esc(p.award.en)}</textarea>
          </div>
          <div class="form-group"><label class="form-label">奖项 <span class="lang-badge lang-zh">ZH</span></label>
            <textarea oninput="S.indieProjects[${i}].award.zh=this.value">${esc(p.award.zh)}</textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" style="margin-bottom:10px;">项目描述（支持 HTML）</label>
          <div id="ibullets_${i}">${bulletsHtml}</div>
          <button class="btn btn-add" onclick="addIndieBullet(${i})">＋ 添加条目</button>
        </div>
      </div>`;
    c.appendChild(d);
  });
}
function addIndie() {
  S.indieProjects.push({title:'',period:{en:'',zh:''},role:{en:'',zh:''},projectUrl:'',award:{en:'',zh:''},bullets:[]});
  renderIndie();
  snapshot();
  updateStatus();
  setTimeout(() => {
    const cards = document.querySelectorAll('#indie_list .card');
    if (cards.length) { const last = cards[cards.length-1]; const body = last.querySelector('.card-body'); const arr = last.querySelector('.card-toggle'); if(body&&arr){body.classList.add('open');arr.classList.add('open');} }
  }, 50);
}
function removeIndie(i) {
  confirmDelete('删除独立项目', `确认删除「${S.indieProjects[i].title||'此项目'}」？`, () => { S.indieProjects.splice(i,1); renderIndie(); snapshot(); updateStatus(); });
}
function addIndieBullet(i) { S.indieProjects[i].bullets.push({en:'',zh:''}); renderIndie(); snapshot(); }
function removeIndieBullet(i,bi) {
  confirmDelete('删除条目', `确认删除项目描述第 ${bi+1} 条？`, () => { S.indieProjects[i].bullets.splice(bi,1); renderIndie(); snapshot(); });
}

// ════════════════════════════════════════════
//  CARD TOGGLE
// ════════════════════════════════════════════
function toggleCard(header) {
  const body = header.nextElementSibling;
  const arrow = header.querySelector('.card-toggle');
  body.classList.toggle('open');
  arrow.classList.toggle('open');
}

// Helper for inline oninput in rendered cards — snapshot after change
function _s() { snapshot(); updateStatus(); }

function updateCardTitle(input, idx) {
  // Update card title preview for stats
  const card = input.closest('.card');
  if (!card) return;
  const small = card.querySelector('.card-title small');
  if (small) small.textContent = input.value || '—';
}

// ════════════════════════════════════════════
//  POPULATE from state → DOM (§1 fields)
// ════════════════════════════════════════════
function populateSimple() {
  const set = (id, val) => { const el=document.getElementById(id); if(el) el.value=val||''; };
  set('name_en', S.name.en); set('name_zh', S.name.zh); set('name_alias', S.name.alias);
  set('role_en', S.role.en); set('role_zh', S.role.zh);
  set('location_en', S.location.en); set('location_zh', S.location.zh);
  set('experience_en', S.experience.en); set('experience_zh', S.experience.zh);
  set('languages_en', S.languages.en); set('languages_zh', S.languages.zh);
  set('status_en', S.status.en); set('status_zh', S.status.zh);
  set('contact_email', S.contact.email); set('contact_tel', S.contact.tel);
  set('contact_github', S.contact.github); set('contact_linkedin', S.contact.linkedin);
  set('contact_artstation', S.contact.artstation);
  set('copyright', S.copyright);
  set('home_subtitle_en', S.home.subtitle.en); set('home_subtitle_zh', S.home.subtitle.zh);
  set('home_about_title_en', S.home.about.title.en); set('home_about_title_zh', S.home.about.title.zh);
  set('home_about_desc_en', S.home.about.desc.en); set('home_about_desc_zh', S.home.about.desc.zh);
  set('about_bio_en', S.about.bio.en); set('about_bio_zh', S.about.bio.zh);
  set('about_desc_en', S.about.desc.en); set('about_desc_zh', S.about.desc.zh);
  set('about_photo', S.about.photo);
}

function renderAll() {
  populateSimple(); populateTY();
  renderStats(); renderSkills();
  renderInterests(); renderWorks();
  renderEdu(); renderWork6(); renderIndie();
  updateStatus();
}

// ════════════════════════════════════════════
//  IMPORT
// ════════════════════════════════════════════
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const src = ev.target.result;
      // Execute the config file in a sandboxed context
      const fn = new Function(src + '\nreturn CONFIG;');
      const cfg = fn();
      loadFromConfig(cfg);
      toast('✓ 导入成功！', 'success');
    } catch(err) {
      toast('✗ 导入失败：' + err.message, 'error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

document.getElementById('tyFileInput').addEventListener('change', function(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const src = ev.target.result;
      const fn = new Function(src + '\nreturn TYPOGRAPHY;');
      const ty = fn();
      if (ty && typeof ty === 'object') {
        Object.assign(TY, ty);
        populateTY();
        toast('✓ typography.js 导入成功！', 'success');
      }
    } catch(err) {
      toast('✗ 导入失败：' + err.message, 'error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
});

function loadFromConfig(cfg) {
  if (!cfg) return;
  // Deep merge cfg into S
  const merge = (target, src) => {
    if (!src || typeof src !== 'object') return;
    Object.keys(src).forEach(k => {
      if (src[k] !== null && typeof src[k] === 'object' && !Array.isArray(src[k])) {
        if (!target[k] || typeof target[k] !== 'object') target[k] = {};
        merge(target[k], src[k]);
      } else {
        target[k] = src[k];
      }
    });
  };
  merge(S, cfg);
  renderAll();
  snapshot();
}

// ════════════════════════════════════════════
//  EXPORT
// ════════════════════════════════════════════
function exportTypography() {
  const T = TY;
  const q = v => "'" + String(v||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'") + "'";
  const js = `/**
 * typography.js — Single source of truth for all font & text styling
 * Generated by KYUKAO Editor
 */

const TYPOGRAPHY = {
  googleFonts: ${q(T.googleFonts)},
  fontBody:    ${q(T.fontBody)},
  fontDisplay: ${q(T.fontDisplay)},
  fontResume:  ${q(T.fontResume)},

  lineHeightBody: ${q(T.lineHeightBody)},

  navLogoSize: ${q(T.navLogoSize)}, navLogoWeight: ${q(T.navLogoWeight)}, navLogoSpacing: ${q(T.navLogoSpacing)},
  navLinkSize: ${q(T.navLinkSize)}, navLinkSpacing: ${q(T.navLinkSpacing)},
  navToggleSize: ${q(T.navToggleSize)}, navToggleSpacing: ${q(T.navToggleSpacing)},
  resumeNavLogoSize: ${q(T.resumeNavLogoSize)}, resumeNavLogoSpacing: ${q(T.resumeNavLogoSpacing)},
  resumeNavLinkSize: ${q(T.resumeNavLinkSize)}, resumeNavLinkSpacing: ${q(T.resumeNavLinkSpacing)},
  resumeNavToggleSize: ${q(T.resumeNavToggleSize)},

  eyebrowSize: ${q(T.eyebrowSize)}, eyebrowSpacing: ${q(T.eyebrowSpacing)},
  labelSize: ${q(T.labelSize)}, labelSpacing: ${q(T.labelSpacing)},

  heroTitleSize: ${q(T.heroTitleSize)}, heroTitleWeight: ${q(T.heroTitleWeight)},
  heroTitleSpacing: ${q(T.heroTitleSpacing)}, heroTitleLineH: ${q(T.heroTitleLineH)},
  heroSubtitleSize: ${q(T.heroSubtitleSize)}, heroSubtitleSpacing: ${q(T.heroSubtitleSpacing)},
  heroNameSize: ${q(T.heroNameSize)}, heroNameWeight: ${q(T.heroNameWeight)},
  heroNameSpacing: ${q(T.heroNameSpacing)}, heroNameLineH: ${q(T.heroNameLineH)},

  sectionTitleSize: ${q(T.sectionTitleSize)}, sectionTitleWeight: ${q(T.sectionTitleWeight)}, sectionTitleSpacing: ${q(T.sectionTitleSpacing)},
  pageTitleSize: ${q(T.pageTitleSize)}, pageTitleWeight: ${q(T.pageTitleWeight)}, pageTitleSpacing: ${q(T.pageTitleSpacing)},
  sectionDescSize: ${q(T.sectionDescSize)}, sectionDescLineH: ${q(T.sectionDescLineH)},

  statNumSize: ${q(T.statNumSize)}, statNumWeight: ${q(T.statNumWeight)},
  statLabelSize: ${q(T.statLabelSize)}, statLabelSpacing: ${q(T.statLabelSpacing)},

  btnSize: ${q(T.btnSize)}, btnSpacing: ${q(T.btnSpacing)},

  workCardTagSize: ${q(T.workCardTagSize)}, workCardTagSpacing: ${q(T.workCardTagSpacing)},
  workCardTitleSize: ${q(T.workCardTitleSize)}, workCardTitleWeight: ${q(T.workCardTitleWeight)},
  workTagSize: ${q(T.workTagSize)}, workTagSpacing: ${q(T.workTagSpacing)},
  workTitleSize: ${q(T.workTitleSize)}, workTitleWeight: ${q(T.workTitleWeight)},
  workDescSize: ${q(T.workDescSize)}, workDescLineH: ${q(T.workDescLineH)},
  workLinkSize: ${q(T.workLinkSize)}, workLinkSpacing: ${q(T.workLinkSpacing)},

  skillTagSize: ${q(T.skillTagSize)}, skillTagSpacing: ${q(T.skillTagSpacing)},

  footerSize: ${q(T.footerSize)}, footerLogoWeight: ${q(T.footerLogoWeight)}, footerLogoSpacing: ${q(T.footerLogoSpacing)},

  infoListSize: ${q(T.infoListSize)}, infoTextSize: ${q(T.infoTextSize)}, infoTextLineH: ${q(T.infoTextLineH)},
  infoKeySpacing: ${q(T.infoKeySpacing)}, contactBtnLabelSize: ${q(T.contactBtnLabelSize)}, contactBtnValSize: ${q(T.contactBtnValSize)},

  interestTitleSize: ${q(T.interestTitleSize)}, interestTitleWeight: ${q(T.interestTitleWeight)},
  interestDescSize: ${q(T.interestDescSize)}, interestDescLineH: ${q(T.interestDescLineH)},

  blockTitleSize: ${q(T.blockTitleSize)}, blockTitleSpacing: ${q(T.blockTitleSpacing)},

  resumeSectionTitleSize: ${q(T.resumeSectionTitleSize)}, resumeSectionTitleWeight: ${q(T.resumeSectionTitleWeight)}, resumeSectionTitleSpacing: ${q(T.resumeSectionTitleSpacing)},
  resumeTagSize: ${q(T.resumeTagSize)}, resumeBtnSize: ${q(T.resumeBtnSize)}, resumeBtnSpacing: ${q(T.resumeBtnSpacing)},
  resumeBodyLineH: ${q(T.resumeBodyLineH)},

  scrollHintSize: ${q(T.scrollHintSize)}, scrollHintSpacing: ${q(T.scrollHintSpacing)},
};

/* ================================================================
   🔧  Engine — do not edit below unless you know what you're doing
   ================================================================ */
(function () {
  'use strict';
  function injectFonts() {
    if (!TYPOGRAPHY.googleFonts) return;
    if (document.querySelector('link[data-ty-fonts]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = TYPOGRAPHY.googleFonts;
    link.setAttribute('data-ty-fonts', '1');
    document.head.insertBefore(link, document.head.firstChild);
  }
  function buildCSS() {
    var T = TYPOGRAPHY;
    var isResume = !!document.querySelector('body.antialiased') || !!document.querySelector('.font-sync');
    var css = '';
    if (isResume) {
      css += ['body { font-family: ' + T.fontResume + ' !important; line-height: ' + T.resumeBodyLineH + ' !important; }','.font-sync { font-family: ' + T.fontDisplay + ' !important; }','.nav-logo { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavLogoSize + ' !important; letter-spacing: ' + T.resumeNavLogoSpacing + ' !important; }','.nav-links a { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavLinkSize + ' !important; letter-spacing: ' + T.resumeNavLinkSpacing + ' !important; }','.lang-toggle { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeNavToggleSize + ' !important; }','.section-title { font-size: ' + T.resumeSectionTitleSize + ' !important; font-weight: ' + T.resumeSectionTitleWeight + ' !important; letter-spacing: ' + T.resumeSectionTitleSpacing + ' !important; }','.tag { font-size: ' + T.resumeTagSize + ' !important; }','.btn-contact { font-family: ' + T.fontDisplay + ' !important; font-size: ' + T.resumeBtnSize + ' !important; letter-spacing: ' + T.resumeBtnSpacing + ' !important; }'].join('\\n');
    } else {
      css += ['body { font-family: ' + T.fontBody + '; line-height: ' + T.lineHeightBody + '; }','.nav-logo { font-size: ' + T.navLogoSize + '; font-weight: ' + T.navLogoWeight + '; letter-spacing: ' + T.navLogoSpacing + '; }','.nav-links a { font-size: ' + T.navLinkSize + '; letter-spacing: ' + T.navLinkSpacing + '; }','.lang-toggle { font-size: ' + T.navToggleSize + '; letter-spacing: ' + T.navToggleSpacing + '; }','.hero-eyebrow { font-size: ' + T.eyebrowSize + '; letter-spacing: ' + T.eyebrowSpacing + '; }','.section-label { font-size: ' + T.labelSize + '; letter-spacing: ' + T.labelSpacing + '; }','.hero-title { font-size: ' + T.heroTitleSize + '; font-weight: ' + T.heroTitleWeight + '; letter-spacing: ' + T.heroTitleSpacing + '; line-height: ' + T.heroTitleLineH + '; }','.hero-subtitle { font-size: ' + T.heroSubtitleSize + '; letter-spacing: ' + T.heroSubtitleSpacing + '; }','.hero-name { font-size: ' + T.heroNameSize + '; font-weight: ' + T.heroNameWeight + '; letter-spacing: ' + T.heroNameSpacing + '; line-height: ' + T.heroNameLineH + '; }','.hero-role { font-size: ' + T.navLinkSize + '; letter-spacing: ' + T.navLogoSpacing + '; }','.section-title { font-size: ' + T.sectionTitleSize + '; font-weight: ' + T.sectionTitleWeight + '; letter-spacing: ' + T.sectionTitleSpacing + '; }','.page-header .section-title { font-size: ' + T.pageTitleSize + '; font-weight: ' + T.pageTitleWeight + '; letter-spacing: ' + T.pageTitleSpacing + '; }','.section-desc { font-size: ' + T.sectionDescSize + '; line-height: ' + T.sectionDescLineH + '; }','.scroll-hint { font-size: ' + T.scrollHintSize + '; letter-spacing: ' + T.scrollHintSpacing + '; }','.stat-num { font-size: ' + T.statNumSize + '; font-weight: ' + T.statNumWeight + '; }','.stat-label { font-size: ' + T.statLabelSize + '; letter-spacing: ' + T.statLabelSpacing + '; }','.btn-primary { font-size: ' + T.btnSize + '; letter-spacing: ' + T.btnSpacing + '; }','.btn-outline { font-size: ' + T.btnSize + '; letter-spacing: ' + T.btnSpacing + '; }','.work-card-tag { font-size: ' + T.workCardTagSize + '; letter-spacing: ' + T.workCardTagSpacing + '; }','.work-card-title { font-size: ' + T.workCardTitleSize + '; font-weight: ' + T.workCardTitleWeight + '; }','.work-tag { font-size: ' + T.workTagSize + '; letter-spacing: ' + T.workTagSpacing + '; }','.work-title { font-size: ' + T.workTitleSize + '; font-weight: ' + T.workTitleWeight + '; }','.work-desc { font-size: ' + T.workDescSize + '; line-height: ' + T.workDescLineH + '; }','.work-link { font-size: ' + T.workLinkSize + '; letter-spacing: ' + T.workLinkSpacing + '; }','.skill-tag { font-size: ' + T.skillTagSize + '; letter-spacing: ' + T.skillTagSpacing + '; }','footer { font-size: ' + T.footerSize + '; }','.footer-logo { font-weight: ' + T.footerLogoWeight + '; letter-spacing: ' + T.footerLogoSpacing + '; }','.info-list li { font-size: ' + T.infoListSize + '; }','.info-text { font-size: ' + T.infoTextSize + '; line-height: ' + T.infoTextLineH + '; }','.info-key { letter-spacing: ' + T.infoKeySpacing + '; }','.contact-btn-label { font-size: ' + T.contactBtnLabelSize + '; }','.contact-btn-val { font-size: ' + T.contactBtnValSize + '; }','.interest-title { font-size: ' + T.interestTitleSize + '; font-weight: ' + T.interestTitleWeight + '; }','.interest-desc { font-size: ' + T.interestDescSize + '; line-height: ' + T.interestDescLineH + '; }','.block-title { font-size: ' + T.blockTitleSize + '; letter-spacing: ' + T.blockTitleSpacing + '; }'].join('\\n');
    }
    return css;
  }
  function injectStyles() {
    var existing = document.getElementById('ty-styles');
    if (existing) existing.remove();
    var style = document.createElement('style');
    style.id = 'ty-styles'; style.textContent = buildCSS();
    document.head.appendChild(style);
  }
  injectFonts();
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', injectStyles); } else { injectStyles(); }
  window.applyTypography = injectStyles;
}());
`;
  const blob = new Blob([js], {type:'text/javascript;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download='typography.js'; a.click();
  URL.revokeObjectURL(url);
  toast('✓ typography.js 已下载！替换 js/typography.js 即可。', 'success');
}

function exportConfig() {
  const js = buildConfigJs();
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const blob = new Blob([js], {type: 'text/javascript;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `config_${stamp}.js`;
  a.click();
  URL.revokeObjectURL(url);
  toast(`✓ config_${stamp}.js 已下载！用它替换项目中的 config.js。`, 'success');
}

function q(str) {
  // safely quote a string for JS source
  return "'" + String(str||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n') + "'";
}
function qhtml(str) {
  return "'" + String(str||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n') + "'";
}

function buildConfigJs() {
  const s = S;
  let out = `/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              config.js — 网站配置文件                        ║
 * ║                                                              ║
 * ║  ★ 这是你唯一需要编辑的文件 ★                                ║
 * ║  修改下方内容后，刷新浏览器即可看到效果                        ║
 * ║  每项旁边都有注释说明，按照格式填写即可                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const CONFIG = {

  /* ============================================================
     § 1. 个人基本信息
     ============================================================ */

  name: {
    en: ${q(s.name.en)},
    zh: ${q(s.name.zh)},
    alias: ${q(s.name.alias)},
  },

  role: {
    en: ${q(s.role.en)},
    zh: ${q(s.role.zh)},
  },

  location: {
    en: ${q(s.location.en)},
    zh: ${q(s.location.zh)},
  },

  experience: {
    en: ${q(s.experience.en)},
    zh: ${q(s.experience.zh)},
  },

  languages: {
    en: ${q(s.languages.en)},
    zh: ${q(s.languages.zh)},
  },

  status: {
    en: ${q(s.status.en)},
    zh: ${q(s.status.zh)},
  },

  contact: {
    email:      ${q(s.contact.email)},
    github:     ${q(s.contact.github)},
    artstation: ${q(s.contact.artstation)},
    linkedin:   ${q(s.contact.linkedin)},
    tel:        ${q(s.contact.tel)},
  },

  copyright: ${q(s.copyright)},


  /* ============================================================
     § 2. 首页文字
     ============================================================ */

  home: {
    subtitle: {
      en: ${q(s.home.subtitle.en)},
      zh: ${q(s.home.subtitle.zh)},
    },

    about: {
      title: { en: ${q(s.home.about.title.en)}, zh: ${q(s.home.about.title.zh)} },
      desc: {
        en: ${q(s.home.about.desc.en)},
        zh: ${q(s.home.about.desc.zh)},
      },
    },

    stats: [
${s.home.stats.map(st => `      { num: ${q(st.num)}, label: { en: ${q(st.label.en)}, zh: ${q(st.label.zh)} } },`).join('\n')}
    ],

    skills: [
${s.home.skills.map(sk => `      ${q(sk)},`).join('\n')}
    ],
  },


  /* ============================================================
     § 3. 关于我页面
     ============================================================ */

  about: {
    bio: {
      en: ${q(s.about.bio.en)},
      zh: ${q(s.about.bio.zh)},
    },

    desc: {
      en: ${q(s.about.desc.en)},
      zh: ${q(s.about.desc.zh)},
    },

    photo: ${q(s.about.photo)},

    interests: [
${s.about.interests.map(it => `      {
        icon:  ${q(it.icon)},
        title: { en: ${q(it.title.en)}, zh: ${q(it.title.zh)} },
        desc:  { en: ${q(it.desc.en)},
                 zh: ${q(it.desc.zh)} },
      },`).join('\n')}
    ],
  },


  /* ============================================================
     § 4. 作品集
     ============================================================ */

  works: [
${s.works.map(w => `    {
      category: ${q(w.category)},
      hasVideo: ${w.hasVideo},
      image: ${q(w.image)},
      title: { en: ${q(w.title.en)}, zh: ${q(w.title.zh)} },
      desc:  {
        en: ${q(w.desc.en)},
        zh: ${q(w.desc.zh)},
      },
      tags: [${(w.tags||[]).map(t=>q(t)).join(', ')}],
      links: [
${(w.links||[]).map(lk => `        { label: { en: ${q(lk.label.en)}, zh: ${q(lk.label.zh)} }, href: ${q(lk.href)} },`).join('\n')}
      ],
    },`).join('\n')}
  ],


  /* ============================================================
     § 5. 简历 — 教育经历
     ============================================================ */

  education: [
${s.education.map(e => `    {
      school: { en: ${q(e.school.en)}, zh: ${q(e.school.zh)} },
      period: { en: ${q(e.period.en)}, zh: ${q(e.period.zh)} },
      degree: { en: ${q(e.degree.en)},
                zh: ${q(e.degree.zh)} },
      detail: {
        en: ${qhtml(e.detail.en)},
        zh: ${qhtml(e.detail.zh)},
      },
      award: { en: ${qhtml(e.award.en)}, zh: ${qhtml(e.award.zh)} },
    },`).join('\n')}
  ],


  /* ============================================================
     § 6. 简历 — 工作经历
     ============================================================ */

  workExp: [
${s.workExp.map(w => `    {
      company:    { en: ${q(w.company&&w.company.en!=null?w.company.en:w.company)}, zh: ${q(w.company&&w.company.zh!=null?w.company.zh:'')} },
      period:     { en: ${q(w.period.en)}, zh: ${q(w.period.zh)} },
      role:       { en: ${q(w.role.en)},
                    zh: ${q(w.role.zh)} },
      projectUrl: ${q(w.projectUrl)},
      bullets: [
${(w.bullets||[]).map(b => `        {
          en: ${qhtml(b.en)},
          zh: ${qhtml(b.zh)},
        },`).join('\n')}
      ],
    },`).join('\n')}
  ],


  /* ============================================================
     § 7. 简历 — 独立项目经历
     ============================================================ */

  indieProjects: [
${s.indieProjects.map(p => `    {
      title:      ${q(p.title)},
      period:     { en: ${q(p.period.en)}, zh: ${q(p.period.zh)} },
      role:       { en: ${q(p.role.en)},
                    zh: ${q(p.role.zh)} },
      projectUrl: ${q(p.projectUrl)},
      award:      { en: ${qhtml(p.award.en)}, zh: ${qhtml(p.award.zh)} },
      bullets: [
${(p.bullets||[]).map(b => `        {
          en: ${qhtml(b.en)},
          zh: ${qhtml(b.zh)},
        },`).join('\n')}
      ],
    },`).join('\n')}
  ],

};  // ← CONFIG 结束，不要删除这个括号
`;
  return out;
}

// ════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════
let toastTimer;
function toast(msg, type='success') {
  const el = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  el.className = 'show ' + type;
  el.querySelector('.toast-icon').textContent = type==='success' ? '✓' : '✗';
  msgEl.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = ''; }, 3500);
}

// ════════════════════════════════════════════
//  HELPER
// ════════════════════════════════════════════
function esc(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ════════════════════════════════════════════
//  INIT — load existing config.js automatically
// ════════════════════════════════════════════
(function init() {
  bindSimple();

  // Start auto-backup every 30s
  setInterval(autoBackup, 30000);

  // Try to load typography.js first, then config.js
  const tyScript = document.createElement('script');
  tyScript.src = '../js/typography.js?' + Date.now();
  tyScript.onload = function() {
    if (typeof TYPOGRAPHY !== 'undefined') {
      Object.assign(TY, TYPOGRAPHY);
    }
    loadConfigScript();
  };
  tyScript.onerror = function() { loadConfigScript(); };
  document.body.appendChild(tyScript);

  function loadConfigScript() {
    const script = document.createElement('script');
    script.src = '../config.js?' + Date.now();
    script.onload = function() {
      if (typeof CONFIG !== 'undefined') {
        loadFromConfig(CONFIG);
        toast('✓ 已自动加载 config.js 和 typography.js', 'success');
        // Don't offer backup restore if we just loaded from file
        localStorage.removeItem('kyukao_backup');
      }
    };
    script.onerror = function() {
      renderAll();
      toast('提示：未找到 config.js，从空白开始编辑', 'error');
      // Check for backup only if no config.js loaded
      checkBackup();
    };
    document.body.appendChild(script);
  }
})();

// ════════════════════════════════════════════
//  §8 GITHUB UPLOADER
// ════════════════════════════════════════════

// ── Persist config to localStorage (token → sessionStorage) ──
function saveGhConfig() {
  localStorage.setItem('gh_owner', document.getElementById('gh_owner').value);
  localStorage.setItem('gh_repo',  document.getElementById('gh_repo').value);
  sessionStorage.setItem('gh_token', document.getElementById('gh_token').value);
  localStorage.setItem('gh_tag',   document.getElementById('gh_tag').value);
}
function loadGhConfig() {
  const set = (id, key, storage) => { const el=document.getElementById(id); if(el) el.value=(storage||localStorage).getItem(key)||''; };
  set('gh_owner','gh_owner'); set('gh_repo','gh_repo');
  set('gh_token','gh_token', sessionStorage); set('gh_tag','gh_tag');
  // Migrate old token from localStorage to sessionStorage (one-time)
  const oldToken = localStorage.getItem('gh_token');
  if (oldToken) {
    sessionStorage.setItem('gh_token', oldToken);
    localStorage.removeItem('gh_token');
    const el = document.getElementById('gh_token');
    if (el && !el.value) el.value = oldToken;
  }
}
function getGhConfig() {
  return {
    owner: document.getElementById('gh_owner').value.trim(),
    repo:  document.getElementById('gh_repo').value.trim(),
    token: document.getElementById('gh_token').value.trim() || sessionStorage.getItem('gh_token') || '',
    tag:   document.getElementById('gh_tag').value.trim() || 'v1.0-assets',
  };
}
function toggleTokenVis() {
  const el = document.getElementById('gh_token');
  el.type = el.type === 'password' ? 'text' : 'password';
}

// ── Validate config ──
function validateGhConfig() {
  const c = getGhConfig();
  if (!c.owner) { toast('✗ 请填写 GitHub 用户名', 'error'); return null; }
  if (!c.repo)  { toast('✗ 请填写仓库名称', 'error'); return null; }
  if (!c.token) { toast('✗ 请填写 Personal Access Token', 'error'); return null; }
  return c;
}

// ── GitHub API helper ──
async function ghFetch(path, options={}) {
  const c = getGhConfig();
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      'Authorization': `token ${c.token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers||{}),
    },
  });
  return res;
}

// ── Check or create Release ──
async function checkOrCreateRelease() {
  const c = validateGhConfig(); if (!c) return;
  toast('⟳ 正在检查 Release...', 'success');
  try {
    // Try to get existing release
    let res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/tags/${c.tag}`);
    if (res.ok) {
      const data = await res.json();
      toast(`✓ Release "${c.tag}" 已存在，可以上传文件`, 'success');
      return data;
    }
    // Create new release
    res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag_name: c.tag,
        name: c.tag + ' — Media Assets',
        body: 'Media assets for KYUKAO Portfolio. Managed by KYUKAO Editor.',
        draft: false,
        prerelease: false,
      }),
    });
    if (res.ok) {
      toast(`✓ Release "${c.tag}" 创建成功！`, 'success');
      return await res.json();
    } else {
      const err = await res.json();
      toast(`✗ 创建失败：${err.message}`, 'error');
    }
  } catch(e) {
    toast('✗ 网络错误：' + e.message, 'error');
  }
}

// ── Get release upload URL ──
async function getReleaseUploadUrl(c) {
  const res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/tags/${c.tag}`);
  if (!res.ok) return null;
  const data = await res.json();
  return { uploadUrl: data.upload_url.replace('{?name,label}',''), releaseId: data.id };
}

// ── Drag & drop ──
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('dropzone').style.borderColor = 'var(--border2)';
  handleFileSelect(e.dataTransfer.files);
}

const UPLOAD_MAX_BYTES = 2 * 1024 * 1024 * 1024; // GitHub Releases single asset limit
const UPLOAD_RETRY_MAX = 2;
const UPLOAD_CONCURRENCY = 1;
const VIDEO_EXT_RE = /\.(mp4|webm|mov|avi|mkv)$/i;
const IMAGE_EXT_RE = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

let uploadQueue = [];
let uploadInFlight = 0;

function normalizeAssetName(name) {
  return String(name || '').trim().replace(/\s+/g, '_');
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(0) + ' KB';
}

function isRetryableUploadError(err) {
  if (!err) return false;
  if (err.isNetwork) return true;
  return typeof err.status === 'number' && err.status >= 500;
}

function validateMediaFile(file) {
  const extName = file && file.name ? file.name : '';
  const validType = VIDEO_EXT_RE.test(extName) || IMAGE_EXT_RE.test(extName);
  if (!validType) return '仅支持图片/视频格式（mp4/webm/mov/avi/mkv/jpg/png/gif/webp/svg）';
  if (file.size > UPLOAD_MAX_BYTES) return `文件超过 2GB 限制：${formatSize(file.size)}`;
  return '';
}

function enqueueNextUpload() {
  if (uploadInFlight >= UPLOAD_CONCURRENCY) return;
  const next = uploadQueue.find(i => i.status === 'pending');
  if (!next) return;
  uploadInFlight += 1;
  uploadFile(next.id).finally(() => {
    uploadInFlight -= 1;
    enqueueNextUpload();
  });
}

// ── File select → add to queue ──
function handleFileSelect(files) {
  if (!files || !files.length) return;
  Array.from(files).forEach(file => addToQueue(file));
}

// ── Upload queue ──
function addToQueue(file) {
  const errMsg = validateMediaFile(file);
  if (errMsg) {
    toast(`✗ "${file.name}" 无法上传：${errMsg}`, 'error');
    return;
  }

  const normalizedName = normalizeAssetName(file.name);
  const dup = uploadQueue.find(i => normalizeAssetName(i.file.name) === normalizedName && i.status !== 'error');
  if (dup) {
    toast(`⚠ "${normalizedName}" 已在队列中，已跳过重复项`, 'error');
    return;
  }

  if (VIDEO_EXT_RE.test(file.name) && file.size > 500 * 1024 * 1024) {
    toast(`⚠ "${file.name}" 较大（${formatSize(file.size)}），建议保持网络稳定`, 'error');
  }

  const id = 'uq_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  uploadQueue.push({ id, file, status: 'pending', retries: 0, progress: 0, error: '', url: '' });
  renderQueue();
  enqueueNextUpload();
}

function renderQueue() {
  const c = document.getElementById('upload_queue');
  if (!uploadQueue.length) { c.innerHTML=''; return; }
  c.innerHTML = uploadQueue.map(item => {
    const icon = item.status === 'done'
      ? '✓'
      : (item.status === 'error' ? '✗' : (item.status === 'uploading' || item.status === 'retrying' ? '⟳' : '·'));
    const color = item.status === 'done'
      ? '#48bb78'
      : (item.status === 'error' ? '#e53e3e' : (item.status === 'uploading' || item.status === 'retrying' ? 'var(--pink)' : 'var(--text-muted)'));
    const statusText = item.status === 'done'
      ? '上传完成'
      : (item.status === 'error'
        ? ('上传失败' + (item.retries ? `（已重试 ${item.retries} 次）` : ''))
        : (item.status === 'uploading'
          ? '上传中…'
          : (item.status === 'retrying' ? `重试中（第 ${item.retries} 次）…` : '等待中')));
    const actionRetry = item.status === 'error'
      ? `<button class="btn btn-ghost" style="font-size:10px;padding:2px 8px;margin-top:6px;" onclick="retryUploadItem('${item.id}')">重试</button>`
      : '';
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg3);border-radius:6px;margin-bottom:6px;border:1px solid var(--border);">
      <span style="color:${color};font-size:14px;width:16px;text-align:center;flex-shrink:0;">${icon}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(item.file.name)}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${formatSize(item.file.size)} · ${statusText}</div>
        ${(item.status === 'uploading' || item.status === 'retrying') ? `<div style="height:2px;background:var(--border2);border-radius:2px;margin-top:6px;overflow:hidden;"><div id="prog_${item.id}" style="height:100%;background:var(--pink);width:${item.progress || 0}%;transition:width 0.2s;"></div></div>` : ''}
        ${item.error ? `<div style="font-size:10px;color:#e53e3e;margin-top:4px;">${esc(item.error)}</div>` : ''}
        ${item.url ? `<div style="font-size:10px;color:var(--pink);margin-top:4px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" onclick="copyUrl('${item.url}')" title="${item.url}">📋 ${item.url}</div>` : ''}
        ${actionRetry}
      </div>
      ${item.status !== 'uploading' && item.status !== 'retrying' ? `<button class="btn btn-danger" onclick="removeQueueItem('${item.id}')">×</button>` : ''}
    </div>`;
  }).join('');
}

function removeQueueItem(id) {
  const item = uploadQueue.find(i => i.id === id);
  if (item && (item.status === 'uploading' || item.status === 'retrying')) {
    toast('⚠ 上传中的文件不能移除，请等待完成', 'error');
    return;
  }
  uploadQueue = uploadQueue.filter(i => i.id !== id);
  renderQueue();
}

function retryUploadItem(id) {
  const item = uploadQueue.find(i => i.id === id);
  if (!item || item.status !== 'error') return;
  item.status = 'pending';
  item.error = '';
  item.progress = 0;
  renderQueue();
  enqueueNextUpload();
}

function retryFailedUploads() {
  const failed = uploadQueue.filter(i => i.status === 'error');
  if (!failed.length) {
    toast('没有失败项可重试', 'success');
    return;
  }
  failed.forEach(item => {
    item.status = 'pending';
    item.error = '';
    item.progress = 0;
  });
  renderQueue();
  enqueueNextUpload();
}

async function getOrCreateReleaseUploadInfo(c) {
  let rel = await getReleaseUploadUrl(c);
  if (rel) return rel;
  const newRel = await checkOrCreateRelease();
  if (!newRel) return null;
  rel = await getReleaseUploadUrl(c);
  return rel || null;
}

async function getReleaseAssetsMap(c) {
  const res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/tags/${c.tag}`);
  if (!res.ok) return new Map();
  const data = await res.json();
  const m = new Map();
  (data.assets || []).forEach(a => m.set(normalizeAssetName(a.name), a));
  return m;
}

async function deleteAssetById(c, assetId) {
  const res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/assets/${assetId}`, { method: 'DELETE' });
  if (res.status !== 204) {
    let msg = '删除同名文件失败';
    try {
      const json = await res.json();
      msg = json.message || msg;
    } catch (e) {}
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
}

// ── Core upload function ──
async function uploadFile(id) {
  const item = uploadQueue.find(i => i.id === id); if (!item) return;
  const c = validateGhConfig(); if (!c) { item.status='error'; item.error='GitHub 配置不完整'; renderQueue(); return; }

  item.status = 'uploading';
  item.error = '';
  item.progress = 0;
  renderQueue();

  try {
    const rel = await getOrCreateReleaseUploadInfo(c);
    if (!rel) throw new Error('无法获取 Release 上传地址');

    const safeName = normalizeAssetName(item.file.name);
    const assetsMap = await getReleaseAssetsMap(c);
    const existing = assetsMap.get(safeName);
    if (existing) {
      item.status = 'retrying';
      item.error = '检测到同名文件，正在替换…';
      renderQueue();
      await deleteAssetById(c, existing.id);
      item.status = 'uploading';
      item.error = '';
      renderQueue();
    }

    let lastErr = null;
    for (let attempt = 0; attempt <= UPLOAD_RETRY_MAX; attempt++) {
      try {
        const data = await doUpload(item, rel, c, safeName);
        item.status = 'done';
        item.error = '';
        item.url = data.browser_download_url;
        item.progress = 100;
        renderQueue();
        fetchUploadedFiles();
        toast(`✓ "${safeName}" 上传成功`, 'success');
        return;
      } catch (err) {
        lastErr = err;
        if (attempt >= UPLOAD_RETRY_MAX || !isRetryableUploadError(err)) break;
        item.retries = attempt + 1;
        item.status = 'retrying';
        item.error = `网络波动，${1500 * (attempt + 1)}ms 后重试`;
        renderQueue();
        await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
        item.status = 'uploading';
        item.error = '';
        renderQueue();
      }
    }
    throw lastErr || new Error('上传失败');
  } catch(e) {
    item.status = 'error';
    item.error = e && e.message ? e.message : '上传失败';
    renderQueue();
    toast('✗ 上传失败：' + item.error, 'error');
  }
}

async function doUpload(item, rel, c, safeName) {
  const file = item.file;
  const buffer = await file.arrayBuffer();
  const uploadTarget = `${rel.uploadUrl}?name=${encodeURIComponent(safeName)}`;

  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadTarget);
    xhr.timeout = 60000;
    xhr.setRequestHeader('Authorization', `token ${c.token}`);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.setRequestHeader('Accept', 'application/vnd.github+json');

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.max(0, Math.min(100, Math.round(e.loaded / e.total * 100)));
      item.progress = pct;
      const bar = document.getElementById('prog_' + item.id);
      if (bar) bar.style.width = pct + '%';
    };

    xhr.onload = () => {
      if (xhr.status === 201) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          const err = new Error('上传成功但返回解析失败');
          err.status = xhr.status;
          reject(err);
        }
        return;
      }
      let msg = '上传失败 HTTP ' + xhr.status;
      try {
        const json = JSON.parse(xhr.responseText);
        msg = json.message || msg;
      } catch(e) {}
      const err = new Error(msg);
      err.status = xhr.status;
      reject(err);
    };
    xhr.onerror = () => {
      const err = new Error(`网络错误：无法连接上传域名 uploads.github.com（目标：${uploadTarget}）`);
      err.isNetwork = true;
      reject(err);
    };
    xhr.ontimeout = () => {
      const err = new Error('上传超时：请检查代理/网络是否放行 uploads.github.com');
      err.isNetwork = true;
      reject(err);
    };
    xhr.send(buffer);
  });
}

// ── Fetch uploaded files list ──
async function fetchUploadedFiles(options = {}) {
  const silent = !!options.silent;
  const skipListLoading = !!options.skipListLoading;
  const c = getGhConfig();
  const listEl = document.getElementById('uploaded_list');
  if (!c.owner || !c.repo || !c.token) {
    uploadedAssetsCache = [];
    renderWorkMediaLibraryPanel();
    if (!silent) validateGhConfig();
    if (listEl) listEl.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:12px 0;">请先填写 GitHub 配置</div>';
    return false;
  }
  if (listEl && !skipListLoading) {
    listEl.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:12px 0;">加载中…</div>';
  }

  try {
    const res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/tags/${c.tag}`);
    if (!res.ok) {
      uploadedAssetsCache = [];
      renderWorkMediaLibraryPanel();
      if (listEl) listEl.innerHTML = `<div style="color:#e53e3e;font-size:12px;padding:12px 0;">未找到 Release "${c.tag}"，请先点「检查/创建 Release」</div>`;
      return false;
    }
    const data = await res.json();
    const assets = data.assets || [];
    uploadedAssetsCache = assets;
    renderWorkMediaLibraryPanel();
    if (!assets.length) {
      if (listEl) listEl.innerHTML = '<div style="color:var(--text-muted);font-size:12px;padding:12px 0;">暂无文件</div>';
      return true;
    }
    if (!listEl) return true;
    listEl.innerHTML = assets.map(a => {
      const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(a.name);
      const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(a.name);
      const icon = isVideo ? '🎬' : isImage ? '🖼' : '📄';
      const size = a.size > 1024*1024 ? (a.size/1024/1024).toFixed(1)+' MB' : (a.size/1024).toFixed(0)+' KB';
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg3);border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:border-color 0.2s;"
               onclick="copyUrl('${a.browser_download_url}')"
               onmouseover="this.style.borderColor='var(--pink)'" onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-size:18px;flex-shrink:0;">${icon}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(a.name)}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${size} · 点击复制直链</div>
        </div>
        <button class="btn btn-danger" onclick="event.stopPropagation();deleteAsset(${a.id},'${esc(a.name)}')" title="删除">🗑</button>
      </div>`;
    }).join('');
    return true;
  } catch(e) {
    uploadedAssetsCache = [];
    renderWorkMediaLibraryPanel();
    if (listEl) listEl.innerHTML = `<div style="color:#e53e3e;font-size:12px;padding:12px 0;">加载失败：${e.message}</div>`;
    return false;
  }
}

// ── Copy URL to clipboard ──
function copyUrl(url) {
  navigator.clipboard.writeText(url).then(() => {
    toast('✓ 直链已复制到剪贴板！', 'success');
  }).catch(() => {
    prompt('复制以下直链：', url);
  });
}

// ── Delete asset ──
async function deleteAsset(assetId, name) {
  confirmDelete('删除文件', `确认删除文件 "${name}"？此操作不可撤销。`, async () => {
    const c = validateGhConfig(); if (!c) return;
    try {
      const res = await ghFetch(`/repos/${c.owner}/${c.repo}/releases/assets/${assetId}`, { method: 'DELETE' });
      if (res.status === 204) {
        toast(`✓ "${name}" 已删除`, 'success');
        fetchUploadedFiles();
      } else {
        toast('✗ 删除失败', 'error');
      }
    } catch(e) {
      toast('✗ 删除失败：' + e.message, 'error');
    }
  });
}

// Load saved GitHub config on startup
document.addEventListener('DOMContentLoaded', () => {
  loadGhConfig();
  renderWorkMediaLibraryPanel();
});
