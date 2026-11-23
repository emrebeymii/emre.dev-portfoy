(function motionEnhancement(){
'use strict';
if(window.MAISON_MOTION_V52)return;
const state={ready:false,animations:0,gsap:false,reduced:false};
window.MAISON_MOTION_V52=state;
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const mq=matchMedia('(prefers-reduced-motion: reduce)');
const fine=matchMedia('(hover:hover) and (pointer:fine)');
const light=()=>mq.matches||navigator.connection?.saveData===true;
const motion=()=>!light()&&!!window.gsap&&typeof window.gsap.to==='function';
const triggers=[];
function track(t){if(t)triggers.push(t);return t}
let queued=false;
function progress(){const el=$('#v52ReadingProgress');if(!el)return;const total=Math.max(1,document.documentElement.scrollHeight-innerHeight);el.style.transform=`scaleX(${Math.max(0,Math.min(1,scrollY/total)).toFixed(4)})`}
function onScroll(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;progress()})}
function sliderProgress(){
const el=$('#maisonCollectionSwiper'),bar=$('#v52CarouselTrack span');if(!bar||!el)return;
const count=el.querySelectorAll('.swiper-slide').length||1,swiper=el.swiper;
const ratio=swiper?Math.max(0,Math.min(1,Number(swiper.progress)||0)):Math.max(0,Math.min(1,el.scrollLeft/Math.max(1,el.scrollWidth-el.clientWidth)));
const visible=swiper?(Number(swiper.params?.slidesPerView)||1):Math.max(1,Math.floor(el.clientWidth/240));
const chunk=Math.min(1,visible/count);
bar.style.transform=`scaleX(${Math.min(1,chunk+(1-chunk)*ratio).toFixed(4)})`
}
function initSlider(){
const el=$('#maisonCollectionSwiper');if(!el||$('#v52CarouselTrack'))return;
const bar=document.createElement('div');bar.id='v52CarouselTrack';bar.setAttribute('aria-hidden','true');bar.innerHTML='<span></span>';el.insertAdjacentElement('afterend',bar);
const hint=document.createElement('div');hint.className='v52-motion-hint';hint.textContent='Koleksiyonu kaydırarak keşfet';bar.insertAdjacentElement('afterend',hint);
el.addEventListener('scroll',sliderProgress,{passive:true});
el.addEventListener('pointerup',()=>setTimeout(sliderProgress,480),{passive:true});
['#maisonSliderPrev','#maisonSliderNext'].forEach(s=>$(s)?.addEventListener('click',()=>setTimeout(sliderProgress,600)));
const host=$('#maisonSliderItems');if(host)new MutationObserver(()=>requestAnimationFrame(sliderProgress)).observe(host,{childList:true});
const bind=()=>{if(el.swiper&&!el.swiper.__maisonV52){el.swiper.on('slideChange',sliderProgress);el.swiper.on('progress',sliderProgress);el.swiper.__maisonV52=true;sliderProgress()}};
new MutationObserver(bind).observe(el,{attributes:true,attributeFilter:['class']});setTimeout(bind,650);sliderProgress()
}
function flyToCart(btn){
if(!motion()||!btn?.isConnected)return;
const target=$('#cartOpen');if(!target)return;
const a=btn.getBoundingClientRect(),b=target.getBoundingClientRect();if(!a.width||!b.width)return;
const f=document.createElement('div');f.className='v52-fly';f.setAttribute('aria-hidden','true');
f.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 8h16l-1.4 12H5.4L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>';document.body.appendChild(f);
const x=a.left+a.width/2-17.5,y=a.top+a.height/2-17.5,dx=b.left+b.width/2-17.5-x,dy=b.top+b.height/2-17.5-y,g=window.gsap;
g.set(f,{x,y,scale:.78});
g.timeline({onComplete:()=>f.remove()})
 .to(f,{x:x+dx*.42,y:y+dy*.38-65,scale:1.12,duration:.28,ease:'power2.out'})
 .to(f,{x:x+dx,y:y+dy,scale:.36,opacity:.25,duration:.52,ease:'power2.inOut'})
 .fromTo(target,{scale:1},{scale:1.13,duration:.15,yoyo:true,repeat:1,ease:'sine.out'},'<=');
state.animations++
}
function bindCart(){
document.addEventListener('click',e=>{const btn=e.target.closest('[data-add],[data-detail-add]');if(!btn||btn.disabled||!motion())return;const old=Number($('#cartCount')?.textContent||0);setTimeout(()=>{if(Number($('#cartCount')?.textContent||0)>old)flyToCart(btn)},60)},true)
}
function initGsap(){
if(state.ready||!motion()||typeof window.ScrollTrigger!=='function')return false;
state.ready=true;state.gsap=true;state.reduced=false;
const g=window.gsap;g.registerPlugin(window.ScrollTrigger);
if($('.v5-hero')){
g.fromTo('.v5-hero-photo',{scale:1.09},{scale:1.012,duration:1.85,ease:'power2.out'});
g.fromTo('.v5-hero-bottom',{opacity:.58,y:14},{opacity:1,y:0,duration:.9,delay:.54,ease:'power2.out',clearProps:'opacity,transform'});state.animations+=2
}
['.v5-section-top','.v5-collection-card','.v5-story-features','.v5-story-copy .v5-text-link','.maison-curated-head'].forEach(selector=>{
$$(selector).forEach((el,index)=>{
const tween=g.fromTo(el,{y:20,opacity:.82},{y:0,opacity:1,duration:.67,delay:index*.065,ease:'power2.out',paused:true,clearProps:'opacity,transform'});
track(window.ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>tween.play()}));state.animations++})});
if(fine.matches&&innerWidth>920){const img=$('.v5-story-image img');if(img){
const tween=g.fromTo(img,{scale:1.085,yPercent:-1.5},{scale:1.085,yPercent:1.5,ease:'none',paused:true});
track(window.ScrollTrigger.create({trigger:'.v5-story',start:'top bottom',end:'bottom top',scrub:.7,animation:tween}));state.animations++}}
const obs=new MutationObserver(records=>{if(!motion())return;
for(const {target,attributeName} of records){if(attributeName!=='class'||!target.classList.contains('show'))continue;
const box=target.querySelector('.modalbox');if(box){g.fromTo(box,{opacity:.82,y:16,scale:.99},{opacity:1,y:0,scale:1,duration:.34,ease:'power2.out',clearProps:'opacity,transform',overwrite:'auto'});state.animations++}}});
$$('.modal').forEach(el=>obs.observe(el,{attributes:true,attributeFilter:['class']}));
const drawer=$('#drawer');if(drawer)new MutationObserver(()=>{if(drawer.classList.contains('show')&&motion()){
const h=drawer.querySelector('.drawer-header');if(h)g.fromTo(h,{opacity:.55,y:10},{opacity:1,y:0,duration:.37,ease:'power2.out',clearProps:'opacity,transform'})
}}).observe(drawer,{attributes:true,attributeFilter:['class']});
return true
}
function start(){
if(!$('#hakkinda'))return;
const bar=document.createElement('div');bar.id='v52ReadingProgress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',()=>{onScroll();sliderProgress()},{passive:true});progress();
initSlider();bindCart();state.reduced=light();
if(!light()&&!initGsap()){let tries=0;const poll=setInterval(()=>{tries++;if(initGsap()||tries>=48)clearInterval(poll)},250)}
mq.addEventListener?.('change',()=>{state.reduced=light();if(light()){
triggers.forEach(t=>{try{t.kill(true)}catch{}});triggers.length=0;
window.gsap?.killTweensOf?.('.v5-hero-photo,.v5-hero-bottom,.v5-collection-card,.v5-story-image img');
$$('.v5-section-top,.v5-collection-card,.v5-story-features,.v5-story-copy .v5-text-link,.maison-curated-head').forEach(el=>{el.style.opacity='';el.style.transform=''})}})
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()
})();