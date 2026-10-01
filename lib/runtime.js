import {P,im,rs,T} from './pages';
export function boot(){if(window.__sb)return window.__sb;
const $=s=>document.querySelector(s);
let hsI=0,hsT;
function hsTo(n){const sl=document.querySelectorAll("#hs .sl"),d=document.querySelectorAll("#hs .dots button");if(!sl.length)return;const pv=hsI;hsI=(n+sl.length)%sl.length;if(pv!==hsI)sl.forEach((e,k)=>{e.classList.toggle("prev",k===pv);e.classList.toggle("on",k===hsI)});d.forEach((e,k)=>e.classList.toggle("on",k===hsI));hsAuto()}
function hsGo(d){hsTo(hsI+d)}
function hsAuto(){clearInterval(hsT);hsT=setInterval(()=>{if(!document.hidden)hsTo(hsI+1)},2000)}
function hsInit(){clearInterval(hsT);hsI=0;const h=$("#hs");if(!h)return;hsAuto();let x=0;h.addEventListener("touchstart",e=>x=e.touches[0].clientX,{passive:true});h.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-x;if(Math.abs(d)>40)hsGo(d<0?1:-1)});h.addEventListener("mouseenter",()=>clearInterval(hsT));h.addEventListener("mouseleave",hsAuto)}
// ---- cart ----
let C=[];try{C=JSON.parse(localStorage.getItem("saba_cart")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("saba_cart",JSON.stringify(C))}catch(e){}draw()};
const add=(id,q=1)=>{const x=C.find(i=>i.id===id);x?x.q+=q:C.push({id,q});save();cart(1)};
const chg=(id,d)=>{const x=C.find(i=>i.id===id);x.q+=d;if(x.q<1)C=C.filter(i=>i!==x);save()};
const del=id=>{C=C.filter(i=>i.id!==id);save()};
const sub=()=>C.reduce((a,i)=>a+P.find(p=>p.id===i.id).p*i.q,0);
function cart(o){$("#dr").classList.toggle("on",!!o);$("#ov").classList.toggle("on",!!o)}
function draw(){$("#cnt").textContent=C.reduce((a,i)=>a+i.q,0);
$("#ls").innerHTML=C.length?C.map(i=>{const p=P.find(x=>x.id===i.id);return`<div class="it"><div class="im">${im(p.img,p.n)}</div><div><b>${p.n}</b><small>${p.s} · ${rs(p.p)}</small><div style="margin-top:8px;display:flex;align-items:center"><div class="qty"><button onclick="chg('${p.id}',-1)">−</button><span>${i.q}</span><button onclick="chg('${p.id}',1)">+</button></div><button class="rm" onclick="del('${p.id}')">Remove</button></div></div></div>`}).join(""):`<p style="color:var(--mut);padding:40px 0;text-align:center">Your cart is empty.</p>`;
$("#ft").innerHTML=C.length?`<div class="tot"><span>Subtotal</span><span>${rs(sub())}</span></div><a class="btn dk" style="width:100%;justify-content:center" href="/checkout" onclick="cart(0)">Checkout</a>`:`<a class="btn lt" style="width:100%;justify-content:center" href="/shop" onclick="cart(0)">Shop Products</a>`}
const IX='<svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>',XX='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>';
function menu(f){const n=$("#nav"),o=f===undefined?!n.classList.contains("open"):f;n.classList.toggle("open",o);$("#bg").innerHTML=o?XX:IX;$("#bg").setAttribute("aria-expanded",o);document.body.classList.toggle("lock",o&&innerWidth<=940);document.body.classList.toggle("mo",o)}
function srch(o){menu(false);$("#sr").classList.toggle("on",!!o);document.body.classList.toggle("lock",!!o);if(o){$("#sq").value="";sres();setTimeout(()=>$("#sq").focus(),300)}}
function sres(){const q=$("#sq").value.trim().toLowerCase(),r=P.filter(p=>!q||p.n.toLowerCase().includes(q));$("#sl").innerHTML=r.length?r.map(p=>`<a class="r1" href="/product/${p.id}" onclick="srch(0)"><div class="im">${im(p.img,p.n)}</div><div style="flex:1"><b>${p.n}</b><div class="sz" style="font-size:12px;color:var(--mut)">${p.s}</div></div><span class="pr">${rs(p.p)}</span></a>`).join(""):'<p style="padding:24px 0;color:var(--mut)">No products found.</p>';}
addEventListener("keydown",e=>{if(e.key==="Escape"){srch(0);cart(0);menu(false)}});
addEventListener("resize",()=>{if(innerWidth>940)menu(false)});
function gfl(c,b){document.querySelectorAll(".gg>.gt").forEach(e=>{e.style.display=(c=="all"||e.dataset.c==c)?"":"none"});document.querySelectorAll(".gf button").forEach(x=>x.classList.toggle("on",x===b))}
function pq(d){const e=$("#pq");e.textContent=Math.max(1,+e.textContent+d)}
function order(){C=[];save();($("#co")||$("#app")).innerHTML=`<div class="wrap pt" style="padding-bottom:140px"><h1 style="font-size:clamp(2.4rem,6vw,4rem)">Thank you.</h1><p style="margin:18px 0 28px">Order received (demo). We will contact you to confirm.</p><a class="btn dk" href="/shop">Continue Shopping</a></div>`}
function tr(){document.body.classList.toggle("tr",document.body.classList.contains("home")&&scrollY<40)}
addEventListener("scroll",tr,{passive:true});
function obs(){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll(".fade").forEach(e=>o.observe(e))}
const co=()=>{const e=$('#co');if(e)e.innerHTML=T.checkout(C)};
draw();Object.assign(window,{$,add,chg,del,cart,menu,srch,sres,pq,order,gfl,hsTo,hsGo});
return window.__sb={menu,tr,obs,hsInit,co}}
