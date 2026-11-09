(function(){
  'use strict';
  var root=document.documentElement;
  root.classList.add('js');

  /* ---------- theme (shared with msjavan.ir) ---------- */
  var KEY='msjavan-theme';
  var btn=document.getElementById('themeBtn'),icon=document.getElementById('themeIcon');
  var SUN='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  var MOON='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  function setTheme(dark,save){
    root.setAttribute('data-theme',dark?'dark':'light');
    if(icon)icon.innerHTML=dark?SUN:MOON;
    if(save){try{localStorage.setItem(KEY,dark?'dark':'light')}catch(e){}}
  }
  setTheme(root.getAttribute('data-theme')==='dark',false);
  if(btn)btn.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')!=='dark',true)});

  /* ---------- nav / back-to-top / progress ---------- */
  var nav=document.getElementById('nav'),links=document.getElementById('navLinks'),tg=document.getElementById('navToggle');
  var btt=document.getElementById('btt'),bar=document.getElementById('progressBar');
  function onScroll(){
    var y=window.scrollY||document.documentElement.scrollTop;
    if(nav)nav.classList.toggle('scrolled',y>16);
    if(btt)btt.classList.toggle('show',y>400);
    if(bar){var h=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(h>0?Math.min(100,y/h*100):0)+'%'}
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(tg&&links){
    tg.addEventListener('click',function(){var o=links.classList.toggle('open');tg.setAttribute('aria-expanded',o)});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open')})});
  }
  if(btt)btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

  /* ---------- reveal ---------- */
  var rv=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.08});
    rv.forEach(function(el){io.observe(el)});
  }else rv.forEach(function(el){el.classList.add('visible')});

  /* ---------- English-term tooltips ---------- */
  var tip=document.createElement('div');tip.id='tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);
  function showTip(el){
    tip.textContent=el.getAttribute('data-en');tip.classList.add('show');
    var r=el.getBoundingClientRect(),w=tip.offsetWidth,h=tip.offsetHeight;
    var x=Math.min(Math.max(8,r.left+r.width/2-w/2),window.innerWidth-w-8);
    var y=r.top-h-8;if(y<8)y=r.bottom+8;
    tip.style.left=x+'px';tip.style.top=y+'px';
  }
  function hideTip(){tip.classList.remove('show')}
  document.querySelectorAll('.fn').forEach(function(el){
    el.addEventListener('mouseenter',function(){showTip(el)});
    el.addEventListener('mouseleave',hideTip);
    el.addEventListener('focus',function(){showTip(el)});
    el.addEventListener('blur',hideTip);
    el.addEventListener('click',function(e){e.stopPropagation();showTip(el)});
  });
  document.addEventListener('click',hideTip);
  window.addEventListener('scroll',hideTip,{passive:true});

  /* ---------- reference mark highlight ---------- */
  document.querySelectorAll('.refmark').forEach(function(a){
    a.addEventListener('click',function(){
      var t=document.querySelector(a.getAttribute('href'));
      if(t){t.classList.add('hl');setTimeout(function(){t.classList.remove('hl')},2200)}
    });
  });

  /* ---------- TOC scrollspy (tool pages) ---------- */
  var toc=document.querySelectorAll('.toc a[href^="#"]');
  if(toc.length&&'IntersectionObserver' in window){
    var map={};toc.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var so=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){toc.forEach(function(a){a.classList.remove('active')});var a=map[e.target.id];if(a)a.classList.add('active')}
      });
    },{rootMargin:'-20% 0px -65% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
  }

  /* ---------- tools search & filter (home page) ---------- */
  var grid=document.getElementById('toolsGrid');
  if(grid){
    var input=document.getElementById('searchInput'),fb=document.getElementById('filterButtons'),
        count=document.getElementById('resultsCount'),none=document.getElementById('noResults');
    var cards=[].slice.call(grid.querySelectorAll('.tool-card')),filter='all';
    function norm(s){
      return (s||'').toLowerCase().replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[‌​ً-ٟـ]/g,'').replace(/[۰-۹]/g,function(d){return String(d.charCodeAt(0)-0x6f0)}).replace(/\s+/g,' ').trim();
    }
    function fa(n){return String(n).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
    cards.forEach(function(c){c._s=norm(c.getAttribute('data-search'))});
    function apply(){
      var q=norm(input.value),n=0;
      cards.forEach(function(c){
        var ok=(filter==='all'||c.getAttribute('data-group')===filter)&&(!q||q.split(' ').every(function(w){return c._s.indexOf(w)>-1}));
        c.hidden=!ok;if(ok)n++;
      });
      count.textContent=n===cards.length?'نمایش همهٔ '+fa(n)+' ابزار':'نمایش '+fa(n)+' ابزار از '+fa(cards.length);
      none.style.display=n?'none':'block';
    }
    input.addEventListener('input',apply);
    fb.addEventListener('click',function(e){
      var b=e.target.closest('.filter-btn');if(!b)return;
      fb.querySelectorAll('.filter-btn').forEach(function(x){x.classList.remove('active')});
      b.classList.add('active');filter=b.getAttribute('data-filter');apply();
    });
    apply();
  }
})();
