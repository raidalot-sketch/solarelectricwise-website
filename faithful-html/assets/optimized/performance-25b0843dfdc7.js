/* Accessible, on-demand lightbox; thumbnails keep their geometry without a layout plugin. */
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.bdt-animated-heading').forEach(el=>{
  const parts=el.textContent.split(',').map(x=>x.trim()).filter(Boolean);if(!parts.length)return;let i=0;
  const update=()=>{el.textContent=parts[i];const a=el.closest('a');if(a)a.href=parts[i].startsWith('Tel:')?'tel:+27835719191':'mailto:info@solarelectricwise.co.za';};update();
  if(parts.length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{i=(i+1)%parts.length;update()},4500);
 });
 document.querySelectorAll('.elementor-menu-toggle').forEach(button=>{
  const nav=button.parentElement.querySelector('.elementor-nav-menu--dropdown');if(!nav)return;
  const toggle=()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.classList.toggle('elementor-active',open);nav.setAttribute('aria-hidden',String(!open));nav.querySelectorAll('a').forEach(a=>a.tabIndex=open?0:-1);};
  button.addEventListener('click',toggle);button.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
 });
 document.querySelectorAll('.solar-native-slider').forEach(slider=>{
  const slides=Array.from(slider.querySelectorAll('.swiper-slide')),pagination=slider.querySelector('.swiper-pagination');let current=0,paused=false;
  slides.forEach((_,i)=>{const dot=document.createElement('button');dot.className='swiper-pagination-bullet';dot.setAttribute('aria-label','Go to slide '+(i+1));dot.addEventListener('click',()=>show(i));pagination.append(dot)});
  const show=i=>{current=(i+slides.length)%slides.length;slider.style.setProperty('--solar-slide',(-current*100)+'%');slides.forEach((s,j)=>{s.classList.toggle('swiper-slide-active',j===current);s.setAttribute('aria-hidden',String(j!==current));s.inert=j!==current;if(j===current){const img=s.querySelector('img');if(img)img.loading='eager'}});pagination.querySelectorAll('button').forEach((b,j)=>{b.classList.toggle('swiper-pagination-bullet-active',j===current);b.setAttribute('aria-current',String(j===current))})};
  const prev=slider.querySelector('.elementor-swiper-button-prev'),next=slider.querySelector('.elementor-swiper-button-next');prev.addEventListener('click',()=>show(current-1));next.addEventListener('click',()=>show(current+1));[prev,next].forEach(b=>b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();b.click()}}));
  slider.addEventListener('mouseenter',()=>paused=true);slider.addEventListener('mouseleave',()=>paused=false);slider.addEventListener('focusin',()=>paused=true);slider.addEventListener('focusout',()=>paused=false);
  let start=0;slider.addEventListener('touchstart',e=>start=e.changedTouches[0].clientX,{passive:true});slider.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-start;if(Math.abs(delta)>40)show(current+(delta<0?1:-1))},{passive:true});
  show(0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{if(!paused&&!document.hidden)show(current+1)},5000);
 });
 const lazy=Array.from(document.querySelectorAll('img[data-solar-src]'));
 const load=img=>{img.srcset=img.dataset.solarSrcset;img.src=img.dataset.solarSrc;delete img.dataset.solarSrc;delete img.dataset.solarSrcset;};
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target)}}),{rootMargin:'300px'});lazy.forEach(img=>observer.observe(img))}else lazy.forEach(load);
 const links=Array.from(document.querySelectorAll('[data-solar-lightbox]'));
 if(!links.length)return;
 const dialog=document.createElement('dialog');dialog.className='solar-lightbox';dialog.setAttribute('aria-label','Installation photographs');
 dialog.innerHTML='<span class="solar-lightbox-count" aria-live="polite"></span><button class="solar-lightbox-close" aria-label="Close photograph">×</button><button class="solar-lightbox-prev" aria-label="Previous photograph">‹</button><img alt=""><button class="solar-lightbox-next" aria-label="Next photograph">›</button>';
 document.body.append(dialog);let current=0,opener=null;
 const show=index=>{current=(index+links.length)%links.length;const img=dialog.querySelector('img');img.src=links[current].href;img.alt=links[current].querySelector('img')?.alt||'SolarElectricWise installation photograph '+(current+1);dialog.querySelector('.solar-lightbox-count').textContent=(current+1)+' / '+links.length;};
 links.forEach((link,index)=>link.addEventListener('click',event=>{event.preventDefault();opener=link;show(index);dialog.showModal();document.documentElement.style.overflow='hidden';}));
 links.forEach(link=>link.closest('.bdt-ep-advanced-image-gallery-item').querySelector('.bdt-ep-advanced-image-gallery-thumbnail').addEventListener('click',()=>link.click()));
 dialog.querySelector('.solar-lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.querySelector('.solar-lightbox-prev').addEventListener('click',()=>show(current-1));dialog.querySelector('.solar-lightbox-next').addEventListener('click',()=>show(current+1));
 dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(current+1)}if(event.key==='ArrowLeft'){event.preventDefault();show(current-1)}});
 dialog.addEventListener('close',()=>{document.documentElement.style.overflow='';opener?.focus();});
});
