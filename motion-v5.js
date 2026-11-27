/* Motion Studio | Curated device showcase and navigation performance controls.
 * Dependency-free progressive enhancement. Separate from the existing V4 engine for safe rollback.
 */
(() => {
  'use strict';
  if (document.getElementById('v5-device-showcase')) return;
  const root = document.documentElement;
  const $ = (selector, within = document) => within.querySelector(selector);
  const $$ = (selector, within = document) => [...within.querySelectorAll(selector)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const english = () => root.lang.toLowerCase().startsWith('en');
  const copy = {
    tr: {
      jump: 'Canlı cihaz vitrini ↗', cap:'EXPERIENCE LAB / 01', deviceTitle:'Gerçek projeler. Yeni bir bakış.', deviceLead:'Projeleri masaüstünde veya telefonda incele. Canlı önizlemeler yalnızca seçtiğinde yüklenir.',
      deviceDesk:'MacBook görünümü', devicePhone:'Telefon görünümü', deviceOpen:'Projeyi ayrı sekmede aç ↗', deviceNotice:'Önizleme erişim ayarları nedeniyle görünmezse projeyi ayrı sekmede açabilirsin.',
      deviceStatus:'ETKİLEŞİMLİ ÖNİZLEME', deviceHint:'Proje seç · Cihaz değiştir', deviceLive:'Çalışan proje', deviceStudy:'Bağımsız konsept',
      perfButton:'Hareket ayarları',perfTitle:'Performans modu',perfDesc:'Görsel hareket yoğunluğunu sen belirle.',perfCinema:'Cinematic',perfBalanced:'Balanced',perfMinimal:'Minimal',perfCinemaSub:'Tam görsel deneyim',perfBalancedSub:'Daha hafif animasyonlar',perfMinimalSub:'Minimum hareket',perfSaved:'Tercihin bu tarayıcıda saklanır.',
      florist:'Çiçekçi Konsepti', bakery:'Mahalle Fırını Konsepti',record:'Plak Dükkânı Konsepti',bike:'Bisiklet Servisi Konsepti',ceramic:'Seramik Atölyesi Konsepti',
      accessible:'Ekran önizlemesi', coffeeHint:'Önizleme içinde kaydır, menüyü ve içecekleri keşfet'
    },
    en: {
      jump: 'Live device showcase ↗',cap:'EXPERIENCE LAB / 01',deviceTitle:'Real projects. A different perspective.',deviceLead:'Explore projects on a laptop or phone. Live previews load only when selected.',
      deviceDesk:'Laptop view',devicePhone:'Phone view',deviceOpen:'Open project in new tab ↗',deviceNotice:'If embedding is blocked, open the original project in a new tab.',
      deviceStatus:'INTERACTIVE PREVIEW',deviceHint:'Choose project · Switch device',deviceLive:'Working project',deviceStudy:'Independent concept',
      perfButton:'Motion settings',perfTitle:'Performance mode',perfDesc:'Choose how much movement your experience has.',perfCinema:'Cinematic',perfBalanced:'Balanced',perfMinimal:'Minimal',perfCinemaSub:'Full visual experience',perfBalancedSub:'Lighter animations',perfMinimalSub:'Minimal movement',perfSaved:'Your preference is saved in this browser.',
      florist:'Florist Concept',bakery:'Bakery Concept',record:'Record Shop Concept',bike:'Bicycle Workshop Concept',ceramic:'Ceramics Studio Concept',
      accessible:'Website preview', coffeeHint:'Scroll inside the preview and explore drinks and the menu'
    }
  };
  const t = (key) => copy[english() ? 'en' : 'tr'][key] || key;
  const allSources = [
    {key:'noctis', name:'NOCTIS', id:'N', kind:'live', url:'https://emrebeymii.github.io/NOCTIS/', hue:'#a9a5ff', short:'NOCTIS · FOCUS'},
    {key:'florist', name:'Çiçekçi Konsepti', kind:'study', url:'./demos/cicekci-konsepti.html', hue:'#e3a1a8', short:'FLORAL · CONCEPT'},
    {key:'bike', name:'Bisiklet Servisi Konsepti', kind:'study', url:'./demos/bisiklet-konsepti.html', hue:'#b7d878', short:'CYCLE · CONCEPT'},
    {key:'velora', name:'VELORA INK', kind:'study', url:'https://velora-ink-concept.emredev.workers.dev/', hue:'#d7a7c4', short:'DREAMSCAPE · CONCEPT'},
    {key:'coffee', name:'MATCHA / COFFEE LAB', kind:'study', url:'https://matcha-coffee-lab-concept.emredev.workers.dev/', hue:'#9cb77b', short:'BEVERAGE · CONCEPT', interactive:true}
  ];
  const sources = ['noctis','velora','coffee','florist','bike'].map(key => allSources.find(item => item.key === key));
  const nameFor = (item) => t(item.key) === item.key ? item.name : t(item.key);
  let motionMode = 'balanced';
  const getStored = () => { try { return localStorage.getItem('emre-motion-v5'); } catch { return null; } };
  const setStored = (mode) => { try { localStorage.setItem('emre-motion-v5',mode); } catch {} };
  function setMode(mode, save=true) {
    if (!['cinematic','balanced','minimal'].includes(mode)) return;
    motionMode = mode; root.dataset.motionMode = mode;
    if (save) setStored(mode);
    $$('[data-v5-mode]').forEach(el => { const on=el.dataset.v5Mode===mode; el.setAttribute('aria-pressed',String(on)); el.classList.toggle('is-current',on); });
    const status = $('#v5-performance-status');if (status) status.textContent = t(mode==='cinematic'?'perfCinema':mode==='balanced'?'perfBalanced':'perfMinimal');
  }
  const stored = getStored();
  const defaultMode = reduce.matches || navigator.connection?.saveData ? 'minimal' : coarse.matches || matchMedia('(max-width:800px)').matches ? 'balanced' : 'cinematic';
  setMode(reduce.matches ? 'minimal' : ['cinematic','balanced','minimal'].includes(stored) ? stored : defaultMode, false);

  const style = document.createElement('style');style.id='motion-v5-styles';
  style.textContent = `
  /* Self-contained v5 design tokens and isolated layouts */
  .v5{--v5-wash:rgba(138,132,255,.07);position:relative;padding:clamp(72px,9vw,136px) 0;color:var(--text);overflow:hidden;isolation:isolate}
  .v5::before{content:"";position:absolute;inset:10% 0 0;z-index:-1;background:radial-gradient(ellipse at 65% 26%,var(--v5-wash),transparent 62%);pointer-events:none}
  .v5-head{display:flex;justify-content:space-between;gap:26px;align-items:end;margin-bottom:32px}
  .v5-kicker{display:inline-flex;align-items:center;gap:9px;font:700 10px/1.5 ui-monospace,monospace;letter-spacing:.16em;color:var(--accent);text-transform:uppercase}
  .v5-kicker::before{content:"";width:7px;height:7px;border:1px solid currentColor;transform:rotate(45deg)}
  .v5-title{font-size:clamp(36px,5.2vw,76px);line-height:1.055;letter-spacing:-.075em;font-weight:750;margin:15px 0 18px;max-width:840px;text-wrap:balance}
  .v5-lead{font-size:clamp(14px,1.3vw,17px);line-height:1.8;max-width:700px;color:var(--muted);margin:0}
  .v5-console{border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 93%,transparent);border-radius:28px;box-shadow:0 35px 120px rgba(0,0,0,.13);overflow:hidden}
  .v5-console-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:18px clamp(18px,3vw,33px);border-bottom:1px solid var(--line)}
  .v5-small-label{font:700 10px ui-monospace,monospace;letter-spacing:.12em;color:var(--subtle)}
  .v5-switches{display:flex;gap:6px;background:var(--bg);border:1px solid var(--line);padding:4px;border-radius:14px}
  .v5-switches button{border:0;border-radius:10px;background:transparent;color:var(--muted);padding:10px 15px;font:700 12px/1.2 ui-monospace,monospace;cursor:pointer;transition:background .2s,color .2s}
  .v5-switches button[aria-pressed=true],.v5-picks button[aria-pressed=true]{background:var(--text);color:var(--bg)}
  .v5-picks{display:flex;gap:8px;flex-wrap:wrap;padding:20px clamp(18px,3vw,34px) 0}
  .v5-picks button{border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--surface-hi);cursor:pointer;padding:10px 14px;font:700 11px/1.3 ui-monospace,monospace;transition:background .24s,border-color .24s,color .24s}
  .v5-picks button:hover,.v5-picks button:focus-visible{border-color:var(--accent)}
  .v5-device-zone{min-height:520px;display:flex;align-items:center;justify-content:center;position:relative;padding:38px 24px;background:radial-gradient(ellipse at 50% 55%,color-mix(in srgb,var(--v5-hue,#8d91d8) 16%,transparent),transparent 58%);perspective:1200px}
  .v5-device-shell{position:relative;display:flex;align-items:center;justify-content:center;width:100%;transform:rotateX(var(--v5-tilt-x,0deg)) rotateY(var(--v5-tilt-y,0deg));transition:transform .24s ease-out;transform-style:preserve-3d}
  .v5-device{position:relative;flex:none;transition:width .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
  .v5-device.is-laptop{width:min(680px,88vw);max-width:100%}
  .v5-device.is-phone{width:min(245px,62vw)}
  .v5-screen{position:relative;background:#0b0d16;overflow:hidden;border:9px solid #272b3c;box-shadow:0 38px 90px rgba(0,0,0,.32),0 0 0 1px #757b99;border-radius:16px;isolation:isolate}
  .v5-device.is-laptop .v5-screen{aspect-ratio:1080 / 670}
  .v5-device.is-phone .v5-screen{aspect-ratio:390 / 844;border:9px solid #242637;border-radius:37px;box-shadow:0 35px 85px rgba(0,0,0,.42)}
  .v5-device.is-phone .v5-screen::after{content:"";z-index:4;position:absolute;top:7px;left:50%;transform:translateX(-50%);width:70px;height:18px;border-radius:20px;background:#0a0c13;pointer-events:none}
  .v5-device.is-laptop::after{content:"";display:block;height:13px;border-radius:3px 3px 19px 19px;background:linear-gradient(#686c7f,#222634 70%,#858aa0);margin:0 -8%;box-shadow:0 11px 15px rgba(0,0,0,.15)}
  .v5-screen iframe{position:absolute;inset:0 auto auto 0;border:0;max-width:none;pointer-events:none;transform-origin:top left;width:1080px;height:670px;transform:scale(var(--v5-scale,.6));background:#0c0f17}
  .v5-screen.is-interactive iframe{pointer-events:auto}
  .v5-device-zone:has(.v5-screen.is-interactive) .v5-device-shell{transform:none!important}
  .v5-screen[aria-busy=true]::before{content:"";position:absolute;inset:0;z-index:2;background:radial-gradient(circle at 50% 45%,rgba(103,103,160,.17),#090b11 77%)}
  .v5-screen[aria-busy=true]::after{content:"...";position:absolute;z-index:3;top:48%;left:50%;transform:translate(-50%,-50%);color:#aaaee5;font:700 18px ui-monospace,monospace;letter-spacing:.3em}
  .v5-device-meta{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center;padding:20px clamp(18px,3vw,34px) 26px}
  .v5-device-meta strong{font-size:clamp(18px,2.2vw,27px);letter-spacing:-.035em}.v5-device-meta p{color:var(--muted);font-size:12px;margin:7px 0 0;line-height:1.5}
  .v5-link{color:var(--text);text-decoration:none;border:1px solid var(--line);background:var(--surface-hi);padding:12px 16px;border-radius:14px;font:700 12px/1.3 ui-monospace,monospace;display:inline-flex;align-items:center;gap:8px;transition:border-color .2s,transform .2s}
  .v5-link:hover{border-color:var(--accent);transform:translateY(-2px)}
  .v5-note{margin-top:12px;font:500 12px/1.6 ui-monospace,monospace;color:var(--subtle)}
  .v5-toolbar{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:1500;display:flex;flex-direction:column;align-items:end;gap:9px}
  .v5-toolbar-button{display:flex;align-items:center;gap:7px;border:1px solid rgba(190,191,227,.27);padding:12px 17px;border-radius:999px;background:#101424;color:#eceefd;box-shadow:0 14px 50px rgba(0,0,0,.25);font:700 12px ui-monospace,monospace;cursor:pointer}
  .v5-toolbar-button:hover{background:#232942}.v5-toolbar-button:focus-visible,.v5-switches button:focus-visible,.v5-picks button:focus-visible,.v5-link:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .v5-performance{max-width:calc(100vw - 24px);width:330px;border:1px solid var(--line);border-radius:23px;padding:22px;background:var(--surface);color:var(--text);box-shadow:0 25px 100px rgba(0,0,0,.32)}
  .v5-performance[hidden]{display:none!important}.v5-perf-title{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:18px;font-weight:760}.v5-perf-desc{font-size:12px;line-height:1.6;color:var(--muted);margin:8px 0 17px}.v5-mode-option{display:block;width:100%;background:transparent;border:1px solid var(--line);border-radius:14px;color:var(--text);text-align:left;cursor:pointer;padding:12px 14px;margin:8px 0;transition:border-color .2s,background .2s}.v5-mode-option[aria-pressed=true]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 13%,transparent)}.v5-mode-option b{display:block;font-size:13px}.v5-mode-option small{display:block;color:var(--muted);font-size:11px;margin-top:4px}.v5-perf-note{font:500 10px/1.6 ui-monospace,monospace;color:var(--subtle);margin:15px 0 0}
  html[data-motion-mode="balanced"] .v5-device-shell{transition-duration:.12s;transform:none!important}
  html[data-motion-mode="balanced"] .kinetic-cursor{display:none!important}
  html[data-motion-mode="minimal"] *,html[data-motion-mode="minimal"] *::before,html[data-motion-mode="minimal"] *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
  html[data-motion-mode="minimal"] .v5-device-shell{transform:none!important}
  html[data-motion-mode="minimal"] .kinetic-cursor,html[data-motion-mode="minimal"] .cursor-light{display:none!important}
  @media (max-width:760px){.v5{padding:75px 0}.v5-head{display:block;margin-bottom:24px}.v5-console{border-radius:20px}.v5-console-head{padding:16px}.v5-picks{flex-wrap:nowrap;overflow-x:auto;padding:16px 14px 8px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}.v5-picks button{flex:none;scroll-snap-align:start;white-space:nowrap}.v5-device-zone{min-height:460px;padding:32px 15px}.v5-device.is-laptop{width:min(100%,680px)}.v5-device.is-phone{width:min(218px,58vw)}.v5-screen{border-width:6px}.v5-device-meta{padding:18px 16px 22px}.v5-toolbar{bottom:max(14px,env(safe-area-inset-bottom));right:13px}.v5-toolbar-button{padding:10px 14px;font-size:11px}.v5-performance{width:min(320px,calc(100vw - 26px))}}
  @media (max-width:360px){.v5-device-zone{min-height:430px}.v5-device.is-phone{width:185px}}
  @media (prefers-reduced-motion:reduce){.v5 *, .v5 *::before,.v5 *::after{transition:none!important;animation:none!important}}
  /* Motion settings live in the top navigation, never over page content. */
  #nav-links .v5-toolbar{position:relative;inset:auto;display:block;z-index:auto}
  #nav-links .v5-toolbar-button{width:36px;height:36px;justify-content:center;padding:0;border-radius:11px;box-shadow:none;background:var(--surface);color:var(--muted);border:1px solid var(--line)}
  #nav-links .v5-toolbar-button svg{width:17px;height:17px;flex:none}
  #nav-links .v5-perf-button-label,#nav-links #v5-performance-status{display:none}
  #nav-links .v5-performance{position:absolute;top:calc(100% + 14px);right:0;z-index:100;width:min(310px,calc(100vw - 32px))}
  @media(max-width:1100px){#nav-links .v5-toolbar-button{width:auto;padding:9px 13px;height:auto;min-height:36px;justify-content:flex-start;gap:9px}#nav-links .v5-perf-button-label,#nav-links #v5-performance-status{display:inline}#nav-links #v5-performance-status{opacity:.65;font-size:10px}#nav-links .v5-performance{position:relative;top:auto;right:auto;margin:0 0 10px;width:min(310px,calc(100vw - 54px));padding:16px;box-shadow:none}#nav-links .v5-toolbar{width:100%;display:flex;flex-direction:column-reverse;align-items:flex-start}#nav-links.open{max-height:calc(100dvh - 80px);overflow-y:auto}}
  #apex-motion-slot .v5-toolbar{position:static;display:block;width:auto;inset:auto}
  #apex-motion-slot .v5-toolbar-button{width:40px;height:35px;padding:0;justify-content:center;gap:0;background:var(--bg);color:var(--text);border:1px solid var(--line);border-radius:7px}
  #apex-motion-slot .v5-toolbar-button svg{width:18px;height:18px}
  #apex-motion-slot .v5-perf-button-label,#apex-motion-slot #v5-performance-status{display:none}
  #apex-motion-slot .v5-performance{position:fixed;top:auto;bottom:16px;left:50%;right:auto;transform:translateX(-50%);z-index:120;width:min(310px,calc(100% - 26px));max-height:80%;overflow-y:auto;margin:0;padding:17px;box-shadow:0 16px 60px #0006}
  `;
  document.head.append(style);

  function i18nAttr(key, tag='span') {return `<${tag} data-v5="${key}">${copy.tr[key]}</${tag}>`;}
  const previewMarkup = () => `<iframe id="v5-preview-frame" loading="lazy" title="${t('accessible')}" referrerpolicy="no-referrer" tabindex="-1"></iframe>`;
  const device = document.createElement('section');device.id='v5-device-showcase';device.className='v5';device.setAttribute('aria-label','Live device showcase');
  device.innerHTML = `<div class="container"><div class="v5-head"><div><span class="v5-kicker" data-v5="cap"></span><h2 class="v5-title" data-v5="deviceTitle"></h2><p class="v5-lead" data-v5="deviceLead"></p></div><span class="v5-small-label">${String(sources.filter(s=>s.kind==='live').length).padStart(2,'0')} PRODUCT / ${String(sources.filter(s=>s.kind==='study').length).padStart(2,'0')} CONCEPTS</span></div>
    <div class="v5-console"><div class="v5-console-head"><span class="v5-small-label" data-v5="deviceStatus"></span><div class="v5-switches" role="group" aria-label="Device format"><button type="button" data-device="laptop" aria-pressed="true" data-v5="deviceDesk"></button><button type="button" data-device="phone" aria-pressed="false" data-v5="devicePhone"></button></div></div>
    <div class="v5-picks" role="group" aria-label="Select project">${sources.map((s,i)=>`<button type="button" data-project="${i}" aria-pressed="${i===0}">${s.name}</button>`).join('')}</div>
    <div class="v5-device-zone" id="v5-device-zone"><div class="v5-device-shell" id="v5-device-shell"><div class="v5-device is-laptop" id="v5-device"><div class="v5-screen" id="v5-device-screen" aria-busy="true">${previewMarkup()}</div></div></div></div>
    <div class="v5-device-meta"><div><strong id="v5-selected-name">Çiçekçi Konsepti</strong><p><span id="v5-project-kind"></span> · <span data-v5="deviceHint"></span></p></div><a id="v5-project-link" class="v5-link" href="./demos/cicekci-konsepti.html" target="_blank" rel="noopener noreferrer" data-v5="deviceOpen"></a></div></div><p class="v5-note" data-v5="deviceNotice"></p></div>`;

  const about=$('#about');const main=$('#main');if(!about||!main)return;
  const anchor=$('#expertise')||$('#contact');main.insertBefore(device,anchor);document.dispatchEvent(new CustomEvent("device-showcase-ready",{detail:device}));
  const workSubtitle=$('#work .section-sub');if(workSubtitle){const jump=document.createElement('a');jump.href='#v5-device-showcase';jump.className='v5-link';jump.style.marginTop='18px';jump.dataset.v5='jump';workSubtitle.after(jump)}

  const bar = document.createElement('div');bar.className='v5-toolbar';bar.id='v5-toolbar';bar.setAttribute('aria-label','Performance settings');
  bar.innerHTML = `<div id="v5-performance" class="v5-performance" hidden><div class="v5-perf-title"><span data-v5="perfTitle"></span><span aria-hidden="true">◈</span></div><p class="v5-perf-desc" data-v5="perfDesc"></p>${['cinematic','balanced','minimal'].map(mode=>`<button class="v5-mode-option" type="button" data-v5-mode="${mode}" aria-pressed="false"><b data-v5="perf${(mode==='cinematic'?'Cinema':mode[0].toUpperCase()+mode.slice(1))}"></b><small data-v5="perf${mode==='cinematic'?'Cinema':mode[0].toUpperCase()+mode.slice(1)}Sub"></small></button>`).join('')}<p class="v5-perf-note" data-v5="perfSaved"></p></div><button type="button" class="v5-toolbar-button" id="v5-toolbar-toggle" aria-expanded="false" aria-controls="v5-performance"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><circle cx="8" cy="18" r="2" fill="currentColor"/></svg><span class="v5-perf-button-label" data-v5="perfButton"></span><span id="v5-performance-status"></span></button>`;
  const menu=$('#apex-motion-slot')||$('#nav-links');(menu||document.body).append(bar);
  const panel=$('#v5-performance'),toggle=$('#v5-toolbar-toggle');
  const closePanel=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false')};
  toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden))});
  $$('[data-v5-mode]').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.v5Mode)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){closePanel();toggle.focus()}});
  document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!bar.contains(e.target))closePanel()},{passive:true});
  setMode(motionMode,false);

  function syncLanguage(){
    $$('[data-v5]').forEach(el=>{el.textContent=t(el.dataset.v5)});
    $$('[data-project]').forEach(el=>{const s=sources[+el.dataset.project];el.textContent=nameFor(s)});
    $('#v5-preview-frame')?.setAttribute('title',t('accessible')+' — '+nameFor(sources[activeProject]));
    refreshProjectLabels();setMode(motionMode,false);toggle.setAttribute("aria-label",t("perfButton"));toggle.title=t("perfButton");
  }
  const languageWatcher=new MutationObserver(mutations=>{if(mutations.some(x=>x.attributeName==='lang'))syncLanguage()});
  languageWatcher.observe(root,{attributes:true,attributeFilter:['lang']});

  let activeProject=0,deviceType='laptop',deviceLoaded=false;
  const preview=$('#v5-preview-frame'),screen=$('#v5-device-screen'),deviceEl=$('#v5-device'),zone=$('#v5-device-zone');
  let currentPreviewUrl='';
  const scaleDevice=()=>{
    const width=screen.clientWidth;
    const virtualWidth=deviceType==='phone'?390:1080;
    preview.style.width=virtualWidth+'px'; preview.style.height=(deviceType==='phone'?844:670)+'px';
    screen.style.setProperty('--v5-scale',Math.max(.1,width/virtualWidth).toFixed(4));
  };
  const deviceResize=new ResizeObserver(scaleDevice);deviceResize.observe(screen);
  function refreshProjectLabels(){const s=sources[activeProject];$('#v5-selected-name').textContent=nameFor(s);$('#v5-project-kind').textContent=t(s.kind==='live'?'deviceLive':'deviceStudy');$('#v5-project-link').href=s.url;const hint=$('[data-v5="deviceHint"]',device);if(hint)hint.textContent=t(s.interactive?'coffeeHint':'deviceHint');preview.title=t('accessible')+' — '+nameFor(s)}
  function selectProject(index,load=true){
    if(index<0||index>=sources.length)return;
    activeProject=index;const s=sources[index];
    $$('[data-project]').forEach(btn=>btn.setAttribute('aria-pressed',String(+btn.dataset.project===index)));
    zone.style.setProperty('--v5-hue',s.hue);screen.classList.toggle('is-interactive',!!s.interactive);preview.tabIndex=s.interactive?0:-1;refreshProjectLabels();
    if(load){if(currentPreviewUrl!==s.url){screen.setAttribute('aria-busy','true');currentPreviewUrl=s.url;preview.src=s.url;}deviceLoaded=true}
  }
  $$('[data-project]').forEach(btn=>btn.addEventListener('click',()=>selectProject(+btn.dataset.project)));
  preview.addEventListener('load',()=>screen.setAttribute('aria-busy','false'));
  function setDevice(type){if(type!=='laptop'&&type!=='phone')return;deviceType=type;deviceEl.classList.toggle('is-laptop',type==='laptop');deviceEl.classList.toggle('is-phone',type==='phone');$$('[data-device]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.device===type)));scaleDevice()}
  $$('[data-device]').forEach(btn=>btn.addEventListener('click',()=>setDevice(btn.dataset.device)));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!deviceLoaded)selectProject(0);observer.disconnect()}},{rootMargin:'100px 0px'});observer.observe(zone)}else selectProject(0);
  // GPU-friendly, desktop-only tilt. No continuous repaint on touch devices or in Balanced/Minimal modes.
  if(!coarse.matches){let pending=0;zone.addEventListener('pointermove',e=>{if(motionMode!=='cinematic')return;if(pending)return;const rect=zone.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;pending=requestAnimationFrame(()=>{pending=0;$('#v5-device-shell').style.setProperty('--v5-tilt-y',(x*7).toFixed(2)+'deg');$('#v5-device-shell').style.setProperty('--v5-tilt-x',(-y*5).toFixed(2)+'deg')})},{passive:true});zone.addEventListener('pointerleave',()=>{$('#v5-device-shell').style.setProperty('--v5-tilt-y','0deg');$('#v5-device-shell').style.setProperty('--v5-tilt-x','0deg')})}

  reduce.addEventListener?.('change',e=>{if(e.matches)setMode('minimal',false)});
  syncLanguage();selectProject(0,false);scaleDevice();
  console.info('[Motion Studio V5] Device showcase and performance modes ready.');
})();