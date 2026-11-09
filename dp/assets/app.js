(function(){
var d=document,$=function(s,r){return (r||d).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))};
function nz(t){return (t||'').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[‌‏\s\-‐،,\.:؛()]+/g,'').toLowerCase()}
var tb=$('#themeBtn');if(tb)tb.onclick=function(){var h=d.documentElement,n=h.getAttribute('data-theme')==='dark'?'light':'dark';h.setAttribute('data-theme',n);try{localStorage.setItem('dp-theme',n)}catch(e){}};
var nt=$('#navToggle');if(nt)nt.onclick=function(){$('#navLinks').classList.toggle('open');var s=$('#side');if(s)s.classList.toggle('open')};
var b=$('#btt');if(b){window.addEventListener('scroll',function(){b.classList.toggle('show',window.scrollY>500)});b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})}}
var sq=$('#sideq');if(sq)sq.oninput=function(){var q=nz(sq.value);$$('#side a[data-t]').forEach(function(a){a.style.display=(!q||a.getAttribute('data-t').indexOf(q)>-1)?'':'none'})};
var cur=$('#side a.cur');if(cur&&cur.scrollIntoView&&$('#side'))$('#side').scrollTop=cur.offsetTop-80;
var grid=$('#grid');
if(grid){var f='all',q='';var cards=$$('.card',grid);
 function run(){var n=0;cards.forEach(function(c){var ok=(f==='all'||c.getAttribute('data-k')===f)&&(!q||c.getAttribute('data-t').indexOf(q)>-1);c.style.display=ok?'':'none';if(ok)n++});$('#cnt').textContent=n.toLocaleString('fa-IR')+' مورد'}
 $$('#chips .chip').forEach(function(c){c.onclick=function(){$$('#chips .chip').forEach(function(x){x.classList.remove('active')});c.classList.add('active');f=c.getAttribute('data-f');run()}});
 var qi=$('#q'),res=$('#sres');
 qi.oninput=function(){q=nz(qi.value);run();
  if(q.length<2||!window.DP_SEARCH){res.style.display='none';return}
  var hits=window.DP_SEARCH.filter(function(x){return x.x.indexOf(q)>-1}).slice(0,12);
  res.innerHTML=hits.map(function(x){return '<a href="'+x.u+'">'+x.t+'<small>'+(x.e||'')+' '+x.s.slice(0,90)+'…</small></a>'}).join('')||'<a>نتیجه‌ای یافت نشد</a>';res.style.display='block'};
 d.addEventListener('click',function(e){if(!e.target.closest('.search-box'))res.style.display='none'});run()}
})();
