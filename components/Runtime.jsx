"use client";
import {useEffect} from "react";
import {usePathname,useRouter} from "next/navigation";
import {boot} from "../lib/runtime";
import {wa} from "../lib/pages";
export default function Runtime(){
const p=usePathname(),r=useRouter();
useEffect(()=>{boot();const f=e=>{const l=e.target.closest&&e.target.closest('a[href^="/"]');if(!l||l.target||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;e.preventDefault();r.push(l.getAttribute("href"))};document.addEventListener("click",f);return()=>document.removeEventListener("click",f)},[r]);
useEffect(()=>{const a=boot();a.menu(false);document.body.classList.toggle("home",p==="/");a.tr();
document.querySelectorAll("nav.m a").forEach(l=>l.classList.toggle("on",l.getAttribute("href")===(p.startsWith("/product")?"/shop":p)));
document.querySelectorAll("[data-wa]").forEach(e=>{e.href=wa(e.dataset.wa);e.target="_blank";e.rel="noopener"});
a.obs();a.hsInit();a.co()},[p]);
return null}
