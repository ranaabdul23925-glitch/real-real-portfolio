(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const P={ai:'M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2M9 9h6v6H9z',
ads:'M4 20V10M10 20V4M16 20v-7M22 20H2',soc:'M4 5h16v11H9l-5 4zM8 9h8M8 12h5',
web:'M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01',app:'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14',str:'M5 19V9M12 19V4M19 19v-6M3 19h18'};
const S=[
['ai','AI Engineering & Automation','Add useful AI features and automate repetitive work.',[
['What it can include',['AI chatbot development and AI-powered assistants','Integration with AI APIs and language models','Python-based AI applications and FastAPI backends','Prompt design and structured AI workflows','Business workflow automation, API integrations, and data processing','Connecting AI features to websites and applications']],
['Example automations',['New enquiry: instant AI reply, CRM entry, and team alert','Chatbot that hands over to a human when needed','Automated reports from campaign or business data','Scheduled email and content workflows']],
['Business value',['Reduce repetitive tasks','Improve customer support workflows','Add useful AI capabilities to digital products']]],
'Tools such as Python, FastAPI, AI model APIs, REST APIs, and automation tools are chosen per project, not all used every time.'],
['ads','Digital Marketing & Meta Ads','Plan, run, and improve Facebook and Instagram ad campaigns.',[
['What it can include',['Meta Ads campaign planning and setup','Audience research and targeting','Campaign objectives and budget planning','Ad creative testing','Monitoring and optimization','Landing page and advertising funnel recommendations']],
['Performance and reporting',['CTR, CPC, CPM, and cost per result analysis','Clear performance reports','Decisions guided by data, testing, and business objectives']]],
'Results depend on the business, offer, and market. No sales, leads, or ROAS are guaranteed.'],
['soc','Social Media Management','Keep your Facebook and Instagram presence consistent and active.',[
['What it can include',['Facebook and Instagram page management','Content planning and calendars','Post and creative coordination','Captions and content ideas','Publishing and scheduling workflows','Engagement monitoring and page optimization','Coordination between organic content and paid campaigns','Brand consistency']]],
'Adapted to your needs and available resources.'],
['web','Web Design & Development','Modern websites that are planned, designed, built, tested, and deployed.',[
['Frontend',['HTML5 for structure, CSS3 for layout and visual design','JavaScript for interactive behavior','React and Next.js for modern, component-based web apps']],
['Backend and integrations',['Node.js or other suitable backends when required','REST APIs, authentication, and form processing','Supabase for database features where suitable']],
['Design and deployment',['Responsive layouts for mobile, tablet, and desktop','Accessible, user-friendly interfaces','Performance optimization and SEO-friendly structure','Git and GitHub for version control','Hosting on Vercel or another suitable platform']]],
'Not every website needs every tool. The stack matches your goals.'],
['app','Software & Web Application Development','Custom tools that fit how your business works.',[
['What it can include',['Custom web applications and business dashboards','Admin panels and user authentication','Database-backed applications with CRUD functionality','API integrations','Client and project management tools','Forms, tables, filters, and reporting interfaces','Testing, debugging, and deployment']]],
'Technologies such as Next.js, React, JavaScript, Python, FastAPI, Supabase, and PostgreSQL are chosen based on requirements, budget, complexity, and scale.'],
['str','Digital Strategy & Technical Consultation','Practical guidance before you build or spend.',[
['What it can include',['Choosing suitable technologies for your business','Planning website and software features','Improving digital workflows','Evaluating AI automation opportunities','Planning digital marketing campaigns','Connecting websites, forms, databases, and business tools','Breaking larger projects into manageable development stages']]],
'Focused on your business needs.']];
const svc=document.getElementById('svc'),sel=document.querySelector('select');
S.forEach(([k,n,i,secs,note],x)=>{
 const a=document.createElement('article');a.className='card tilt';
 a.innerHTML=`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[k]}"/></svg><h3>${n}</h3><p>${i}</p>
 <button class="toggle" aria-expanded="false" aria-controls="d${x}">View Details <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
 <div class="detail" id="d${x}"><div>${secs.map(([h,l])=>`<h4>${h}</h4><ul>${l.map(t=>`<li>${t}</li>`).join('')}</ul>`).join('')}<p class="note">${note}</p></div></div>`;
 const b=a.querySelector('.toggle');
 b.onclick=()=>{const o=a.classList.toggle('open');b.setAttribute('aria-expanded',o);b.firstChild.textContent=o?'Hide Details ':'View Details '};
 svc.appendChild(a);sel.add(new Option(n,n));
});
sel.add(new Option('Other / Not sure yet','Other'));
document.querySelectorAll('.grid').forEach(gr=>[...gr.children].forEach((c,i)=>c.style.setProperty('--i',i)));
// 3D tilt (pointer devices only)
if(fine&&!reduce)document.querySelectorAll('.card').forEach(c=>{
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.setProperty('--mx',(x+.5)*100+'%');c.style.setProperty('--my',(y+.5)*100+'%');c.classList.add('hov');c.style.transform=`perspective(900px) rotateX(${-y*8}deg) rotateY(${x*10}deg) translateY(-6px)`});
 c.addEventListener('pointerleave',()=>{c.classList.remove('hov');c.style.transform=''});
});
// menu
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)});
// active link + reveal
const links=[...menu.querySelectorAll('a')];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>spy.observe(s));
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(s=>rv.observe(s));
document.getElementById('yr').textContent=new Date().getFullYear();
// form: mailto fallback (no backend connected)
const f=document.getElementById('form'),st=document.getElementById('status');
f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
 [...f.elements].forEach(el=>{if(el.required){const bad=!el.value.trim()||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value));el.classList.toggle('bad',bad);if(bad)ok=false}});
 st.className='err';if(!ok){st.textContent='Please fill in your name, a valid email, and a message.';return}
 const d=Object.fromEntries(new FormData(f));
 const body=`Name: ${d.name}\nEmail: ${d.email}\nService: ${d.service}\n\n${d.message}`;
 location.href=`mailto:rana5729585@gmail.com?subject=${encodeURIComponent('Project inquiry: '+d.service)}&body=${encodeURIComponent(body)}`;
 st.className='ok';st.textContent='Your email app should open with the message ready. Press send there to deliver it. You can also use WhatsApp.';
});
const pg=document.querySelector('.prog');addEventListener('scroll',()=>{pg.style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`},{passive:true});
// chatbot demo
const box=document.getElementById('msgs'),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const M=[['u','Do you offer appointments on weekends?'],['t'],['b','Yes. Here are the open slots. Which one works for you?'],['u','Saturday at 11 am, please.'],['t'],['b','Booked. A confirmation is on its way to your email.']];
const add=(w,t)=>{const d=document.createElement('div');d.className='m '+w;d.innerHTML=t;box.appendChild(d);return d};
(async()=>{if(reduce){M.forEach(([w,t])=>w!=='t'&&add(w,t));return}
 for(;;){box.innerHTML='';for(const [w,t] of M){if(w==='t'){const d=add('b','<span class="dots"><i></i><i></i><i></i></span>');await sleep(1200);d.remove();continue}
  add(w,t);await sleep(1400)}await sleep(3500)}})();
// particles + parallax
const cv=document.getElementById('bg'),g=cv.getContext('2d');let W,H,pts=[],mx=0,my=0;
const size=()=>{const d=Math.min(devicePixelRatio,2);W=cv.width=innerWidth*d;H=cv.height=innerHeight*d;pts=Array.from({length:Math.round(innerWidth/16)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,v:Math.random()*.25+.05}))};
size();addEventListener('resize',size);
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
let run=true;document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run&&!reduce)draw()});
function draw(){g.clearRect(0,0,W,H);
 for(const p of pts){p.y-=p.v*p.z;if(p.y<0){p.y=H;p.x=Math.random()*W}
  const x=p.x+mx*60*p.z*devicePixelRatio,y=p.y+my*60*p.z*devicePixelRatio,r=p.z*2.2*devicePixelRatio;
  g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=`rgba(212,175,55,${.15+p.z*.5})`;g.shadowColor='#d4af37';g.shadowBlur=8*p.z;g.fill()}
 if(run&&!reduce)requestAnimationFrame(draw)}
draw();
const sh=document.querySelector('.shapes'),cw=document.querySelectorAll('.cubewrap');
if(!reduce){let t=0;addEventListener('scroll',()=>{if(!t)t=requestAnimationFrame(()=>{sh.style.transform=`translateY(${-scrollY*.14}px)`;t=0})},{passive:true});
 addEventListener('pointermove',()=>cw.forEach((w,i)=>w.style.transform=`rotateX(${my*-50}deg) rotateY(${mx*70*(i?-1:1)}deg)`));
 if(fine)document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.25}px`});b.addEventListener('pointerleave',()=>b.style.translate='')})}
if(!reduce)document.querySelectorAll('.shapes i').forEach((s,i)=>addEventListener('pointermove',()=>{s.style.translate=`${mx*(i+1)*-30}px ${my*(i+1)*-30}px`}));
})();
