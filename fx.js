/* Visual effects: starfield, airdrop parachutes, reveal on scroll, card spotlight, progress bar. */
(function(){
"use strict";
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var bg = document.getElementById("bg");

/* parachute airdrops: slow drift from top to bottom */
function chute(c1,c2){
  return '<svg viewBox="0 0 80 120" aria-hidden="true">'+
   '<path d="M3 44C3 16 21 3 40 3s37 13 37 41c-6-6-12-6-18.5 0C52 38 46 38 40 44c-6-6-12-6-18.5 0C15 38 9 38 3 44Z" fill="'+c1+'" fill-opacity=".9" stroke="'+c2+'" stroke-width="1.4"/>'+
   '<path d="M40 3C28 12 24 28 21.5 44M40 3c12 9 16 25 18.5 41M40 3v41" stroke="'+c2+'" stroke-opacity=".7" stroke-width="1" fill="none"/>'+
   '<path d="M3 44 34 88M21.5 44 36 88M40 44V88M58.5 44 44 88M77 44 46 88" stroke="#cfe8ff" stroke-opacity=".55" stroke-width=".8"/>'+
   '<rect x="30" y="88" width="20" height="18" rx="2" fill="#1b2347" stroke="'+c2+'" stroke-width="1.4"/>'+
   '<path d="M30 97h20M40 88v18" stroke="'+c2+'" stroke-opacity=".8" stroke-width="1"/>'+
   '<circle class="lamp" cx="40" cy="86" r="2.6" fill="#FFC53D"/></svg>';
}
if(!reduce && bg){
  var cfg = [
    {l:6, w:70, d:62, dl:-6, c:["#27F2FF","#9ff8ff"], dx:"40px", sw:7},
    {l:24,w:46, d:84, dl:-48,c:["#ff3ddb","#ffb3f2"], dx:"-30px",sw:9},
    {l:42,w:90, d:74, dl:-20,c:["#6a4bff","#c3b6ff"], dx:"30px", sw:8},
    {l:63,w:52, d:92, dl:-70,c:["#FFC53D","#ffe29a"], dx:"-40px",sw:10},
    {l:80,w:78, d:68, dl:-34,c:["#27F2FF","#9ff8ff"], dx:"-20px",sw:7.5},
    {l:92,w:40, d:100,dl:-85,c:["#ff3ddb","#ffb3f2"], dx:"20px", sw:11}
  ];
  if(window.innerWidth<700) cfg = cfg.slice(0,4);
  cfg.forEach(function(o){
    var d = document.createElement("div"); d.className = "drop";
    d.style.cssText = "left:"+o.l+"%;width:"+o.w+"px;animation-duration:"+o.d+"s;animation-delay:"+o.dl+"s;--dx:"+o.dx+";opacity:"+(o.w>60?.85:.6)+";filter:blur("+(o.w<50?1.2:0)+"px)";
    d.innerHTML = chute(o.c[0],o.c[1]);
    d.firstChild.style.animationDuration = o.sw+"s";
    bg.appendChild(d);
  });
}

/* starfield with parallax */
var cv = document.getElementById("stars");
if(cv && !reduce){
  var cx = cv.getContext("2d"), W, H, S = [], mx = 0, my = 0, raf, vis = true;
  var N = window.innerWidth<700 ? 55 : 110;
  function size(){ W = cv.width = innerWidth; H = cv.height = innerHeight; }
  size(); window.addEventListener("resize",size);
  for(var k=0;k<N;k++) S.push({x:Math.random(),y:Math.random(),z:Math.random()*.9+.1,t:Math.random()*6});
  window.addEventListener("mousemove",function(e){ mx = (e.clientX/W-.5); my = (e.clientY/H-.5); });
  document.addEventListener("visibilitychange",function(){ vis = !document.hidden; if(vis) loop(); });
  var t0 = 0;
  function loop(t){
    if(!vis) return; raf = requestAnimationFrame(loop);
    t = t||0; cx.clearRect(0,0,W,H);
    for(var i=0;i<S.length;i++){
      var s = S[i]; s.y += .00005*s.z*(t-t0 > 0 ? Math.min(t-t0,50) : 16); if(s.y>1.02){ s.y = -.02; s.x = Math.random(); }
      var px = s.x*W + mx*30*s.z, py = s.y*H + my*20*s.z, a = .25+.55*Math.abs(Math.sin(t/900+s.t));
      cx.globalAlpha = a; cx.fillStyle = s.z>.7?"#9ff8ff":s.z>.4?"#ffffff":"#ff9af0";
      cx.beginPath(); cx.arc(px,py,s.z*1.7,0,6.283); cx.fill();
    }
    t0 = t;
  }
  loop(0);
}

/* reveal on scroll + stagger */
var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }); },{threshold:.08,rootMargin:"0px 0px -30px 0px"}) : null;
function tag(){
  var v = document.getElementById("view"); if(!v) return;
  var els = v.querySelectorAll(".card:not(.rv),h2:not(.rv),.trust:not(.rv),.hero:not(.rv),.fl:not(.rv),.tw:not(.rv)"), n = 0;
  Array.prototype.forEach.call(els,function(e){ e.classList.add("rv"); e.style.setProperty("--i",String(n++ % 8)); if(io) io.observe(e); else e.classList.add("in"); });
}
new MutationObserver(function(){ tag(); }).observe(document.getElementById("view"),{childList:true,subtree:true});
tag();

/* card spotlight + tilt */
document.addEventListener("mousemove",function(e){
  var c = e.target.closest && e.target.closest(".card"); if(!c) return;
  var r = c.getBoundingClientRect(), x = e.clientX-r.left, y = e.clientY-r.top;
  c.style.setProperty("--mx",x+"px"); c.style.setProperty("--my",y+"px");
  if(!reduce && r.width<460){ c.style.transform = "perspective(700px) rotateX("+(((y/r.height)-.5)*-5).toFixed(2)+"deg) rotateY("+(((x/r.width)-.5)*6).toFixed(2)+"deg) translateY(-4px)"; }
});
document.addEventListener("mouseout",function(e){ var c = e.target.closest && e.target.closest(".card"); if(c && !c.contains(e.relatedTarget)) c.style.transform = ""; });

/* scroll progress */
var pg = document.getElementById("prog");
window.addEventListener("scroll",function(){ var h = document.documentElement; pg.style.width = (h.scrollTop/((h.scrollHeight-h.clientHeight)||1)*100)+"%"; },{passive:true});
})();

/* ===== scenery: mountains, plane, meteors, embers ===== */
(function(){
  function ridge(seed,amp,n,fill,stroke){
    var pts=[],x,y,r=seed; function rnd(){ r=(r*9301+49297)%233280; return r/233280; }
    var base=40; for(var k=0;k<=n;k++){ x=k*1000/n; y=base-(rnd()*amp)-(k%3===0?amp*.5:0); pts.push([x,y]); }
    var d="M0 100 L"+pts.map(function(p){ return p[0].toFixed(0)+" "+p[1].toFixed(1); }).join(" L")+" L1000 100 Z";
    return '<svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+d+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>';
  }
  var m1=document.getElementById("m1"),m2=document.getElementById("m2");
  if(m1) m1.innerHTML=ridge(7,46,22,"#0b1230","rgba(39,242,255,.35)");
  if(m2) m2.innerHTML=ridge(23,34,30,"#070a1c","rgba(255,61,219,.35)");
  var pl=document.querySelector("#bg .plane");
  if(pl) pl.innerHTML='<svg viewBox="0 0 120 40" aria-hidden="true"><path d="M5 20Q10 14 30 14L95 14Q115 16 118 20Q115 24 95 26L30 26Q10 26 5 20Z" fill="#cfe3ff"/><path d="M12 14 4 3h12l10 11Z" fill="#9fc0f5"/><path d="M55 22 74 37h14L78 22Z" fill="#9fc0f5"/><path d="M60 14 74 3h12L78 14Z" fill="#9fc0f5"/><g fill="#27F2FF"><circle cx="40" cy="20" r="1.6"/><circle cx="50" cy="20" r="1.6"/><circle cx="60" cy="20" r="1.6"/><circle cx="105" cy="19" r="2"/></g></svg>';
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;
  /* mountains parallax with mouse */
  var tx=0,ty=0,raf2=0;
  window.addEventListener("mousemove",function(e){ tx=(e.clientX/innerWidth-.5); if(!raf2) raf2=requestAnimationFrame(function(){ raf2=0; if(m1) m1.style.transform="translateX("+(tx*-26).toFixed(1)+"px)"; if(m2) m2.style.transform="translateX("+(tx*-52).toFixed(1)+"px)"; }); });
  /* meteors */
  var bgEl=document.getElementById("bg");
  function meteor(){
    if(document.hidden||!bgEl) return;
    var m=document.createElement("div"); m.className="meteor";
    m.style.left=(Math.random()*70)+"%"; m.style.top=(Math.random()*35)+"%"; m.style.setProperty("--r",(20+Math.random()*16)+"deg");
    bgEl.appendChild(m); setTimeout(function(){ m.remove(); },1400);
  }
  (function loopM(){ setTimeout(function(){ meteor(); if(Math.random()<.3) setTimeout(meteor,250); loopM(); },2500+Math.random()*5500); })();
  /* embers rising from the horizon */
  var cv=document.createElement("canvas"); cv.style.cssText="position:absolute;inset:0;width:100%;height:100%"; bgEl.insertBefore(cv,document.getElementById("m1"));
  var c=cv.getContext("2d"),W,H,E=[],N=innerWidth<700?18:36;
  function sz(){ W=cv.width=innerWidth; H=cv.height=innerHeight; } sz(); addEventListener("resize",sz);
  function mk(init){ return {x:Math.random()*W,y:init?Math.random()*H:H+10,v:.25+Math.random()*.7,s:1+Math.random()*2.2,p:Math.random()*6.3,c:Math.random()<.7?"255,197,61":"39,242,255"}; }
  for(var k=0;k<N;k++) E.push(mk(true));
  var last=0;
  (function draw(t){
    requestAnimationFrame(draw); if(document.hidden) return;
    var dt=Math.min(t-last,50)||16; last=t; c.clearRect(0,0,W,H);
    for(var i=0;i<E.length;i++){ var e=E[i]; e.y-=e.v*dt*.045; e.x+=Math.sin(t/1200+e.p)*.25; if(e.y<-10){ E[i]=mk(false); continue; }
      var a=Math.max(0,Math.min(1,(e.y/H)))*.8; c.fillStyle="rgba("+e.c+","+a.toFixed(2)+")"; c.shadowColor="rgba("+e.c+",.9)"; c.shadowBlur=8; c.beginPath(); c.arc(e.x,e.y,e.s,0,6.283); c.fill(); }
  })(0);
})();

/* ===== theme panel: night / day / auto + custom background image ===== */
(function(){
  var R = document.documentElement;
  var TXT = {
    uz:{t:"Ko'rinish",n:"Tungi",d:"Kunduzgi",a:"Avto (vaqt bo'yicha)",bg:"Orqa fon",sc:"Animatsiyali sahna",im:"Mening rasmim",pick:"Galereyadan rasm tanlash",rm:"Rasmni olib tashlash",dim:"Qoraytirish / yorqinlik",bl:"Xira qilish",fx:"Parashut va effektlar",x:"Yopish",err:"Rasm saqlanmadi. Kichikroq rasm tanlang."},
    en:{t:"Appearance",n:"Night",d:"Day",a:"Auto (by time)",bg:"Background",sc:"Animated scene",im:"My image",pick:"Choose from gallery",rm:"Remove image",dim:"Overlay strength",bl:"Blur",fx:"Parachutes and effects",x:"Close",err:"Could not save the image. Pick a smaller one."},
    ru:{t:"Внешний вид",n:"Ночь",d:"День",a:"Авто (по времени)",bg:"Фон",sc:"Анимированная сцена",im:"Моё фото",pick:"Выбрать из галереи",rm:"Убрать фото",dim:"Затемнение",bl:"Размытие",fx:"Парашюты и эффекты",x:"Закрыть",err:"Не удалось сохранить фото. Выберите меньше."},
    tr:{t:"Görünüm",n:"Gece",d:"Gündüz",a:"Otomatik (saate göre)",bg:"Arka plan",sc:"Animasyonlu sahne",im:"Resmim",pick:"Galeriden seç",rm:"Resmi kaldır",dim:"Karartma",bl:"Bulanıklık",fx:"Paraşüt ve efektler",x:"Kapat",err:"Resim kaydedilemedi. Daha küçük seçin."}
  };
  function L(){ return TXT[R.lang] || TXT.en; }
  function get(k,d){ try{ var v = localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }
  function set(k,v){ try{ localStorage.setItem(k,v); return true; }catch(e){ return false; } }
  var S = {th:get("th","dark"),bg:get("bgm","scene"),dim:+get("dim","45"),bl:+get("bl","0"),fx:get("fx","1")==="1"};
  var IMG = get("bgimg","");
  function eff(){ if(S.th==="auto"){ var h = new Date().getHours(); return (h>=7&&h<19)?"light":"dark"; } return S.th; }
  function apply(){
    var th = eff(); R.setAttribute("data-theme",th);
    var m = document.querySelector('meta[name=theme-color]'); if(!m){ m = document.createElement("meta"); m.name = "theme-color"; document.head.appendChild(m); } m.content = th==="light"?"#eaf1ff":"#05070f";
    var useImg = S.bg==="image" && IMG; R.classList.toggle("has-img",!!useImg); R.classList.toggle("fx-off",!S.fx);
    var el = document.getElementById("bgimg"); if(el){ el.style.backgroundImage = useImg ? 'url("'+IMG+'")' : "none"; el.style.setProperty("--bl",S.bl+"px"); }
    R.style.setProperty("--dim",(S.dim/100).toFixed(2)); R.style.setProperty("--dimc", th==="light"?"255,255,255":"0,0,0");
  }
  function save(){ set("th",S.th); set("bgm",S.bg); set("dim",String(S.dim)); set("bl",String(S.bl)); set("fx",S.fx?"1":"0"); }
  function shrink(file){
    return new Promise(function(res,rej){
      var im = new Image(), u = URL.createObjectURL(file);
      im.onload = function(){ var k = Math.min(1,1920/Math.max(im.width,im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width*k); c.height = Math.round(im.height*k); c.getContext("2d").drawImage(im,0,0,c.width,c.height); URL.revokeObjectURL(u); res(c.toDataURL("image/jpeg",.78)); };
      im.onerror = function(){ rej(new Error("img")); }; im.src = u;
    });
  }
  var dlg = document.createElement("dialog"); dlg.id = "tdlg"; document.body.appendChild(dlg);
  function btn(on,act,label){ return '<button type="button" class="btn sm '+(on?"on p":"")+'" data-a="'+act+'">'+label+'</button>'; }
  function draw(){
    var T = L();
    dlg.innerHTML = '<h3>'+T.t+'</h3>'+
      '<div class="tg">'+btn(S.th==="dark","th:dark",T.n)+btn(S.th==="light","th:light",T.d)+btn(S.th==="auto","th:auto",T.a)+'</div>'+
      '<h3 style="font-size:15px">'+T.bg+'</h3><div class="tg">'+btn(S.bg==="scene","bg:scene",T.sc)+btn(S.bg==="image"&&!!IMG,"bg:image",T.im)+'</div>'+
      '<div class="tg"><button type="button" class="btn sm" data-a="pick">'+T.pick+'</button>'+(IMG?'<button type="button" class="btn sm bad" data-a="rm">'+T.rm+'</button>':"")+'<input type="file" id="tfile" accept="image/*" hidden></div>'+
      '<div class="rng"><span>'+T.dim+'</span><input type="range" min="0" max="85" value="'+S.dim+'" data-r="dim"></div>'+
      '<div class="rng"><span>'+T.bl+'</span><input type="range" min="0" max="14" value="'+S.bl+'" data-r="bl"></div>'+
      '<label style="flex-direction:row;gap:8px;align-items:center"><input type="checkbox" data-a="fx"'+(S.fx?" checked":"")+'><span>'+T.fx+'</span></label>'+
      '<p class="err" id="terr"></p><div class="row"><button type="button" class="btn sm" data-a="close">'+T.x+'</button></div>';
  }
  dlg.addEventListener("click",function(e){
    var b = e.target.closest("[data-a]"); if(e.target===dlg){ var rc = dlg.getBoundingClientRect(); if(e.clientX<rc.left||e.clientX>rc.right||e.clientY<rc.top||e.clientY>rc.bottom) dlg.close(); return; } if(!b) return;
    var a = b.getAttribute("data-a");
    if(a.indexOf("th:")===0){ S.th = a.slice(3); }
    else if(a.indexOf("bg:")===0){ if(a==="bg:image" && !IMG){ document.getElementById("tfile").click(); return; } S.bg = a.slice(3); }
    else if(a==="pick"){ document.getElementById("tfile").click(); return; }
    else if(a==="rm"){ IMG = ""; try{ localStorage.removeItem("bgimg"); }catch(x){} S.bg = "scene"; }
    else if(a==="fx"){ S.fx = b.checked; }
    else if(a==="close"){ dlg.close(); return; }
    save(); apply(); if(a!=="fx") draw();
  });
  dlg.addEventListener("input",function(e){ var r = e.target.getAttribute("data-r"); if(!r) return; S[r] = +e.target.value; save(); apply(); });
  dlg.addEventListener("change",async function(e){
    if(e.target.id!=="tfile" || !e.target.files[0]) return;
    try{ var d = await shrink(e.target.files[0]); if(!set("bgimg",d)){ document.getElementById("terr").textContent = L().err; return; } IMG = d; S.bg = "image"; save(); apply(); draw(); }
    catch(x){ document.getElementById("terr").textContent = L().err; }
  });
  document.getElementById("themeBtn").addEventListener("click",function(){ draw(); dlg.showModal(); });
  apply();
})();
