// ========= CONFIG =========
const PERSON_NAME = "رنوشتي";

// ✅ كلمتين سر
const PASSWORDS = ["بحبك يا ممدوح", "بحبك يا دوو"];

// لو كتبت بحبك/احبك يظهر رد رومانسي
const LOVE_WORDS = ["بحبك","احبك"];

// ✅ فتح رسالة الخطوبة (14/2) - وقت موثوق
const UNLOCK_UTC = Date.UTC(2026, 1, 14, 0, 0, 0);

// ✅ فتح رسالة رمضان في العيد (تقدر تغيره)
const EID_UNLOCK_UTC = Date.UTC(2026, 2, 20, 0, 0, 0);

// together from 23/1/2026
const TOGETHER_START = new Date(2026, 0, 23, 0, 0, 0);

// ✅ مودين حسب كلمة السر
const MODE_DOOU = "doou";       // رومانسي
const MODE_MAMDOUH = "mamdouh"; // رمضاني
let currentMode = MODE_DOOU;

// ✅ أغاني حسب الوضع (غير الأسماء/المسارات كما تحب)
const SONG_DOOU = "ass/song/love.mp3";
const SONG_MAMDOUH = "ass/song/ramadan.mp3";

// ✅ رسائل حسب الوضع
const MESSAGES_DOOU = [
  "يا رنوشتي… إنتي حتة مني ❤️",
  "ضحكتك بتصلّح يومي كله ✨",
  "الخطوبة كانت حلم… وبقت حقيقة 💍",
  "تعالي نكمل العمر سوا 🤍"
];

const MESSAGES_MAMDOUH = [
  "اللهم اجعل بيننا مودة ورحمة 🤲",
  "ربنا يتمم لنا على خير ويبارك لنا 🌙",
  "اللهم ارزقنا السكينة والرضا 💛",
  "ربنا يحفظك ويجعل أيامنا كلها خير ✨"
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

// ✅ صور عامة
const IMAGES = [
  "ass/img/1.png","ass/img/2.png","ass/img/3.jpeg","ass/img/4.jpeg",
  "ass/img/5.jpeg","ass/img/6.jpeg","ass/img/7.jpeg"
];

// ✅ ألبوم الخطوبة (حالياً 66 صورة)
const ENG_PHOTOS_COUNT = 66;
const ENG_VIDEOS_COUNT = 13;

const ENG_PHOTOS_DIR = "ass/engagement/photos/";
const ENG_VIDEOS_DIR = "ass/engagement/videos/";

// امتداد الصور (غيره لـ avif لما تحوّل)
const ENG_PHOTOS_EXT = "avif";

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
function on(id, event, handler, opts){
  const el = $(id);
  if(!el) return;
  el.addEventListener(event, handler, opts);
}
function normalizeArabicSpaces(s){
  return String(s || "").replace(/\s+/g, " ").trim();
}


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
  if(!box) return;
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

function renderMessages(mode){
  const wrap = $("msgs");
  if(!wrap) return;
  wrap.innerHTML = "";

  const list = (mode === MODE_MAMDOUH) ? MESSAGES_MAMDOUH : MESSAGES_DOOU;

  list.forEach((t)=>{
    const d = document.createElement("div");
    d.className = "msg";
    d.textContent = t;
    wrap.appendChild(d);
  });
}

function renderTimeline(){
  const t=$("timeline");
  if(!t) return;
  t.innerHTML="";
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
  const g=$("gallery");
  if(!g) return;
  g.innerHTML="";
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


// ========= Engagement Album (Slider) =========
function seqList(dir, count, ext){
  const arr = [];
  for(let i=1;i<=count;i++) arr.push(`${dir}${i}.${ext}`);
  return arr;
}

const ENG_IMAGES = seqList(ENG_PHOTOS_DIR, ENG_PHOTOS_COUNT, ENG_PHOTOS_EXT);
const ENG_VIDEOS = seqList(ENG_VIDEOS_DIR, ENG_VIDEOS_COUNT, "mp4");

function renderEngagementAlbum(){
  const photosCountEl = $("engPhotosCount");
  const videosCountEl = $("engVideosCount");
  if(photosCountEl) photosCountEl.textContent = ENG_PHOTOS_COUNT;
  if(videosCountEl) videosCountEl.textContent = ENG_VIDEOS_COUNT;

  const track = $("engTrack");
  const dots = $("engDots");
  const prevBtn = $("engPrev");
  const nextBtn = $("engNext");

  if(!track || !dots || !prevBtn || !nextBtn) return;

  track.innerHTML = "";
  dots.innerHTML = "";

  // Slides
  ENG_IMAGES.forEach((src, idx)=>{
    const slide = document.createElement("div");
    slide.className = "sSlide";
    slide.innerHTML = `
      <img src="${src}" alt="engagement" loading="lazy"
        onerror="this.outerHTML='<div class=small style=padding:14px>الصورة مش موجودة</div>'" />
    `;
    slide.addEventListener("click", ()=>openImageLightbox(src));
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "sDot" + (idx===0 ? " active":"");
    dot.addEventListener("click", ()=>goToSlide(idx));
    dots.appendChild(dot);
  });

  let currentIndex = 0;

  function updateUI(){
    // سلايدر طبيعي: 0% ثم -100% ثم -200% ...
    track.style.transform = `translateX(${-currentIndex * 100}%)`;

    [...dots.children].forEach((d,i)=>{
      d.classList.toggle("active", i===currentIndex);
    });
  }

  function goToSlide(i){
    currentIndex = Math.max(0, Math.min(ENG_IMAGES.length-1, i));
    updateUI();
  }

  prevBtn.onclick = ()=>goToSlide(currentIndex - 1);
  nextBtn.onclick = ()=>goToSlide(currentIndex + 1);

  // Swipe
  const viewport = track.parentElement;
  let startX = 0;
  let isDown = false;

  viewport.addEventListener("touchstart", (e)=>{
    isDown = true;
    startX = e.touches[0].clientX;
  }, {passive:true});

  viewport.addEventListener("touchend", (e)=>{
    if(!isDown) return;
    isDown = false;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if(Math.abs(dx) < 30) return;

    // سحب يمين => السابق، سحب شمال => التالي
    if(dx > 0) goToSlide(currentIndex - 1);
    else goToSlide(currentIndex + 1);
  }, {passive:true});

  updateUI();

  // Videos list
  const v = $("engVideos");
  if(v){
    v.innerHTML="";
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
}


// ========= Audio =========
let audioOn = false;

function setSongByMode(mode){
  const audio = $("bgm");
  if(!audio) return;

  const src = (mode === MODE_MAMDOUH) ? SONG_MAMDOUH : SONG_DOOU;

  const sourceEl = audio.querySelector("source");
  const currentSrc = sourceEl?.getAttribute("src");
  if(currentSrc === src) return;

  audio.pause();
  audioOn = false;

  if(sourceEl) sourceEl.setAttribute("src", src);
  audio.load();

  const audioBtn = $("audioBtn");
  if(audioBtn) audioBtn.textContent = "🔊 تشغيل";
}

async function tryAutoPlay(){
  const audio = $("bgm");
  const audioBtn = $("audioBtn");
  if(!audio || !audioBtn) return false;

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


// ========= Counters =========
function updateTogetherCounter(){
  const el = $("togetherCounter");
  if(!el) return;

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - TOGETHER_START.getTime());
  const totalMin = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMin / (60*24));
  const hours = Math.floor((totalMin - days*60*24) / 60);
  const mins = totalMin % 60;
  el.textContent = `${days} يوم • ${hours} ساعة • ${mins} دقيقة`;
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
  if(!s) return;

  if(!hasTrustedTime){
    s.textContent = "🔒 جارِ التحقق من الوقت…";
    return;
  }

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
  if(!s) return;

  if(!hasTrustedTime){
    s.textContent = "🔒 جارِ التحقق من الوقت…";
    return;
  }

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

function detectModeFromPassword(pw){
  const v = normalizeArabicSpaces(pw);
  if(v === "بحبك يا ممدوح") return MODE_MAMDOUH;
  return MODE_DOOU;
}

function enter(){
  const raw = $("pw")?.value ?? "";
  const v = normalizeArabicSpaces(raw);

  // ✅ لو كتبت بحبك/احبك (ومش كلمة السر)
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
    currentMode = detectModeFromPassword(v);

    hide($("login"));
    show($("app"));

    $("heroTitle").textContent = `يا ${PERSON_NAME} ✨`;
    $("heroSub").textContent = (currentMode === MODE_MAMDOUH)
      ? "رمضان كريم… وفي مفاجآت مقفولة لحد ميعادها 🌙"
      : "في هنا شوية كلام… شوية صور… وفي الآخر رسالة ❤️";

    // تشغيل مود الأغاني/الرسائل
    setSongByMode(currentMode);

    spawnHearts();
    renderMessages(currentMode);
    renderGallery();
    renderEngagementAlbum();
    renderTimeline();
    updateTogetherCounter();

    // ✅ وقت موثوق قبل القفل
    fetchTrustedNow().then((ok)=>{
      if(!ok){
        const ls = $("lockStatus");
        const rs = $("ramadanStatus");
        if(ls) ls.textContent = "🔒 مش قادر أتحقق من الوقت (اتصال الإنترنت)… الرسائل المقفولة هتفضل مقفولة";
        if(rs) rs.textContent = "🔒 مش قادر أتحقق من الوقت (اتصال الإنترنت)… الرسائل المقفولة هتفضل مقفولة";
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
        openModal({
          title:"🎵",
          text:"لو الموسيقى مش شغالة اضغطي زر (تشغيل) فوق.",
          actions:[{label:"تمام", onClick:closeModal}]
        });
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
  if(!box) return;
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
        const v = normalizeArabicSpaces($(inputId)?.value ?? "");
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


// ========= DOM Ready =========
document.addEventListener("DOMContentLoaded", ()=>{

  // ✅ audio button (داخل #app)
  on("audioBtn", "click", async ()=>{
    const audio = $("bgm");
    const audioBtn = $("audioBtn");
    if(!audio || !audioBtn) return;

    try{
      if(!audioOn){
        await audio.play();
        audioOn = true;
        audioBtn.textContent="⏸️ إيقاف";
      }else{
        audio.pause();
        audioOn = false;
        audioBtn.textContent="🔊 تشغيل";
      }
    }catch(e){
      openModal({
        title:"الصوت",
        text:"المتصفح منع التشغيل… اضغطي تاني.",
        actions:[{label:"تمام", onClick:closeModal}]
      });
    }
  });

  // ✅ login
  on("enterBtn", "click", enter);

  on("pw", "keydown", (e)=>{
    if(e.key === "Enter") enter();
  });

  // ✅ final
  on("openFinalBtn", "click", ()=>{
    finalPressCount++;

    if(isUnlockedUTC()){
      if(isBroken) document.body.classList.add("broken");
      const b = $("finalBox");
      if(b){
        b.style.display="block";
        b.textContent = FINAL_MESSAGE;
      }
      return;
    }

    if(finalPressCount > 2){
      askLoveWordForEarly();
      return;
    }

    openModal({
      title:"لسه بدري ❤️",
      text:"الرسالة هتتفتح يوم 14/2",
      actions:[{label:"تمام", onClick:closeModal}]
    });
  });

  // ✅ ramadan
  on("openRamadanBtn", "click", ()=>{
    if(isRamadanUnlocked()){
      const b = $("ramadanBox");
      if(b){
        b.style.display="block";
        b.textContent = RAMADAN_MESSAGE;
      }
      return;
    }
    openModal({
      title:"🌙",
      text:"لسه بدري… دي هتتفتح يوم العيد 😉",
      actions:[{label:"تمام", onClick:closeModal}]
    });
  });

  // ✅ modal close
  on("modalBack", "click", (e)=>{
    if(e.target && e.target.id==="modalBack") closeModal();
  });

});