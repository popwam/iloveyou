// ========= CONFIG =========
const PERSON_NAME = "رنوشتي";

// ✅ كلمة السر الجديدة (قبول خيارين)
const PASSWORDS = ["بحبك يا ممدوح", "بحبك يا دوو"];

// لو كتبت بحبك/احبك يظهر رد رومانسي
const LOVE_WORDS = ["بحبك","احبك"];

// ✅ فتح رسالة الخطوبة (14/2) - وقت موثوق
const UNLOCK_UTC = Date.UTC(2026, 1, 14, 0, 0, 0);

// ✅ فتح رسالة رمضان في العيد (مصر: غالبًا 20 مارس 2026)
const EID_UNLOCK_UTC = Date.UTC(2026, 2, 20, 0, 0, 0);

// together from 23/1/2026
const TOGETHER_START = new Date(2026, 0, 23, 0, 0, 0);

const MESSAGES = [
  "أنا عامل الصفحة دي مخصوص… عشانك ❤️",
  "كل مرة بتفتحيها… افتكري إنك غالية عندي ✨",
  "الخطوبة كانت حلم… وبقت حقيقة 💍",
  "وفي رمضان… لسه في مفاجأة أكبر مستنياكي 🌙"
];

const TIMELINE = [
  { date: "23/1", text: "أول لقاء بينا 💫" },

  { date: "12/2", text: "اتفقنا إني هركّبك معايا العربية… وكنت صادق ✨" },
  { date: "12/2", text: "جيتلك نص الليل بهدية… دي كانت حجة بس الحقيقة كنت عاوز أشوفك ❤️" },

  { date: "13/2", text: "أول مرة أقولك بحبك مباشرة… وردك خلاني أحس إني بحلم 🥺" },
  { date: "13/2", text: "ركبتي معايا العربية… وأختك من بابا معانا 🚗" },
  { date: "13/2", text: "أختك معايا المنصورة زي ما وعدتك ✅" },

  { date: "14/2", text: "لبستك الدبلة في اليمين… كنت فرحان ومكسوف 💍❤️" }
];

// ✅ ألبوم الخطوبة — سمّيهم: 1.jpg..137.jpg و 1.mp4..15.mp4
const ENG_PHOTOS_COUNT = 137;
const ENG_VIDEOS_COUNT = 15;

const ENG_PHOTOS_DIR = "ass/engagement/photos/";
const ENG_VIDEOS_DIR = "ass/engagement/videos/";

const IMAGES = [
  "ass/img/1.png","ass/img/2.png","ass/img/3.jpeg","ass/img/4.jpeg",
  "ass/img/5.jpeg","ass/img/6.jpeg","ass/img/7.jpeg"
];

const FINAL_MESSAGE = `
يا ${PERSON_NAME} ❤️
لو وصلتي لحد هنا… يبقى إنتي فعلاً أغلى حاجة.
كل سنة وإنتي حبيبتي… ووجودك في حياتي نعمة.
(دي رسالة 14/2 ✨)
`.trim();

const RAMADAN_MESSAGE = `
يا ${PERSON_NAME} 🌙❤️
رمضان كريم…
أنا شايلك كلام كبير ومفاجأة أحلى…
بس دي هتتفتح يوم العيد 😉🎁
`.trim();

// ========= HELPERS =========
const $ = (id)=>document.getElementById(id);
const show = (el)=>el.classList.remove("hidden");
const hide = (el)=>el.classList.add("hidden");

// ========= TRUSTED TIME (ANTI DATE-TAMPER) =========
let trustedOffsetMs = null;
let hasTrustedTime = false;

function nowMs(){
  return (trustedOffsetMs === null) ? Date.now() : (Date.now() + trustedOffsetMs);
}

async function fetchTrustedNow(){
  const sources = [
    "https://worldtimeapi.org/api/ip",
    "https://timeapi.io/api/Time/current/zone?timeZone=Africa/Cairo"
  ];

  for(const url of sources){
    try{
      const res = await fetch(url, { cache: "no-store" });
      if(!res.ok) continue;
      const data = await res.json();

      const serverMs =
        (typeof data.unixtime === "number") ? (data.unixtime * 1000) :
        (data.dateTime ? Date.parse(data.dateTime) : NaN);

      if(Number.isFinite(serverMs)){
        trustedOffsetMs = serverMs - Date.now();
        hasTrustedTime = true;
        return true;
      }
    }catch(e){}
  }

  trustedOffsetMs = null;
  hasTrustedTime = false;
  return false;
}

// ========= UI =========
function spawnHearts(){
  const box = $("hearts");
  box.innerHTML = "";
  for(let i=0;i<16;i++){
    const h=document.createElement("div");
    h.className="heart";
    h.style.left = (Math.random()*100)+"vw";
    h.style.animationDuration = (6+Math.random()*9)+"s";
    h.style.animationDelay = (Math.random()*5)+"s";
    h.style.opacity = (0.08+Math.random()*0.16).toFixed(2);
    box.appendChild(h);
  }
}

function openModal({title, text, extraHtml="", actions=[]}){
  $("mTitle").textContent = title;
  $("mText").innerHTML = text;
  $("mExtra").innerHTML = extraHtml;

  const a = $("mActions");
  a.innerHTML = "";
  actions.forEach(btn=>{
    const b = document.createElement("button");
    b.className = "btn" + (btn.secondary ? " secondary" : "");
    b.textContent = btn.label;
    b.onclick = ()=>btn.onClick();
    a.appendChild(b);
  });

  document.body.classList.add("modal-open");
  $("modalBack").style.display="flex";
}

function closeModal(){
  document.body.classList.remove("modal-open");
  $("modalBack").style.display="none";
}

function renderMessages(){
  const wrap=$("msgs"); wrap.innerHTML="";
  MESSAGES.forEach((t)=>{
    const d=document.createElement("div");
    d.className="msg";
    d.textContent=t;
    wrap.appendChild(d);
  });
}

function renderTimeline(){
  const t=$("timeline"); t.innerHTML="";
  TIMELINE.forEach(item=>{
    const d=document.createElement("div");
    d.className="titem";
    d.innerHTML = `<div class="tdate">${item.date}</div><div style="margin-top:6px;color:rgba(244,246,255,.85)">${item.text}</div>`;
    t.appendChild(d);
  });
}

function openImageLightbox(src){
  openModal({
    title:"📸",
    text:"اضغطي برا الصورة علشان تقفلي.",
    extraHtml:`<div class="lightImg"><img src="${src}" alt="memory" onerror="this.parentElement.innerHTML='<div style=&quot;padding:12px&quot; class=&quot;small&quot;>الصورة مش موجودة</div>'"></div>`,
    actions:[{label:"إغلاق", secondary:true, onClick: closeModal}]
  });
}

function renderGallery(){
  const g=$("gallery"); g.innerHTML="";
  IMAGES.forEach(src=>{
    const ph=document.createElement("div");
    ph.className="ph";
    const img=document.createElement("img");
    img.src=src; img.alt="memory"; img.loading="lazy";
    img.onerror=()=>{ img.remove(); ph.innerHTML="<div style='padding:10px' class='small'>حط صورة هنا</div>"; };
    ph.appendChild(img);
    ph.addEventListener("click", ()=>openImageLightbox(src));
    g.appendChild(ph);
  });
}

// ========= Engagement Album =========
function seqList(dir, count, ext){
  const arr = [];
  for(let i=1;i<=count;i++) arr.push(`${dir}${i}.${ext}`);
  return arr;
}

const ENG_IMAGES = seqList(ENG_PHOTOS_DIR, ENG_PHOTOS_COUNT, "jpg");
const ENG_VIDEOS = seqList(ENG_VIDEOS_DIR, ENG_VIDEOS_COUNT, "mp4");

function renderEngagementAlbum(){
  $("engPhotosCount").textContent = ENG_PHOTOS_COUNT;
  $("engVideosCount").textContent = ENG_VIDEOS_COUNT;

  const g=$("engGallery"); g.innerHTML="";
  ENG_IMAGES.forEach(src=>{
    const ph=document.createElement("div");
    ph.className="ph";
    const img=document.createElement("img");
    img.src=src; img.alt="engagement"; img.loading="lazy";
    img.onerror=()=>{ img.remove(); ph.innerHTML="<div style='padding:10px' class='small'>صورة مش موجودة</div>"; };
    ph.appendChild(img);
    ph.addEventListener("click", ()=>openImageLightbox(src));
    g.appendChild(ph);
  });

  const v=$("engVideos"); v.innerHTML="";
  ENG_VIDEOS.forEach(src=>{
    const box=document.createElement("div");
    box.className="vItem";
    box.innerHTML = `
      <video controls preload="metadata">
        <source src="${src}" type="video/mp4">
      </video>
    `;
    v.appendChild(box);
  });
}

// ========= Audio =========
const audio = $("bgm");
const audioBtn = $("audioBtn");
let audioOn = false;

async function tryAutoPlay(){
  try{
    await audio.play();
    audioOn = true;
    audioBtn.textContent = "⏸️ إيقاف";
    return true;
  }catch(e){
    audioOn = false;
    audioBtn.textContent = "🔊 تشغيل";
    return false;
  }
}

audioBtn.addEventListener("click", async ()=>{
  try{
    if(!audioOn){
      await audio.play(); audioOn=true; audioBtn.textContent="⏸️ إيقاف";
    }else{
      audio.pause(); audioOn=false; audioBtn.textContent="🔊 تشغيل";
    }
  }catch(e){
    openModal({title:"الصوت", text:"المتصفح منع التشغيل… اضغطي تاني.", actions:[{label:"تمام", onClick:closeModal}]});
  }
});

$("audioTryBtn").addEventListener("click", async ()=>{
  const ok = await tryAutoPlay();
  openModal({
    title: ok ? "اشتغل ❤️" : "لسه مقفول 😅",
    text: ok ? "تمام… الموسيقى شغالة." : "بعض الموبايلات لازم لمسة بعد الدخول.",
    actions:[{label:"حاضر", onClick:closeModal}]
  });
});

// ========= Counters =========
function updateTogetherCounter(){
  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - TOGETHER_START.getTime());
  const totalMin = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMin / (60*24));
  const hours = Math.floor((totalMin - days*60*24) / 60);
  const mins = totalMin % 60;
  $("togetherCounter").textContent = `${days} يوم • ${hours} ساعة • ${mins} دقيقة`;
}

// ========= Locks (Trusted Time) =========
function isUnlockedUTC(){
  if(!hasTrustedTime) return false;
  return nowMs() >= UNLOCK_UTC;
}

function isRamadanUnlocked(){
  if(!hasTrustedTime) return false;
  return nowMs() >= EID_UNLOCK_UTC;
}

function updateLockStatus(){
  const s=$("lockStatus");
  if(isUnlockedUTC()){
    s.textContent="✅ الرسالة متاحة دلوقتي";
    return;
  }
  const diff = UNLOCK_UTC - nowMs();
  const totalMin = Math.max(0, Math.floor(diff/60000));
  const days = Math.floor(totalMin/(60*24));
  const hours = Math.floor((totalMin - days*24*60)/60);
  const mins = totalMin % 60;
  s.textContent = `🔒 فاضل ${days} يوم ${hours} ساعة ${mins} دقيقة`;
}

function updateRamadanStatus(){
  const s=$("ramadanStatus");
  if(isRamadanUnlocked()){
    s.textContent="✅ الرسالة متاحة دلوقتي";
    return;
  }
  const diff = EID_UNLOCK_UTC - nowMs();
  const totalMin = Math.max(0, Math.floor(diff/60000));
  const days = Math.floor(totalMin/(60*24));
  const hours = Math.floor((totalMin - days*24*60)/60);
  const mins = totalMin % 60;
  s.textContent = `🔒 فاضل ${days} يوم ${hours} ساعة ${mins} دقيقة`;
}

// ========= LOGIN LOGIC =========
let wrongCount = 0;
let isBroken = false;

const wrongReplies = [
  "غلط… بس أنا مبسوط إنك بتحاولي 😄",
  "لا لا… دي مش كلمة السر… بس كده كده إنتي صح ❤️",
  "قربتي… (يمكن) 😌",
  "مش دي… بس مش هزعل منك أبداً 😉",
  "خلاص… اتكسرت 💔 (بهزر… هديكي فرصة كمان 🙈)"
];

function setBrokenMode(){
  isBroken = true;
  document.body.classList.add("broken");
}

function enter(){
  const v = $("pw").value.trim();

  // ✅ “أنا كمان بحبك…” فقط لو كتبت بحبك/احبك (ومش كلمة السر)
  if(LOVE_WORDS.includes(v) && !PASSWORDS.includes(v)){
    wrongCount++;
    openModal({
      title:"🙈",
      text:"أنا كمان بحبك… بس كلمة السر غلط 😌",
      actions:[{label:"أوكي", onClick:closeModal}]
    });
    if(wrongCount >= 5) setBrokenMode();
    return;
  }

  // ✅ نجاح
  if(PASSWORDS.includes(v)){
    hide($("login"));
    show($("app"));
    $("heroTitle").textContent = `يا ${PERSON_NAME} ✨`;
    spawnHearts();
    renderMessages();
    renderGallery();
    renderEngagementAlbum();
    renderTimeline();
    updateTogetherCounter();

    // ✅ وقت موثوق قبل القفل
    fetchTrustedNow().then((ok)=>{
      if(!ok){
        $("lockStatus").textContent = "🔒 مش قادر أتحقق من الوقت (اتصال الإنترنت)… الرسائل المقفولة هتفضل مقفولة";
        $("ramadanStatus").textContent = "🔒 مش قادر أتحقق من الوقت (اتصال الإنترنت)… الرسائل المقفولة هتفضل مقفولة";
      }else{
        updateLockStatus();
        updateRamadanStatus();
      }
    });

    setInterval(updateTogetherCounter, 30000);
    setInterval(updateLockStatus, 30000);
    setInterval(updateRamadanStatus, 30000);

    if(isBroken) document.body.classList.add("broken");

    tryAutoPlay().then((ok)=>{
      if(!ok){
        openModal({title:"🎵", text:"لو الموسيقى مش شغالة اضغطي زر (تشغيل) فوق.", actions:[{label:"تمام", onClick:closeModal}]});
      }
    });
    return;
  }

  // ❌ غلط
  wrongCount++;
  const msg = wrongReplies[Math.min(wrongCount-1, wrongReplies.length-1)];
  openModal({ title:"🙈", text: msg, actions:[{label:"أوكي", onClick:closeModal}] });

  if(wrongCount >= 5){
    setBrokenMode();
    openModal({
      title:"💔",
      text:"اتكسرت… بس لسه بحبك 😅 جربي تاني لو فاكرة كلمة السر 😉",
      actions:[{label:"حاضر", onClick:closeModal}]
    });
  }
}

$("enterBtn").addEventListener("click", enter);
$("pw").addEventListener("keydown", (e)=>{ if(e.key==="Enter") enter(); });

// ========= 14/2 EARLY REVEAL =========
let finalPressCount = 0;
let earlyRevealed = false;

function maskText(text){
  const n = Math.max(20, Math.floor(text.length * 0.35));
  const head = text.slice(0, n).trim();
  const tail = text.slice(n).trim();
  const blocks = tail.replace(/[^\n]/g, "█");
  return { head, blocks };
}

function showEarlyReveal(){
  const box = $("earlyReveal");
  const { head, blocks } = maskText(FINAL_MESSAGE);
  box.style.display = "block";
  box.innerHTML = `
    <div style="font-weight:900;margin-bottom:8px;color:rgba(244,246,255,.92)">جزء من الرسالة ❤️</div>
    <div>${head}</div>
    <div class="blur" style="margin-top:10px">${blocks}</div>
    <div class="small" style="margin-top:10px">الباقي يتفتح يوم 14/2 😉</div>
  `;
}

function askLoveWordForEarly(){
  const inputId = "loveInput";
  openModal({
    title:"لو مستعجلة 😄",
    text:"اكتبي كلمة نفسي أسمعها…",
    extraHtml:`<input id="${inputId}" type="password" placeholder="اكتبيها هنا" autocomplete="off"/>`,
    actions:[
      {label:"تأكيد", onClick: ()=>{
        const v = $(inputId).value.trim();
        if(LOVE_WORDS.includes(v)){
          closeModal();
          openModal({
            title:"❤️",
            text:"أنا كمان بحبك… وهغششك حبة 😌",
            actions:[{label:"تمام", onClick:()=>{
              closeModal();
              if(!earlyRevealed){ earlyRevealed = true; showEarlyReveal(); }
            }}]
          });
        }else{
          openModal({title:"🙈", text:"مش دي 😅", actions:[{label:"إغلاق", secondary:true, onClick:closeModal}]});
        }
      }},
      {label:"إغلاق", secondary:true, onClick:closeModal}
    ]
  });
}

$("openFinalBtn").addEventListener("click", ()=>{
  finalPressCount++;

  if(isUnlockedUTC()){
    if(isBroken) document.body.classList.add("broken");
    $("finalBox").style.display="block";
    $("finalBox").textContent = FINAL_MESSAGE;
    return;
  }

  if(finalPressCount > 2){
    askLoveWordForEarly();
    return;
  }
  openModal({title:"لسه بدري ❤️", text:"الرسالة هتتفتح يوم 14/2", actions:[{label:"تمام", onClick:closeModal}]});
});

// ========= Ramadan Lock =========
$("openRamadanBtn").addEventListener("click", ()=>{
  if(isRamadanUnlocked()){
    $("ramadanBox").style.display="block";
    $("ramadanBox").textContent = RAMADAN_MESSAGE;
    return;
  }
  openModal({title:"🌙", text:"لسه بدري… دي هتتفتح يوم العيد 😉", actions:[{label:"تمام", onClick:closeModal}]});
});

$("modalBack").addEventListener("click", (e)=>{ if(e.target.id==="modalBack") closeModal(); });