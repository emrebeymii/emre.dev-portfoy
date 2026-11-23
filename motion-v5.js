/* Motion Studio v5 | Device showcase, magnetic text lab, concept comparisons & performance controls.
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
      compareCap:'EXPERIENCE LAB / 02',compareTitle:'Farkı kaydırarak keşfet.',compareLead:'Solda temsili standart arayüz, sağda hazırladığım bağımsız konsept. Bu bir gerçek müşteri sitesinin eski/yeni karşılaştırması değildir.',compareBefore:'TEMSİLİ STANDART TASARIM',compareAfter:'KONSEPT TASARIM',compareAction:'Konsept demosunu aç ↗',compareInfo:'Karşılaştırma için çizilmiş örnek düzen. Gerçek bir işletmenin önceki sitesi değildir.', compareRange:'Önce / sonra karşılaştırma konumu',
      magCap:'EXPERIENCE LAB / 03', magTitle:'Arayüz sadece görünmez. Hissedilir.', magLead:'Kelimelere dokun, imlecini hareket ettir veya aşağıdaki düğmeyle etkileşimi başlat. Animasyon yoğunluğu cihazına uyum sağlar.',magButton:'Bir kıvılcım oluştur ✦',magHint:'HAREKET / DOKUNMA / DENE',magMain:'DAHA FAZLA',magSub:'HİSSET.',
      perfButton:'Hareket ayarları',perfTitle:'Performans modu',perfDesc:'Görsel hareket yoğunluğunu sen belirle.',perfCinema:'Cinematic',perfBalanced:'Balanced',perfMinimal:'Minimal',perfCinemaSub:'Tam görsel deneyim',perfBalancedSub:'Daha hafif animasyonlar',perfMinimalSub:'Minimum hareket',perfSaved:'Tercihin bu tarayıcıda saklanır.',
      florist:'Çiçekçi Konsepti', bakery:'Mahalle Fırını Konsepti',record:'Plak Dükkânı Konsepti',bike:'Bisiklet Servisi Konsepti',ceramic:'Seramik Atölyesi Konsepti',
      accessible:'Ekran önizlemesi', defaultSite:'ÖRNEK İŞLETME', defaultTitle:'İşletmeniz için web sitesi',defaultTag:'Anasayfa　Hizmetler　İletişim',defaultCard:'Ürün veya hizmet bilgisi',defaultButton:'İletişime geç',placeholder:'Önizleme yükleniyor…'
    },
    en: {
      jump: 'Live device showcase ↗',cap:'EXPERIENCE LAB / 01',deviceTitle:'Real projects. A different perspective.',deviceLead:'Explore projects on a laptop or phone. Live previews load only when selected.',
      deviceDesk:'Laptop view',devicePhone:'Phone view',deviceOpen:'Open project in new tab ↗',deviceNotice:'If embedding is blocked, open the original project in a new tab.',
      deviceStatus:'INTERACTIVE PREVIEW',deviceHint:'Choose project · Switch device',deviceLive:'Working project',deviceStudy:'Independent concept',
      compareCap:'EXPERIENCE LAB / 02',compareTitle:'Drag to discover the difference.',compareLead:'The left side is an illustrative standard layout; the right side is my independent concept. This does not depict an actual client’s old website.',compareBefore:'ILLUSTRATIVE BASELINE',compareAfter:'DESIGN CONCEPT',compareAction:'Open concept demo ↗',compareInfo:'An illustrative baseline, not the previous website of a real business.',compareRange:'Before and after comparison position',
      magCap:'EXPERIENCE LAB / 03',magTitle:'A UI is more than something you see.',magLead:'Move your cursor, touch the canvas or use the button to spark an interaction. Motion adapts to your device.',magButton:'Create a spark ✦',magHint:'MOVE / TOUCH / EXPLORE',magMain:'FEEL',magSub:'THE DIFFERENCE.',
      perfButton:'Motion settings',perfTitle:'Performance mode',perfDesc:'Choose how much movement your experience has.',perfCinema:'Cinematic',perfBalanced:'Balanced',perfMinimal:'Minimal',perfCinemaSub:'Full visual experience',perfBalancedSub:'Lighter animations',perfMinimalSub:'Minimal movement',perfSaved:'Your preference is saved in this browser.',
      florist:'Florist Concept',bakery:'Bakery Concept',record:'Record Shop Concept',bike:'Bicycle Workshop Concept',ceramic:'Ceramics Studio Concept',
      accessible:'Website preview',defaultSite:'EXAMPLE BUSINESS',defaultTitle:'A website for your business',defaultTag:'Home　Services　Contact',defaultCard:'Product or service information',defaultButton:'Contact us',placeholder:'Loading preview…'
    }
  };
  const t = (key) => copy[english() ? 'en' : 'tr'][key] || key;
  const sources = [
    {key:'noctis', name:'NOCTIS', id:'N', kind:'live', url:'https://emrebeymii.github.io/NOCTIS/', hue:'#a9a5ff', short:'NOCTIS · FOCUS'},
    {key:'florist', name:'Çiçekçi Konsepti', kind:'study', url:'./demos/cicekci-konsepti.html', hue:'#e3a1a8', short:'FLORAL · CONCEPT'},
    {key:'record', name:'Plak Dükkânı Konsepti', kind:'study', url:'./demos/plak-konsepti.html', hue:'#fa9c57', short:'VINYL · CONCEPT'},
    {key:'bakery', name:'Mahalle Fırını Konsepti', kind:'study', url:'./demos/firin-konsepti.html', hue:'#d2b582', short:'BAKERY · CONCEPT'},
    {key:'bike', name:'Bisiklet Servisi Konsepti', kind:'study', url:'./demos/bisiklet-konsepti.html', hue:'#b7d878', short:'CYCLE · CONCEPT'},
    {key:'ceramic', name:'Seramik Atölyesi Konsepti', kind:'study', url:'./demos/seramik-konsepti.html', hue:'#d6ad89', short:'CLAY · CONCEPT'},
    {key:'velora', name:'VELORA INK', kind:'study', url:'https://velora-ink-concept.emredev.workers.dev/', hue:'#d7a7c4', short:'DREAMSCAPE · CONCEPT'}
  ];
  const studies = sources.filter(item => item.kind === 'study');
  const nameFor = (item) => t(item.key) === item.key ? item.name : t(item.key);
  let motionMode = 'balanced';
  const getStored = () => { try { return localStorage.getItem('emre-motion-v5'); } catch { return null; } };
  const setStored = (mode) => { try { localStorage.setItem('emre-motion-v5',mode); } catch {} };
  function setMode(mode, save=true) {
    if (!['cinematic','balanced','minimal'].includes(mode)) return;
    motionMode = mode; root.dataset.motionMode = mode;
    if (save) setStored(mode);
    $$('[data-v5-mode]').forEach(el => { const on=el.dataset.v5Mode===mode; el.setAttribute('aria-pressed',String(on)); el.classList.toggle('is-current',on); });
    const status = $('#v5-performance-status');if (status) status.textContent = t('perf'+mode[0].toUpperCase()+mode.slice(1));
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
  .v5-screen[aria-busy=true]::before{content:"";position:absolute;inset:0;z-index:2;background:radial-gradient(circle at 50% 45%,rgba(103,103,160,.17),#090b11 77%)}
  .v5-screen[aria-busy=true]::after{content:"...";position:absolute;z-index:3;top:48%;left:50%;transform:translate(-50%,-50%);color:#aaaee5;font:700 18px ui-monospace,monospace;letter-spacing:.3em}
  .v5-device-meta{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center;padding:20px clamp(18px,3vw,34px) 26px}
  .v5-device-meta strong{font-size:clamp(18px,2.2vw,27px);letter-spacing:-.035em}.v5-device-meta p{color:var(--muted);font-size:12px;margin:7px 0 0;line-height:1.5}
  .v5-link{color:var(--text);text-decoration:none;border:1px solid var(--line);background:var(--surface-hi);padding:12px 16px;border-radius:14px;font:700 12px/1.3 ui-monospace,monospace;display:inline-flex;align-items:center;gap:8px;transition:border-color .2s,transform .2s}
  .v5-link:hover{border-color:var(--accent);transform:translateY(-2px)}
  .v5-note{margin-top:12px;font:500 12px/1.6 ui-monospace,monospace;color:var(--subtle)}
  .v5-compare-board{--v5-split:50%;position:relative;overflow:hidden;min-height:480px;height:min(48vw,580px);background:#eae8e2;touch-action:pan-y;cursor:ew-resize;isolation:isolate}
  .v5-before{position:absolute;inset:0;display:flex;flex-direction:column;overflow:hidden;background:#eeeae1;color:#232221;font-family:Arial,sans-serif}
  .v5-before-nav{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#faf9f6;border-bottom:1px solid #d9d6d0;padding:24px clamp(24px,5vw,74px)}
  .v5-before-nav b{font-size:22px;font-weight:800}.v5-before-nav span{font-size:13px;color:#777}
  .v5-before-body{padding:clamp(25px,5vw,78px);max-width:780px}.v5-before-body small{font:700 11px ui-monospace,monospace;letter-spacing:.14em;color:#666}.v5-before-body h3{font-size:clamp(24px,4vw,48px);line-height:1.2;letter-spacing:-.045em;margin:24px 0;color:#282827}.v5-before-body p{font-size:15px;color:#75736e;line-height:1.65;max-width:490px}.v5-before-body button{margin-top:22px;border:0;border-radius:4px;padding:15px 25px;background:#7a7b80;color:#fff;font:600 14px Arial,sans-serif}.v5-before-cards{display:flex;gap:14px;margin-top:36px}.v5-before-cards i{display:block;flex:1;max-width:180px;height:116px;border:1px solid #d0cfca;background:#dcdad4}
  .v5-after{position:absolute;inset:0;overflow:hidden;background:#10131e;clip-path:inset(0 0 0 var(--v5-split));pointer-events:none}
  .v5-after iframe{position:absolute;top:0;left:0;width:1100px;height:1200px;border:0;pointer-events:none;transform-origin:top left;transform:scale(var(--v5-scale,.8));background:#11131a}
  .v5-compare-line{position:absolute;top:0;bottom:0;width:2px;background:#fff;left:var(--v5-split);transform:translateX(-50%);box-shadow:0 0 20px rgba(0,0,0,.3);z-index:5;pointer-events:none}
  .v5-compare-line::after{content:'↔';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:grid;place-items:center;width:52px;height:52px;border-radius:50%;color:#181b27;background:#fff;font:700 23px ui-monospace,monospace;box-shadow:0 10px 40px rgba(0,0,0,.2)}
  .v5-before-tag,.v5-after-tag{position:absolute;z-index:4;top:20px;font:800 10px ui-monospace,monospace;letter-spacing:.09em;padding:11px 14px;border-radius:11px;pointer-events:none}
  .v5-before-tag{left:20px;background:#f8f8f4;color:#333}.v5-after-tag{right:20px;background:#151824;color:white}
  .v5-compare-controls{display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:22px clamp(18px,3vw,34px)}
  .v5-range{flex:1;min-width:180px;max-width:550px;width:100%;accent-color:var(--accent);cursor:ew-resize;height:32px}
  .v5-compare-meta{display:flex;flex-direction:column;gap:4px;color:var(--muted);font:600 12px/1.5 ui-monospace,monospace}
  .v5-compare-meta small{font-weight:450;color:var(--subtle);max-width:610px}
  .v5-magnetic-stage{position:relative;min-height:430px;background:radial-gradient(circle at var(--v5-x,50%) var(--v5-y,50%),rgba(125,129,248,.22),transparent 35%),linear-gradient(145deg,#101426,#0b0e17);border-radius:28px;border:1px solid rgba(149,156,203,.18);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:22px;overflow:hidden;isolation:isolate}
  .v5-magnetic-stage::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:56px 56px;opacity:.38;pointer-events:none}
  .v5-magnetic-stage h3{position:relative;z-index:1;margin:0;text-align:center;font-weight:830;letter-spacing:-.105em;line-height:.94;font-size:clamp(52px,10vw,148px);color:#f3f4ff;transform:translate3d(var(--v5-tx,0px),var(--v5-ty,0px),0) rotate(var(--v5-r,0deg));transition:transform .16s ease-out;user-select:none}
  .v5-magnetic-stage h3 span{display:block;color:#b0b8ff}.v5-magnetic-stage .v5-caption{position:relative;z-index:2;font:700 10px/1.5 ui-monospace,monospace;letter-spacing:.18em;color:#8b95b4}
  .v5-spark-btn{position:relative;z-index:3;border:1px solid #555b83;border-radius:999px;background:rgba(161,157,248,.1);padding:13px 22px;color:#f3f3fe;font:700 12px ui-monospace,monospace;cursor:pointer;transition:background .2s,transform .2s}
  .v5-spark-btn:hover{background:rgba(161,157,248,.3);transform:translateY(-2px)}
  .v5-particle{position:absolute;z-index:2;width:var(--size,7px);height:var(--size,7px);left:var(--sx);top:var(--sy);background:var(--clr,#a2a4ff);border-radius:50%;pointer-events:none;animation:v5Burst .75s ease-out forwards}
  @keyframes v5Burst{from{transform:translate(-50%,-50%) scale(1);opacity:1}to{transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.1);opacity:0}}
  .v5-toolbar{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:1500;display:flex;flex-direction:column;align-items:end;gap:9px}
  .v5-toolbar-button{display:flex;align-items:center;gap:7px;border:1px solid rgba(190,191,227,.27);padding:12px 17px;border-radius:999px;background:#101424;color:#eceefd;box-shadow:0 14px 50px rgba(0,0,0,.25);font:700 12px ui-monospace,monospace;cursor:pointer}
  .v5-toolbar-button:hover{background:#232942}.v5-toolbar-button:focus-visible,.v5-switches button:focus-visible,.v5-picks button:focus-visible,.v5-spark-btn:focus-visible,.v5-link:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  .v5-performance{max-width:calc(100vw - 24px);width:330px;border:1px solid var(--line);border-radius:23px;padding:22px;background:var(--surface);color:var(--text);box-shadow:0 25px 100px rgba(0,0,0,.32)}
  .v5-performance[hidden]{display:none!important}.v5-perf-title{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:18px;font-weight:760}.v5-perf-desc{font-size:12px;line-height:1.6;color:var(--muted);margin:8px 0 17px}.v5-mode-option{display:block;width:100%;background:transparent;border:1px solid var(--line);border-radius:14px;color:var(--text);text-align:left;cursor:pointer;padding:12px 14px;margin:8px 0;transition:border-color .2s,background .2s}.v5-mode-option[aria-pressed=true]{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 13%,transparent)}.v5-mode-option b{display:block;font-size:13px}.v5-mode-option small{display:block;color:var(--muted);font-size:11px;margin-top:4px}.v5-perf-note{font:500 10px/1.6 ui-monospace,monospace;color:var(--subtle);margin:15px 0 0}
  html[data-motion-mode="balanced"] .v5-device-shell{transition-duration:.12s;transform:none!important}
  html[data-motion-mode="balanced"] .v5-magnetic-stage h3{transition-duration:.12s}
  html[data-motion-mode="balanced"] .v5-particle{animation-duration:.25s}
  html[data-motion-mode="balanced"] .kinetic-cursor{display:none!important}
  html[data-motion-mode="minimal"] *,html[data-motion-mode="minimal"] *::before,html[data-motion-mode="minimal"] *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
  html[data-motion-mode="minimal"] .v5-magnetic-stage h3,html[data-motion-mode="minimal"] .v5-device-shell{transform:none!important}
  html[data-motion-mode="minimal"] .v5-particle,html[data-motion-mode="minimal"] .kinetic-cursor,html[data-motion-mode="minimal"] .cursor-light{display:none!important}
  @media (max-width:760px){.v5{padding:75px 0}.v5-head{display:block;margin-bottom:24px}.v5-console{border-radius:20px}.v5-console-head{padding:16px}.v5-picks{flex-wrap:nowrap;overflow-x:auto;padding:16px 14px 8px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}.v5-picks button{flex:none;scroll-snap-align:start;white-space:nowrap}.v5-device-zone{min-height:460px;padding:32px 15px}.v5-device.is-laptop{width:min(100%,680px)}.v5-device.is-phone{width:min(218px,58vw)}.v5-screen{border-width:6px}.v5-device-meta{padding:18px 16px 22px}.v5-compare-board{height:380px;min-height:0}.v5-before-nav{padding:18px 16px}.v5-before-nav b{font-size:15px}.v5-before-nav span{display:none}.v5-before-body{padding:42px 24px}.v5-before-body h3{font-size:26px}.v5-before-cards{margin-top:15px}.v5-before-cards i{height:64px}.v5-before-tag,.v5-after-tag{font-size:8px;top:10px;padding:8px}.v5-before-tag{left:10px}.v5-after-tag{right:10px}.v5-magnetic-stage{min-height:360px}.v5-magnetic-stage h3{font-size:clamp(48px,14vw,90px)}.v5-toolbar{bottom:max(14px,env(safe-area-inset-bottom));right:13px}.v5-toolbar-button{padding:10px 14px;font-size:11px}.v5-performance{width:min(320px,calc(100vw - 26px))}.v5-compare-controls{padding:16px;gap:10px}.v5-range{max-width:none}}
  @media (max-width:360px){.v5-device-zone{min-height:430px}.v5-device.is-phone{width:185px}.v5-magnetic-stage h3{font-size:43px}}
  @media (prefers-reduced-motion:reduce){.v5 *, .v5 *::before,.v5 *::after{transition:none!important;animation:none!important}.v5-particle{display:none!important}}
  `;
  document.head.append(style);

  function i18nAttr(key, tag='span') {return `<${tag} data-v5="${key}">${copy.tr[key]}</${tag}>`;}
  const previewMarkup = () => `<iframe id="v5-preview-frame" loading="lazy" title="${t('accessible')}" referrerpolicy="no-referrer" tabindex="-1"></iframe>`;
  const device = document.createElement('section');device.id='v5-device-showcase';device.className='v5';device.setAttribute('aria-label','Live device showcase');
  device.innerHTML = `<div class="container"><div class="v5-head"><div><span class="v5-kicker" data-v5="cap"></span><h2 class="v5-title" data-v5="deviceTitle"></h2><p class="v5-lead" data-v5="deviceLead"></p></div><span class="v5-small-label">01 PRODUCT / 05 CONCEPTS</span></div>
    <div class="v5-console"><div class="v5-console-head"><span class="v5-small-label" data-v5="deviceStatus"></span><div class="v5-switches" role="group" aria-label="Device format"><button type="button" data-device="laptop" aria-pressed="true" data-v5="deviceDesk"></button><button type="button" data-device="phone" aria-pressed="false" data-v5="devicePhone"></button></div></div>
    <div class="v5-picks" role="group" aria-label="Select project">${sources.map((s,i)=>`<button type="button" data-project="${i}" aria-pressed="${i===1}">${s.name}</button>`).join('')}</div>
    <div class="v5-device-zone" id="v5-device-zone"><div class="v5-device-shell" id="v5-device-shell"><div class="v5-device is-laptop" id="v5-device"><div class="v5-screen" id="v5-device-screen" aria-busy="true">${previewMarkup()}</div></div></div></div>
    <div class="v5-device-meta"><div><strong id="v5-selected-name">Çiçekçi Konsepti</strong><p><span id="v5-project-kind"></span> · <span data-v5="deviceHint"></span></p></div><a id="v5-project-link" class="v5-link" href="./demos/cicekci-konsepti.html" target="_blank" rel="noopener noreferrer" data-v5="deviceOpen"></a></div></div><p class="v5-note" data-v5="deviceNotice"></p></div>`;

  const compare = document.createElement('section');compare.id='v5-before-after';compare.className='v5';compare.setAttribute('aria-label','Illustrative before and after design comparison');
  compare.innerHTML = `<div class="container"><div class="v5-head"><div><span class="v5-kicker" data-v5="compareCap"></span><h2 class="v5-title" data-v5="compareTitle"></h2><p class="v5-lead" data-v5="compareLead"></p></div></div>
    <div class="v5-console"><div class="v5-picks" id="v5-compare-picks" role="group" aria-label="Select design concept">${studies.map((s,i)=>`<button type="button" data-compare="${i}" aria-pressed="${i===0}">${s.name}</button>`).join('')}</div>
    <div class="v5-compare-board" id="v5-compare-board" style="--v5-split:50%" aria-label="Illustrative layout comparison"><div class="v5-before"><div class="v5-before-nav"><b id="v5-before-brand"></b><span data-v5="defaultTag"></span></div><div class="v5-before-body"><small data-v5="defaultSite"></small><h3 data-v5="defaultTitle"></h3><p data-v5="defaultCard"></p><button type="button" tabindex="-1" data-v5="defaultButton"></button><div class="v5-before-cards"><i></i><i></i><i></i></div></div></div><div class="v5-after" id="v5-after"><iframe id="v5-after-frame" loading="lazy" tabindex="-1" title="Independent redesign concept" referrerpolicy="no-referrer"></iframe></div><div class="v5-before-tag" data-v5="compareBefore"></div><div class="v5-after-tag" data-v5="compareAfter"></div><div class="v5-compare-line"></div></div>
    <div class="v5-compare-controls"><div class="v5-compare-meta"><strong id="v5-compare-name"></strong><small data-v5="compareInfo"></small></div><input class="v5-range" id="v5-compare-range" type="range" min="0" max="100" value="50" aria-label="${copy.tr.compareRange}" /><a class="v5-link" id="v5-compare-link" target="_blank" rel="noopener noreferrer" data-v5="compareAction"></a></div></div></div>`;

  const magnetic = document.createElement('section');magnetic.id='v5-magnetic';magnetic.className='v5';magnetic.setAttribute('aria-label','Magnetic typography playground');
  magnetic.innerHTML = `<div class="container"><div class="v5-head"><div><span class="v5-kicker" data-v5="magCap"></span><h2 class="v5-title" data-v5="magTitle"></h2><p class="v5-lead" data-v5="magLead"></p></div></div>
    <div class="v5-magnetic-stage" id="v5-magnetic-stage"><div class="v5-caption" data-v5="magHint"></div><h3 id="v5-magnetic-words"><span data-v5="magMain"></span><span data-v5="magSub"></span></h3><button type="button" class="v5-spark-btn" id="v5-spark" data-v5="magButton"></button></div></div>`;

  const about=$('#about');const main=$('#main');if(!about||!main)return;
  main.insertBefore(device,about);main.insertBefore(compare,about);main.insertBefore(magnetic,about);
  const workSubtitle=$('#work .section-sub');if(workSubtitle){const jump=document.createElement('a');jump.href='#v5-device-showcase';jump.className='v5-link';jump.style.marginTop='18px';jump.dataset.v5='jump';workSubtitle.after(jump)}

  const bar = document.createElement('aside');bar.className='v5-toolbar';bar.id='v5-toolbar';bar.setAttribute('aria-label','Performance settings');
  bar.innerHTML = `<div id="v5-performance" class="v5-performance" hidden><div class="v5-perf-title"><span data-v5="perfTitle"></span><span aria-hidden="true">◈</span></div><p class="v5-perf-desc" data-v5="perfDesc"></p>${['cinematic','balanced','minimal'].map(mode=>`<button class="v5-mode-option" type="button" data-v5-mode="${mode}" aria-pressed="false"><b data-v5="perf${mode[0].toUpperCase()+mode.slice(1)}"></b><small data-v5="perf${mode[0].toUpperCase()+mode.slice(1)}Sub"></small></button>`).join('')}<p class="v5-perf-note" data-v5="perfSaved"></p></div><button type="button" class="v5-toolbar-button" id="v5-toolbar-toggle" aria-expanded="false" aria-controls="v5-performance"><span aria-hidden="true">◉</span><span data-v5="perfButton"></span><span id="v5-performance-status"></span></button>`;
  document.body.append(bar);
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
    $$('[data-compare]').forEach(el=>{const s=studies[+el.dataset.compare];el.textContent=nameFor(s)});
    $('#v5-compare-range')?.setAttribute('aria-label',t('compareRange'));
    $('#v5-preview-frame')?.setAttribute('title',t('accessible'));
    refreshProjectLabels();refreshCompareLabels();setMode(motionMode,false);
  }
  const languageWatcher=new MutationObserver(mutations=>{if(mutations.some(x=>x.attributeName==='lang'))syncLanguage()});
  languageWatcher.observe(root,{attributes:true,attributeFilter:['lang']});

  let activeProject=1,deviceType='laptop',deviceLoaded=false;
  const preview=$('#v5-preview-frame'),screen=$('#v5-device-screen'),deviceEl=$('#v5-device'),zone=$('#v5-device-zone');
  let currentPreviewUrl='';
  const scaleDevice=()=>{
    const width=screen.clientWidth;
    const virtualWidth=deviceType==='phone'?390:1080;
    preview.style.width=virtualWidth+'px'; preview.style.height=(deviceType==='phone'?844:670)+'px';
    screen.style.setProperty('--v5-scale',Math.max(.1,width/virtualWidth).toFixed(4));
  };
  const deviceResize=new ResizeObserver(scaleDevice);deviceResize.observe(screen);
  function refreshProjectLabels(){const s=sources[activeProject];$('#v5-selected-name').textContent=nameFor(s);$('#v5-project-kind').textContent=t(s.kind==='live'?'deviceLive':'deviceStudy');$('#v5-project-link').href=s.url}
  function selectProject(index,load=true){
    if(index<0||index>=sources.length)return;
    activeProject=index;const s=sources[index];
    $$('[data-project]').forEach(btn=>btn.setAttribute('aria-pressed',String(+btn.dataset.project===index)));
    zone.style.setProperty('--v5-hue',s.hue);refreshProjectLabels();
    if(load){if(currentPreviewUrl!==s.url){screen.setAttribute('aria-busy','true');currentPreviewUrl=s.url;preview.src=s.url;}deviceLoaded=true}
  }
  $$('[data-project]').forEach(btn=>btn.addEventListener('click',()=>selectProject(+btn.dataset.project)));
  preview.addEventListener('load',()=>screen.setAttribute('aria-busy','false'));
  function setDevice(type){if(type!=='laptop'&&type!=='phone')return;deviceType=type;deviceEl.classList.toggle('is-laptop',type==='laptop');deviceEl.classList.toggle('is-phone',type==='phone');$$('[data-device]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.device===type)));scaleDevice()}
  $$('[data-device]').forEach(btn=>btn.addEventListener('click',()=>setDevice(btn.dataset.device)));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!deviceLoaded)selectProject(1);observer.disconnect()}},{rootMargin:'100px 0px'});observer.observe(zone)}else selectProject(1);
  // GPU-friendly, desktop-only tilt. No continuous repaint on touch devices or in Balanced/Minimal modes.
  if(!coarse.matches){let pending=0;zone.addEventListener('pointermove',e=>{if(motionMode!=='cinematic')return;if(pending)return;const rect=zone.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;pending=requestAnimationFrame(()=>{pending=0;$('#v5-device-shell').style.setProperty('--v5-tilt-y',(x*7).toFixed(2)+'deg');$('#v5-device-shell').style.setProperty('--v5-tilt-x',(-y*5).toFixed(2)+'deg')})},{passive:true});zone.addEventListener('pointerleave',()=>{$('#v5-device-shell').style.setProperty('--v5-tilt-y','0deg');$('#v5-device-shell').style.setProperty('--v5-tilt-x','0deg')})}

  let activeCompare=0,compareLoaded=false;const afterFrame=$('#v5-after-frame'),after=$('#v5-after'),compareBoard=$('#v5-compare-board');
  function refreshCompareLabels(){const s=studies[activeCompare];$('#v5-compare-name').textContent=nameFor(s);$('#v5-before-brand').textContent=nameFor(s);$('#v5-compare-link').href=s.url}
  function selectCompare(index,load=true){
    if(index<0||index>=studies.length)return;activeCompare=index;
    $$('[data-compare]').forEach(btn=>btn.setAttribute('aria-pressed',String(+btn.dataset.compare===index)));refreshCompareLabels();
    if(load){afterFrame.src=studies[index].url;compareLoaded=true}
  }
  $$('[data-compare]').forEach(btn=>btn.addEventListener('click',()=>selectCompare(+btn.dataset.compare)));
  const compareResize=new ResizeObserver(()=>{after.style.setProperty('--v5-scale',Math.max(.1,after.clientWidth/1100).toFixed(4))});compareResize.observe(after);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!compareLoaded)selectCompare(0);observer.disconnect()}},{rootMargin:'100px 0px'});observer.observe(compareBoard)}else selectCompare(0);
  const input=$('#v5-compare-range');
  const setSplit=value=>{const n=Math.round(Math.min(100,Math.max(0,Number(value)||0)));input.value=String(n);compareBoard.style.setProperty('--v5-split',n+'%')};
  input.addEventListener('input',()=>setSplit(input.value));
  let dragging=false;
  const positionFromEvent=e=>{const r=compareBoard.getBoundingClientRect();setSplit(((e.clientX-r.left)/r.width)*100)};
  compareBoard.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;dragging=true;compareBoard.setPointerCapture(e.pointerId);positionFromEvent(e)});
  compareBoard.addEventListener('pointermove',e=>{if(dragging)positionFromEvent(e)},{passive:true});
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>compareBoard.addEventListener(ev,()=>{dragging=false}));

  const mag=$('#v5-magnetic-stage'),words=$('#v5-magnetic-words'),spark=$('#v5-spark');
  let framePending=0;
  function resetMag(){words.style.setProperty('--v5-tx','0px');words.style.setProperty('--v5-ty','0px');words.style.setProperty('--v5-r','0deg')}
  mag.addEventListener('pointermove',e=>{
    if(coarse.matches||motionMode==='minimal'||framePending)return;
    const r=mag.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    framePending=requestAnimationFrame(()=>{framePending=0;mag.style.setProperty('--v5-x',(x*100).toFixed(1)+'%');mag.style.setProperty('--v5-y',(y*100).toFixed(1)+'%');words.style.setProperty('--v5-tx',((x-.5)*24).toFixed(1)+'px');words.style.setProperty('--v5-ty',((y-.5)*15).toFixed(1)+'px');words.style.setProperty('--v5-r',((x-.5)*-2.5).toFixed(2)+'deg')});
  },{passive:true});mag.addEventListener('pointerleave',resetMag);
  function burst(x,y){
    if(motionMode==='minimal'||reduce.matches)return;
    const rect=mag.getBoundingClientRect(),number=motionMode==='cinematic'?14:6;
    for(let i=0;i<number;i++){
      const angle=i*Math.PI*2/number,dist=35+Math.random()*100,particle=document.createElement('i');particle.className='v5-particle';
      particle.style.setProperty('--sx',(x-rect.left)+'px');particle.style.setProperty('--sy',(y-rect.top)+'px');particle.style.setProperty('--dx',(Math.cos(angle)*dist).toFixed(1)+'px');particle.style.setProperty('--dy',(Math.sin(angle)*dist).toFixed(1)+'px');particle.style.setProperty('--size',((i%3)+5)+'px');particle.style.setProperty('--clr',i%2?'#b7b0ff':'#8fe2ff');
      mag.append(particle);particle.addEventListener('animationend',()=>particle.remove(),{once:true});setTimeout(()=>particle.remove(),1000);
    }
  }
  mag.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;burst(e.clientX,e.clientY)});
  spark.addEventListener('click',()=>{const r=mag.getBoundingClientRect();burst(r.left+r.width*.5,r.top+r.height*.50)});

  reduce.addEventListener?.('change',e=>{if(e.matches)setMode('minimal',false)});
  syncLanguage();setSplit(50);selectProject(2,false);selectCompare(0,false);scaleDevice();
  console.info('[Motion Studio V5] Devices, compare, magnetic lab, performance modes ready.');
})();