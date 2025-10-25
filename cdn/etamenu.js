// ! WARNING: this script is not to be used to harm websites or anything that you don't have permission on. !
// ! i am not responsible for anything done with this script but i ask you use it for fun and legally only. !
// ! do 'await import("https://etamodder.github.io/cdn/etamenu.js")' in devtools console and it should work !

// ETAmenu v0.4.5 by ETAGamer / ETAModder / ETA
// the script is under the MIT license as of rn

const ip = await fetch('https://api.ipify.org?format=json').then(r=>r.json()).then(j=>j.ip).catch(()=>null);
if (ip && ip.startsWith('168.')) {
  console.log('forbidden ip');
  const noop = async ()=>{};
  export default noop;
} else {
console.log('ip check passed')
if(typeof window==='undefined') throw new Error('browser only')
if(window.__etaHackerMenu){window.__etaHackerMenu.show()}else{
const cssLink='https://unpkg.com/xp.css'
const l=document.createElement('link')
l.rel='stylesheet'
l.href=cssLink
document.head.appendChild(l)
const overlay=document.createElement('div')
overlay.id='eta-xp-overlay'
Object.assign(overlay.style,{
  position:'fixed',
  inset:'0',
  zIndex:'2147483647',
  background:'#cfe8ff',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontFamily:'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
})
document.addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{})},{once:true})
const backtick=String.fromCharCode(96)
overlay.innerHTML=
'<div class="window windows_xp" style="width:900px;height:600px;display:flex;flex-direction:column">'+
  '<div class="title-bar"><div class="title-bar-text">ETAmenu v0.4</div><div class="title-bar-controls"><button aria-label="Minimize"></button><button aria-label="Maximize"></button><button aria-label="Close"></button></div></div>'+
  '<div style="display:flex;gap:12px;padding:12px;flex:1;overflow:auto">'+
    '<aside style="width:220px"><fieldset class="toolbox"><legend>tabs</legend><menu style="display:flex;flex-direction:column;gap:8px">'+
      '<button id="eta-tab-info" class="square">infoz</button>'+
      '<button id="eta-tab-fun" class="square">funz</button>'+
      '<button id="eta-tab-chaos" class="square">CHAOS</button>'+
      '<button id="eta-tab-scripts" class="square">skriptz</button>'+
    '</menu></fieldset></aside>'+
    '<main style="flex:1"><section id="eta-content" style="height:100%"></section></main>'+
  '</div>'+
  '<div style="padding:8px;display:flex;gap:8px;align-items:center;justify-content:space-between">'+
    '<div style="font-size:12px">press '+backtick+' to toggle lol</div>'+
    '<div><button id="eta-restore" class="square">restore ze page</button><button id="eta-inject" class="square">injekt skriptz</button></div>'+
  '</div>'+
'</div>'
document.documentElement.appendChild(overlay)
window.__eta_origBodyStyle=document.body.style.display||''
document.body.style.display='none'
const content=document.getElementById('eta-content')
const setInfo=async()=>{
  content.innerHTML='<p>loading infoz...</p>'
  let ip='unknown',geo={},ua=navigator.userAgent
  try{const resp=await fetch('https://api.ipify.org?format=json');const data=await resp.json();ip=data.ip}catch(e){}
  try{const resp=await fetch(`https://ipapi.co/${ip}/json/`);geo=await resp.json()}catch(e){}
  content.innerHTML=
  '<article style="padding:12px">'+
    '<h3>page & sys infoz</h3>'+
    '<p><strong>url:</strong> '+location.href+'</p>'+
    '<p><strong>title:</strong> '+document.title+'</p>'+
    '<p><strong>user agent:</strong> '+ua+'</p>'+
    '<hr>'+
    '<p><strong>ipv4:</strong> '+ip+'</p>'+
    '<p><strong>city:</strong> '+(geo.city||'N/A')+'</p>'+
    '<p><strong>region:</strong> '+(geo.region||'N/A')+'</p>'+
    '<p><strong>country:</strong> '+(geo.country_name||'N/A')+'</p>'+
    '<p><strong>latitude / Longitude:</strong> '+(geo.latitude||'N/A')+' / '+(geo.longitude||'N/A')+'</p>'+
    '<p><strong>isp:</strong> '+(geo.org||'N/A')+'</p>'+
    '<p><strong>timezone:</strong> '+(geo.timezone||'N/A')+'</p>'+
    '<hr>'+
    '<p><strong>screen:</strong> '+screen.width+'x'+screen.height+'</p>'+
    '<p><strong>platform:</strong> '+navigator.platform+'</p>'+
    '<p><strong>language:</strong> '+navigator.language+'</p>'+
    '<p><strong>cookies enabled:</strong> '+navigator.cookieEnabled+'</p>'+
    '<p><strong>online:</strong> '+navigator.onLine+'</p>'+
  '</article>'
}
const buildFun=()=>{
  const soundEmbeds=[
    'bruh',
    'fart-with-reverb-17715',
    'oh-my-god-bro-oh-hell-nah-man-42939',
    'lobotomy-sound-effect-98475',
    'lego-breaking-57805',
    'among-us-35001',
    'rat-dance-music-93451',
    'sponge-stank-noise-17565',
    'get-out-meme-91882',
    'start-digging-in-your-butt-twin-2146'
  ]
  let html='<div style="padding:12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;background-color:darkgrey">'
  soundEmbeds.forEach(name=>{html+=`<iframe width="110" height="200" src="https://www.myinstants.com/instant/${name}/embed/" frameborder="0" scrolling="no"></iframe>`})
  html+='</div>'
  content.innerHTML=html
}
const buildChaos=()=>{
  content.innerHTML=
  '<div style="padding:12px"><h3>chaos!</h3><div style="display:flex;gap:8px;flex-wrap:wrap">'+
    '<button id="eta-chaos-alert" class="square">alert spam</button>'+
    '<button id="eta-chaos-flood" class="square">flood tabs (danger)</button>'+
    '<button id="eta-chaos-nyan" class="square">flood cats</button>'+
  '</div></div>'
  document.getElementById('eta-chaos-alert').onclick=()=>{for(let i=0;i<6;i++)setTimeout(()=>alert('ETA chaos!'),i*200)}
  document.getElementById('eta-chaos-flood').onclick=()=>{for(let i=0;i<9999999;i++)window.open('about:blank')}
  document.getElementById('eta-chaos-nyan').onclick=()=>{
    const nyanUrl='https://www.nyan.cat/cats/original.gif'
    let count=0
    const interval=setInterval(()=>{
      const img=document.createElement('img')
      img.src=nyanUrl
      img.style.position='fixed'
      img.style.left=Math.random()*window.innerWidth+'px'
      img.style.top=Math.random()*window.innerHeight+'px'
      img.style.width='64px'
      img.style.height='64px'
      img.style.zIndex=2147483646
      document.body.appendChild(img)
      count++
      if(count>100)clearInterval(interval)
    },200)
  }
}
const buildScripts=()=>{
  content.innerHTML='<div style="padding:12px"><h3>scripts</h3><p>paste a public script url & click load.</p><input id="eta-script-url" style="width:70%"/><button id="eta-load-script" class="square">LOAD</button></div>'
  document.getElementById('eta-load-script').onclick=async()=>{
    const u=document.getElementById('eta-script-url').value
    if(!u)return
    try{const s=document.createElement('script');s.src=u;document.head.appendChild(s);alert('injected')}catch(e){alert('failed :(')}
  }
}
document.getElementById('eta-tab-info').onclick=setInfo
document.getElementById('eta-tab-fun').onclick=buildFun
document.getElementById('eta-tab-chaos').onclick=buildChaos
document.getElementById('eta-tab-scripts').onclick=buildScripts
document.getElementById('eta-restore').onclick=()=>{overlay.style.display='none';document.body.style.display=window.__eta_origBodyStyle}
document.getElementById('eta-inject').onclick=async()=>{
  const url=prompt('script url')
  if(!url)return
  try{const s=document.createElement('script');s.src=url;document.head.appendChild(s);alert('injected')}catch(e){alert('failed :(')}
}
window.addEventListener('keydown',e=>{
  if(e.key===String.fromCharCode(96)){
    if(overlay.style.display==='none'){overlay.style.display='flex';document.body.style.display='none'}
    else{overlay.style.display='none';document.body.style.display=window.__eta_origBodyStyle}
  }
})
document.getElementById('eta-tab-info').click()
window.__etaHackerMenu={
  show:()=>{overlay.style.display='flex';document.body.style.display='none'},
  hide:()=>{overlay.style.display='none';document.body.style.display=window.__etaHackerMenu?window.__eta_origBodyStyle:document.body.style.display},
  destroy:()=>{overlay.remove();document.body.style.display=window.__eta_origBodyStyle;delete window.__etaHackerMenu}
}
}
export default async function init(){if(window.__etaHackerMenu){window.__etaHackerMenu.show();return}await Promise.resolve()}
}
