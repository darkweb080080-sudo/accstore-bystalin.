/* Image editor: crop (ratio), zoom/position, draw, text. window.OxEdit.open(file,{ratio,w}) -> Promise<Blob|null> */
(function(){
"use strict";
var TX = {
  uz:{t:"Rasmni tahrirlash",mv:"Siljitish",dr:"Chizish",tx:"Matn",undo:"Orqaga",ok:"Tayyor",no:"Bekor",zoom:"Kattalik",ask:"Matnni yozing",orig:"Asl",hint:"Rasmni suring, kerakli joyini ramkaga keltiring (ixtiyoriy)."},
  en:{t:"Edit image",mv:"Move",dr:"Draw",tx:"Text",undo:"Undo",ok:"Done",no:"Cancel",zoom:"Zoom",ask:"Type the text",orig:"Original",hint:"Drag the image to choose what stays in the frame (optional)."},
  ru:{t:"Редактор фото",mv:"Двигать",dr:"Рисовать",tx:"Текст",undo:"Отменить",ok:"Готово",no:"Отмена",zoom:"Масштаб",ask:"Введите текст",orig:"Исходное",hint:"Перетащите фото, чтобы выбрать нужную область (по желанию)."}
};
function L(){ return TX[document.documentElement.lang] || TX.en; }
var COL = ["#27F2FF","#ff3ddb","#FFC53D","#ffffff","#000000","#ff3b3b"], dlg = null;
function css(){
  if(document.getElementById("oxe-css")) return;
  var s = document.createElement("style"); s.id = "oxe-css";
  s.textContent = "#oxe{max-width:420px;width:calc(100% - 16px);padding:14px}#oxe .r{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:8px 0}#oxe .fr{width:fit-content;max-width:100%;position:relative;margin:8px auto;touch-action:none;background:#000;line-height:0;border-radius:6px;overflow:hidden}#oxe canvas{touch-action:none;cursor:grab;max-width:100%}#oxe .rd{position:absolute;inset:0;pointer-events:none;background:radial-gradient(closest-side,transparent 98%,rgba(0,0,0,.6) 100%)}#oxe .sw{width:24px;height:24px;border-radius:50%;border:2px solid #556;cursor:pointer;padding:0}#oxe .sw.on{border-color:#fff;box-shadow:0 0 0 2px var(--cy,#27F2FF)}#oxe input[type=range]{flex:1}#oxe small{color:var(--ink2,#9aa)}";
  document.head.appendChild(s);
}
function open(file,o){
  o = o || {};
  return new Promise(function(resolve){
    var url = URL.createObjectURL(file), img = new Image();
    img.onerror = function(){ URL.revokeObjectURL(url); resolve(null); };
    img.onload = function(){ run(img,url,o,resolve); };
    img.src = url;
  });
}
function run(img,url,o,resolve){
  css();
  var T = L(), iw = img.naturalWidth, ih = img.naturalHeight, fixed = !!o.ratio;
  var RS = fixed ? [] : [[0,T.orig],[1,"1:1"],[4/3,"4:3"],[16/9,"16:9"],[9/16,"9:16"],[3/4,"3:4"]];
  var R = fixed ? o.ratio : iw/ih, ro = fixed ? 0 : 0, zoom = 1, ox = 0, oy = 0, mode = "mv", col = COL[0], items = [], cur = null, fw, fh, drag = null;
  if(!dlg){ dlg = document.createElement("dialog"); dlg.id = "oxe"; document.body.appendChild(dlg); }
  dlg.innerHTML = '<h3 style="margin:0">'+T.t+'</h3><p class="note" style="margin:4px 0">'+T.hint+'</p>'+
    (fixed?'':'<div class="r" id="oxr"></div>')+
    '<div class="fr" id="oxf"><canvas id="oxc"></canvas>'+(o.round?'<div class="rd"></div>':'')+'</div>'+
    '<div class="r"><small>'+T.zoom+'</small><input type="range" id="oxz" min="1" max="5" step="0.01" value="1"></div>'+
    '<div class="r" id="oxm"></div><div class="r" id="oxk"></div>'+
    '<div class="r"><button type="button" class="btn p" id="oxok">'+T.ok+'</button><button type="button" class="btn" id="oxno">'+T.no+'</button></div>';
  var cv = dlg.querySelector("#oxc"), ctx = cv.getContext("2d");
  function layout(){
    var mw = Math.min(380,window.innerWidth-60), mh = Math.min(440,window.innerHeight*0.5);
    fw = mw; fh = fw/R; if(fh>mh){ fh = mh; fw = fh*R; }
    fw = Math.round(fw); fh = Math.round(fh); cv.width = fw; cv.height = fh; clamp(); paint();
  }
  function clamp(){ var s0 = Math.max(fw/iw,fh/ih), mx = Math.max(0,(iw*s0*zoom-fw)/2), my = Math.max(0,(ih*s0*zoom-fh)/2); ox = Math.max(-mx,Math.min(mx,ox)); oy = Math.max(-my,Math.min(my,oy)); }
  function render(c,W,H,k){
    c.clearRect(0,0,W,H); c.fillStyle = "#000"; c.fillRect(0,0,W,H);
    var sc = Math.max(fw/iw,fh/ih)*zoom*k, dw = iw*sc, dh = ih*sc;
    c.drawImage(img,W/2+ox*k-dw/2,H/2+oy*k-dh/2,dw,dh);
    c.lineCap = "round"; c.lineJoin = "round";
    items.forEach(function(it){
      if(it.k==="s"){ c.strokeStyle = it.c; c.lineWidth = it.w*W; c.beginPath(); c.moveTo(it.p[0].x*W,it.p[0].y*H); it.p.forEach(function(p){ c.lineTo(p.x*W,p.y*H); }); if(it.p.length===1) c.lineTo(it.p[0].x*W+.01,it.p[0].y*H); c.stroke(); }
      else { c.font = "700 "+(it.s*W)+"px Manrope,Arial,sans-serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.lineWidth = it.s*W*.14; c.strokeStyle = it.c==="#000000"?"#fff":"#000"; c.strokeText(it.t,it.x*W,it.y*H); c.fillStyle = it.c; c.fillText(it.t,it.x*W,it.y*H); }
    });
  }
  function paint(){ render(ctx,fw,fh,1); }
  function pt(e){ var r = cv.getBoundingClientRect(); return {x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))}; }
  cv.onpointerdown = function(e){
    e.preventDefault(); try{ cv.setPointerCapture(e.pointerId); }catch(x){}
    var p = pt(e);
    if(mode==="mv"){ drag = {x:e.clientX,y:e.clientY}; cv.style.cursor = "grabbing"; }
    else if(mode==="dr"){ cur = {k:"s",c:col,w:.012,p:[p]}; items.push(cur); paint(); }
    else { var t = window.prompt(T.ask,""); if(t){ items.push({k:"t",t:t.slice(0,60),x:p.x,y:p.y,c:col,s:.07}); paint(); } }
  };
  cv.onpointermove = function(e){
    if(mode==="mv" && drag){ ox += e.clientX-drag.x; oy += e.clientY-drag.y; drag = {x:e.clientX,y:e.clientY}; clamp(); paint(); }
    else if(mode==="dr" && cur){ cur.p.push(pt(e)); paint(); }
  };
  cv.onpointerup = cv.onpointercancel = function(){ drag = null; cur = null; cv.style.cursor = mode==="mv"?"grab":"crosshair"; };
  cv.onwheel = function(e){ e.preventDefault(); zoom = Math.max(1,Math.min(5,zoom*(e.deltaY<0?1.08:.93))); dlg.querySelector("#oxz").value = zoom; clamp(); paint(); };
  dlg.querySelector("#oxz").oninput = function(){ zoom = +this.value; clamp(); paint(); };
  function ui(){
    var rr = dlg.querySelector("#oxr"); if(rr) rr.innerHTML = RS.map(function(x,i){ return '<button type="button" class="btn sm '+(i===ro?"p":"")+'" data-r="'+i+'">'+x[1]+'</button>'; }).join("");
    dlg.querySelector("#oxm").innerHTML = [["mv",T.mv],["dr",T.dr],["tx",T.tx]].map(function(m){ return '<button type="button" class="btn sm '+(mode===m[0]?"p":"")+'" data-m="'+m[0]+'">'+m[1]+'</button>'; }).join("")+'<button type="button" class="btn sm" data-u="1">↶ '+T.undo+'</button>';
    dlg.querySelector("#oxk").innerHTML = COL.map(function(c){ return '<button type="button" class="sw '+(c===col?"on":"")+'" data-c="'+c+'" style="background:'+c+'"></button>'; }).join("");
    cv.style.cursor = mode==="mv"?"grab":"crosshair";
  }
  dlg.onclick = function(e){
    var b = e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-r")){ ro = +b.getAttribute("data-r"); R = RS[ro][0] || iw/ih; ox = oy = 0; layout(); ui(); }
    else if(b.hasAttribute("data-m")){ mode = b.getAttribute("data-m"); ui(); }
    else if(b.hasAttribute("data-c")){ col = b.getAttribute("data-c"); ui(); }
    else if(b.hasAttribute("data-u")){ items.pop(); paint(); }
    else if(b.id==="oxok"){
      var W = Math.min(o.w||1280,Math.max(iw,320)), H = Math.round(W/R), c = document.createElement("canvas"); c.width = W; c.height = H;
      render(c.getContext("2d"),W,H,W/fw); c.toBlob(function(bl){ done(bl); },"image/jpeg",.86);
    } else if(b.id==="oxno") done(null);
  };
  dlg.oncancel = function(e){ e.preventDefault(); done(null); };
  function done(v){ dlg.onclick = null; if(dlg.open) dlg.close(); URL.revokeObjectURL(url); resolve(v); }
  layout(); ui(); if(!dlg.open) dlg.showModal();
}
window.OxEdit = {open:open};
})();
