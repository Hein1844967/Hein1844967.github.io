/* Portfolio logic: renders DATA, project search/filter, hash routing, dark mode, contact form */
/* ===== EDIT THIS BLOCK: all site content lives here ===== */

var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function safeUrl(u){return /^(https?:|mailto:)/.test(u)?u:""}
var SECTIONS=["home","about","skills","experience","projects","education","cv","contact"];
$("navList").innerHTML=SECTIONS.map(function(s){return '<li><a href="#'+s+'">'+(s==="cv"?"CV":s[0].toUpperCase()+s.slice(1))+'</a></li>'}).join("");
document.title="John Henric Mendoza | BSIT Student & Web Developer | Calamba, Laguna";
$("brandName").textContent=DATA.name;$("hName").textContent=DATA.name;$("hTitle").textContent=DATA.title;
$("hTag").textContent=DATA.tagline;$("hIntro").textContent=DATA.intro;$("bio").textContent=DATA.bio;
if(DATA.photo){$("photo").innerHTML='<img src="'+esc(DATA.photo)+'" alt="Portrait of '+esc(DATA.name)+'">'}else{$("photo").textContent="JM"}
$("facts").innerHTML=DATA.facts.map(function(f){return "<dt>"+esc(f[0])+"</dt><dd>"+esc(f[1])+"</dd>"}).join("");
$("skillGrid").innerHTML=Object.keys(DATA.skills).map(function(k){return '<div class="card"><h3>'+esc(k)+'</h3>'+DATA.skills[k].map(function(s){return '<div class="skill"><span>'+esc(s[0])+'</span><span class="meta">'+["","Basic","Working","Proficient","Advanced","Expert"][s[1]]+'</span></div><div class="bar" role="img" aria-label="'+esc(s[0])+' level '+s[1]+' of 5"><i style="width:'+s[1]*20+'%"></i></div>'}).join("")+'</div>'}).join("");
$("expList").innerHTML=DATA.experience.map(function(e){return "<li><h3>"+esc(e.role)+"</h3><p class='meta'>"+esc(e.org)+", "+esc(e.place)+" · "+esc(e.dates)+"</p><p>"+esc(e.duties)+"</p>"+(e.wins?"<p><strong>Accomplishment:</strong> "+esc(e.wins)+"</p>":"")+"</li>"}).join("");
$("eduGrid").innerHTML=DATA.education.map(function(e){return '<div class="card"><h3>'+esc(e.name)+'</h3><p class="meta">'+esc(e.org)+" · "+esc(e.year)+"</p><p>"+esc(e.note)+"</p>"+(e.image?'<img class="cert" loading="lazy" src="'+esc(e.image)+'" alt="Certificate: '+esc(e.name)+'">':"")+"</div>"}).join("");
var linkRow=Object.keys(DATA.links).filter(function(k){return safeUrl(DATA.links[k])});
$("contactList").innerHTML=DATA.facts.filter(function(f){return /Email|Phone|Location/.test(f[0])}).map(function(f){return "<dt>"+esc(f[0])+"</dt><dd>"+esc(f[1])+"</dd>"}).join("")+linkRow.map(function(k){return "<dt>"+esc(k)+'</dt><dd><a href="'+esc(DATA.links[k])+'" rel="noopener">'+esc(k)+"</a></dd>"}).join("");
$("fName").textContent=DATA.name;$("fTitle").textContent=DATA.title;
$("fLinks").innerHTML=SECTIONS.map(function(s){return '<li><a href="#'+s+'">'+s+"</a></li>"}).join("")+linkRow.map(function(k){return '<li><a href="'+esc(DATA.links[k])+'" rel="noopener">'+esc(k)+"</a></li>"}).join("");
$("fCopy").textContent="© "+new Date().getFullYear()+" "+DATA.name+". All rights reserved.";
/* CV: links only when a file exists */
var cvOk=!!DATA.cv;
document.querySelectorAll(".cvLink").forEach(function(a){if(cvOk){if(a.id==="cvDl"){a.href=DATA.cv}else if(a.id==="cvView"){a.href=DATA.cv}else{a.href=DATA.cv;a.setAttribute("download","")}}else if(a.id){a.setAttribute("aria-disabled","true")}});
$("cvNote").textContent=cvOk?"Latest CV in PDF format.":"CV file not added yet. Set DATA.cv to your hosted PDF path to enable these buttons.";
/* Projects: search + filter without reload */
var cats=[""].concat(Array.from(new Set(DATA.projects.map(function(p){return p.category}))));
var yrs=[""].concat(Array.from(new Set(DATA.projects.map(function(p){return p.year}))).sort().reverse());
$("cat").innerHTML=cats.map(function(c){return '<option value="'+esc(c)+'">'+(c||"All categories")+"</option>"}).join("");
$("yr").innerHTML=yrs.map(function(y){return '<option value="'+y+'">'+(y||"All years")+"</option>"}).join("");
function renderProjects(){
var q=$("q").value.trim().toLowerCase(),c=$("cat").value,y=$("yr").value;
var list=DATA.projects.filter(function(p){
var hay=[p.name,p.category,p.year,p.description,p.status].concat(p.tech).join(" ").toLowerCase();
return (!q||hay.indexOf(q)>-1)&&(!c||p.category===c)&&(!y||String(p.year)===y)});
$("count").textContent=list.length+" project"+(list.length===1?"":"s")+" found";
$("projGrid").innerHTML=list.length?list.map(function(p){
return '<article class="card"><div class="thumb'+(p.fit==="contain"?" fit":"")+'">'+(p.shots&&p.shots[0]?'<img loading="lazy" src="'+esc(p.shots[0])+'" alt="Screenshot of '+esc(p.name)+'">':"No screenshot yet")+'</div><h3>'+esc(p.name)+'</h3><p class="meta">'+esc(p.category)+" · "+p.year+" · "+esc(p.status)+"</p><p>"+esc(p.description)+'</p><p class="meta">Role: '+esc(p.role)+'</p><ul class="tags">'+p.tech.map(function(t){return"<li>"+esc(t)+"</li>"}).join("")+'</ul><div class="row" style="margin-top:8px"><a class="btn" href="#project-'+esc(p.id)+'">View project</a>'+(safeUrl(p.github)?'<a class="btn alt" rel="noopener" href="'+esc(p.github)+'">GitHub</a>':"")+(safeUrl(p.url)?'<a class="btn alt" rel="noopener" href="'+esc(p.url)+'">Demo</a>':"")+"</div></article>"}).join(""):'<p>No projects match. Clear the search or choose "All categories".</p>'}
["q","cat","yr"].forEach(function(i){$(i).addEventListener("input",renderProjects)});renderProjects();
/* Routing (hash): #section or #project-id */
function route(){
var h=decodeURIComponent(location.hash.slice(1))||"home",L=$("listView"),D=$("detailView");
if(h.indexOf("project-")===0){
var p=DATA.projects.filter(function(x){return"project-"+x.id===h})[0];
if(p){L.classList.add("hidden");D.classList.remove("hidden");
var links=[["Live website",p.url],["GitHub",p.github]].filter(function(l){return safeUrl(l[1])});
$("detail").innerHTML='<p><a href="#projects">← All projects</a></p><h1>'+esc(p.name)+'</h1><p class="meta">'+esc(p.category)+" · "+p.year+" · "+esc(p.status)+" · Role: "+esc(p.role)+'</p><div class="grid" style="grid-template-columns:1fr;max-width:880px">'+(p.shots||[]).map(function(x,n){return'<div class="thumb'+(p.fit==="contain"?" fit nat":"")+'" style="aspect-ratio:auto"><img src="'+esc(x)+'" alt="Screenshot '+(n+1)+' of '+esc(p.name)+'"></div>'}).join("")+"</div><h2>Overview</h2><p>"+esc(p.description)+"</p><h2>Problem</h2><p>"+esc(p.problem)+"</p><h2>Solution</h2><p>"+esc(p.solution)+"</p><h2>Features</h2><ul>"+p.features.map(function(f){return"<li>"+esc(f)+"</li>"}).join("")+'</ul><h2>Technologies</h2><ul class="tags">'+p.tech.map(function(t){return"<li>"+esc(t)+"</li>"}).join("")+"</ul>"+(links.length?'<div class="row">'+links.map(function(l){return'<a class="btn" rel="noopener" href="'+esc(l[1])+'">'+l[0]+"</a>"}).join("")+"</div>":"");
document.title=p.name+" | "+DATA.name;window.scrollTo(0,0);return}}
D.classList.add("hidden");L.classList.remove("hidden");document.title="John Henric Mendoza | BSIT Student & Web Developer | Calamba, Laguna";
var el=SECTIONS.indexOf(h)>-1?$(h):null;if(el)el.scrollIntoView();
$("nav").classList.remove("open");$("menuBtn").setAttribute("aria-expanded","false")}
window.addEventListener("hashchange",route);route();
/* Menu + theme */
$("menuBtn").onclick=function(){var o=$("nav").classList.toggle("open");this.setAttribute("aria-expanded",o)};
try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}
$("themeBtn").onclick=function(){var r=document.documentElement,cur=r.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"),n=cur==="dark"?"light":"dark";r.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}};
/* Contact: validated, honeypot-protected, opens visitor's email app (no backend on this page) */
$("form").addEventListener("submit",function(e){e.preventDefault();
var s=$("status");if($("fh").value)return;
var n=$("fn").value.trim(),m=$("fe").value.trim(),sub=$("fs").value.trim(),msg=$("fm").value.trim();
if(!n||!sub||!msg||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)){s.textContent="Please fill in every field with a valid email address.";return}
var btn=$("form").querySelector("button");
if(DATA.formKey){btn.disabled=true;s.textContent="Sending...";
fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:DATA.formKey,subject:sub+" (portfolio)",name:n,email:m,message:msg,botcheck:""})})
.then(function(r){return r.json()}).then(function(j){if(j.success){s.textContent="Thank you! Your message was sent.";$("form").reset()}else{s.textContent="Sorry, it could not be sent. Please email me directly."}})
.catch(function(){s.textContent="Network problem. Please try again or email me directly."}).then(function(){btn.disabled=false})}
else{var to=(DATA.links.Email||"").replace("mailto:","");location.href="mailto:"+to+"?subject="+encodeURIComponent(sub)+"&body="+encodeURIComponent(msg+"\n\n"+n+" ("+m+")");s.textContent="Form service not connected yet; opening your email app instead."}});
