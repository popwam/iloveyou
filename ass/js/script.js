// ========= CONFIG =========
const PERSON_NAME = "رنوشتي";
const PASSWORDS = ["بحبك يا ممدوح", "بحبك يا دوو"];
const LOVE_WORDS = ["بحبك", "احبك"];

const UNLOCK_UTC = Date.UTC(2026, 1, 14, 0, 0, 0);
const EID_UNLOCK_UTC = Date.UTC(2026, 2, 20, 0, 0, 0);

const TOGETHER_START = new Date(2026, 0, 23, 0, 0, 0);

const MODE_DOOU = "doou";
const MODE_MAMDOUH = "mamdouh";
let currentMode = MODE_DOOU;

const SONG_DOOU = "ass/song/love.mp3";
const SONG_MAMDOUH = "ass/song/ramadan.mp3";

const MESSAGES_DOOU = [
  "يا رنوشتي… إنتي حتة مني ❤️",
  "ضحكتك بتصلّح يومي كله ✨",
  "أنا بحب تفاصيلك… حتى سكوتك 🤍",
  "وجودك جنبي أمان… مش مجرد حب 🫶",
  "كل مرة بشوفك فيها… بحس إني كسبت الدنيا 💍",
  "أنا مش بس بحبك… أنا مطمّن بيكي ❤️",
  "إيدك في إيدي = وعد إني عمري ما هسيبك 🤝",
  "إنتي رزقي الحلو في الدنيا دي 🌸",
  "أنا فخور بيكي… وبينا… وبكل خطوة ✨",
  "تعالي نكمّل العمر سوا… يوم بيوم 🤍",
];

const MESSAGES_MAMDOUH = [
  "اللهم اجعل بيننا مودة ورحمة 🤲",
  "ربنا يتمم لنا على خير ويبارك لنا 🌙",
  "اللهم ارزقنا السكينة والرضا 💛",
  "اللهم احفظها لي واحفظني لها 🤍",
  "ربنا يكتب لنا الخير حيث كان ثم يرضينا به 🤲",
  "اللهم اجعل بيتنا عامرًا بالقرآن والرحمة 🕌",
  "يا رب اكتب لنا فرحة العيد مع بعض 🤍",
];

const TIMELINE = [
  { date: "23/1", text: "أول لقاء بينا 💫" },
  { date: "12/2", text: "اتفقنا إني هركّبك معايا العربية… وكنت صادق ✨" },
  { date: "12/2", text: "جيتلك نص الليل بهدية… دي كانت حجة بس الحقيقة كنت عاوز أشوفك ❤️" },
  { date: "13/2", text: "أول مرة أقولك بحبك مباشرة… وردك خلاني أحس إني بحلم 🥺" },
  { date: "13/2", text: "ركبتي معايا العربية… وأختك من بابا معانا 🚗" },
  { date: "13/2", text: "أختك معايا المنصورة زي ما وعدتك ✅" },
  { date: "14/2", text: "لبستك الدبلة في اليمين… كنت فرحان ومكسوف 💍❤️" },
];

// ✅ fallback لو نسيت media.js
const IMAGES_FALLBACK = [
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
يا ${PERSON_NAME} 🌙🤍
رمضان كريم…
استنيني في العيد… هقولك كلام يفرّح قلبك 🎁
`.trim();

const EID_SECRET_WORD = "انت عيدي";

// ========= HELPERS =========
const $ = (id) => document.getElementById(id);
const show = (el) => el && el.classList.remove("hidden");
const hide = (el) => el && el.classList.add("hidden");
function on(id, event, handler, opts) {
  const el = $(id);
  if (!el) return;
  el.addEventListener(event, handler, opts);
}
function normalizeArabicSpaces(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}

// ========= TRUSTED TIME =========
let trustedOffsetMs = null;
let hasTrustedTime = false;

function nowMs() {
  return trustedOffsetMs === null ? Date.now() : Date.now() + trustedOffsetMs;
}

async function fetchTrustedNow() {
  const sources = [
    "https://worldtimeapi.org/api/ip",
    "https://timeapi.io/api/Time/current/zone?timeZone=Africa/Cairo",
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();

      const serverMs =
        typeof data.unixtime === "number"
          ? data.unixtime * 1000
          : data.dateTime
          ? Date.parse(data.dateTime)
          : NaN;

      if (Number.isFinite(serverMs)) {
        trustedOffsetMs = serverMs - Date.now();
        hasTrustedTime = true;
        return true;
      }
    } catch (e) {}
  }

  trustedOffsetMs = null;
  hasTrustedTime = false;
  return false;
}

// ========= MEDIA (from media.js) =========
function getMediaLists() {
  const m = window.MEDIA || null;

  if (m) {
    const generalImages = Array.isArray(m.general_images)
      ? m.general_images.map((x) => x.url).filter(Boolean)
      : [];

    const engImages = Array.isArray(m.images)
      ? m.images.map((x) => x.url).filter(Boolean)
      : [];

    // خد بس اللي ok=true
    const engVideos = Array.isArray(m.videos)
      ? m.videos.filter(v => v && v.ok !== false).map((x) => x.url).filter(Boolean)
      : [];

    return {
      generalImages: generalImages.length ? generalImages : IMAGES_FALLBACK,
      engImages,
      engVideos,
    };
  }

  return {
    generalImages: IMAGES_FALLBACK,
    engImages: [],
    engVideos: [],
  };
}

// ========= UI background =========
function spawnHearts(){
  const box = $("hearts");
  if(!box) return;

  box.innerHTML = "";

  const isRamadan = document.body.classList.contains("ramadan");

  if(isRamadan){
    // 🌙 هلالات
    for(let i=0;i<12;i++){
      const m = document.createElement("div");
      m.className = "moon";
      m.style.left = (Math.random()*100)+"vw";
      m.style.animationDuration = (7+Math.random()*10)+"s";
      m.style.animationDelay = (Math.random()*4)+"s";
      m.style.opacity = (0.12+Math.random()*0.16).toFixed(2);
      m.style.transform = `translateY(0) rotate(${(Math.random()*30-15).toFixed(0)}deg)`;
      box.appendChild(m);
    }

    // ⭐ نجوم
    for(let i=0;i<22;i++){
      const s = document.createElement("div");
      s.className = "star";
      s.style.left = (Math.random()*100)+"vw";
      s.style.animationDuration = (6+Math.random()*9)+"s";
      s.style.animationDelay = (Math.random()*5)+"s";
      s.style.opacity = (0.10+Math.random()*0.22).toFixed(2);
      box.appendChild(s);
    }

    return;
  }

  // ❤️ قلوب (الوضع العادي)
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
// ========= MODAL =========
function openModal({ title, text, extraHtml = "", actions = [] }) {
  $("mTitle").textContent = title || "";
  $("mText").innerHTML = text || "";
  $("mExtra").innerHTML = extraHtml || "";

  const a = $("mActions");
  a.innerHTML = "";
  actions.forEach((btn) => {
    const b = document.createElement("button");
    b.className = "btn" + (btn.secondary ? " secondary" : "");
    b.textContent = btn.label;
    b.onclick = () => btn.onClick();
    a.appendChild(b);
  });

  document.body.classList.add("modal-open");
  $("modalBack").style.display = "flex";
}

function closeModal() {
  document.body.classList.remove("modal-open");
  $("modalBack").style.display = "none";
}

function openImageLightbox(src) {
  openModal({
    title: "📸",
    text: "اضغطي برا الصورة علشان تقفلي.",
    extraHtml: `<div class="lightImg">
      <img src="${src}" alt="memory"
        onerror="this.parentElement.innerHTML='<div style=&quot;padding:12px&quot; class=&quot;small&quot;>الصورة مش موجودة</div>'">
    </div>`,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openVideoLightbox(src) {
  openModal({
    title: "🎥",
    text: "اضغطي برا الفيديو علشان تقفلي.",
    extraHtml: `<div class="lightImg">
      <video controls autoplay playsinline style="width:100%;height:auto;display:block;background:rgba(0,0,0,.25)">
        <source src="${src}" type="video/mp4">
      </video>
    </div>`,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

// ========= RENDERERS =========
function renderMessages(mode) {
  const wrap = $("msgs");
  if (!wrap) return;
  wrap.innerHTML = "";

  const list = mode === MODE_MAMDOUH ? MESSAGES_MAMDOUH : MESSAGES_DOOU;

  list.forEach((t) => {
    const d = document.createElement("div");
    d.className = "msg";
    d.textContent = t;
    wrap.appendChild(d);
  });
}

function renderTimeline() {
  const t = $("timeline");
  if (!t) return;
  t.innerHTML = "";
  TIMELINE.forEach((item) => {
    const d = document.createElement("div");
    d.className = "titem";
    d.innerHTML = `<div class="tdate">${item.date}</div>
      <div style="margin-top:6px;color:rgba(244,246,255,.85)">${item.text}</div>`;
    t.appendChild(d);
  });
}

function renderGallery(id, images) {
  const g = $(id);
  if (!g) return;
  g.innerHTML = "";
  images.forEach((src) => {
    const ph = document.createElement("div");
    ph.className = "ph";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "memory";
    img.loading = "lazy";
    img.onerror = () => {
      img.remove();
      ph.innerHTML = "<div style='padding:10px' class='small'>الصورة مش موجودة</div>";
    };
    ph.appendChild(img);
    ph.addEventListener("click", () => openImageLightbox(src));
    g.appendChild(ph);
  });
}

function renderEngagement(engImages, engVideos) {
  const photosCountEl = $("engPhotosCount");
  const videosCountEl = $("engVideosCount");
  if (photosCountEl) photosCountEl.textContent = engImages.length;
  if (videosCountEl) videosCountEl.textContent = engVideos.length;

  renderGallery("engGallery", engImages);

  const vWrap = $("engVideos");
  if (!vWrap) return;
  vWrap.innerHTML = "";

  engVideos.forEach((src) => {
    const box = document.createElement("div");
    box.className = "vThumb";
    box.innerHTML = `
      <video muted playsinline preload="metadata">
        <source src="${src}" type="video/mp4">
      </video>
    `;

    const vid = box.querySelector("video");
    if (vid) {
      vid.addEventListener("loadeddata", () => {
        try { vid.currentTime = 0.2; } catch (e) {}
      });
    }

    box.addEventListener("click", () => openVideoLightbox(src));
    vWrap.appendChild(box);
  });
}

// ========= Audio =========
let audioOn = false;

function setSongByMode(mode) {
  const audio = $("bgm");
  if (!audio) return;

  const src = mode === MODE_MAMDOUH ? SONG_MAMDOUH : SONG_DOOU;
  const sourceEl = audio.querySelector("source");
  const currentSrc = sourceEl?.getAttribute("src");
  if (currentSrc === src) return;

  audio.pause();
  audioOn = false;

  if (sourceEl) sourceEl.setAttribute("src", src);
  audio.load();

  const audioBtn = $("audioBtn");
  if (audioBtn) audioBtn.textContent = "🔊 تشغيل";
}

async function tryAutoPlay() {
  const audio = $("bgm");
  const audioBtn = $("audioBtn");
  if (!audio || !audioBtn) return false;

  try {
    await audio.play();
    audioOn = true;
    audioBtn.textContent = "⏸️ إيقاف";
    return true;
  } catch (e) {
    audioOn = false;
    audioBtn.textContent = "🔊 تشغيل";
    return false;
  }
}

// ========= Counters =========
function updateTogetherCounter() {
  const el = $("togetherCounter");
  if (!el) return;

  const now = new Date();
  const diffMs = Math.max(0, now.getTime() - TOGETHER_START.getTime());
  const totalMin = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin - days * 60 * 24) / 60);
  const mins = totalMin % 60;
  el.textContent = `${days} يوم • ${hours} ساعة • ${mins} دقيقة`;
}

// ========= Locks =========
function isUnlockedUTC() {
  return true; // 14/2 مفتوحة دايمًا
}

function isEidUnlocked() {
  if (!hasTrustedTime) return false;
  return nowMs() >= EID_UNLOCK_UTC;
}

function updateLockStatus() {
  const s = $("lockStatus");
  if (!s) return;
  s.textContent = "✅ الرسالة متاحة دلوقتي";
}

function updateRamadanStatus() {
  const s = $("ramadanStatus");
  if (!s) return;

  if (!hasTrustedTime) {
    s.textContent = "🔒 جارِ التحقق من الوقت…";
    return;
  }

  if (isEidUnlocked()) {
    s.textContent = "✅ الرسالة متاحة دلوقتي";
    return;
  }

  const diff = EID_UNLOCK_UTC - nowMs();
  const totalMin = Math.max(0, Math.floor(diff / 60000));
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin - days * 24 * 60) / 60);
  const mins = totalMin % 60;
  s.textContent = `🔒 فاضل ${days} يوم ${hours} ساعة ${mins} دقيقة`;
}

// ========= LOGIN =========
let wrongCount = 0;

function detectModeFromPassword(pw) {
  const v = normalizeArabicSpaces(pw);
  if (v === "بحبك يا ممدوح") return MODE_MAMDOUH;
  return MODE_DOOU;
}

function enter() {
  const raw = $("pw")?.value ?? "";
  const v = normalizeArabicSpaces(raw);

  if (LOVE_WORDS.includes(v) && !PASSWORDS.includes(v)) {
    wrongCount++;
    openModal({
      title: "🙈",
      text: "أنا كمان بحبك… بس كلمة السر غلط 😌",
      actions: [{ label: "أوكي", onClick: closeModal }],
    });
    return;
  }

  if (PASSWORDS.includes(v)) {
    currentMode = detectModeFromPassword(v);

    hide($("login"));
    show($("app"));

    $("heroTitle").textContent = `يا ${PERSON_NAME} ✨`;
    $("heroSub").textContent =
      currentMode === MODE_MAMDOUH
        ? "رمضان كريم… وفي مفاجآت مقفولة لحد ميعادها 🌙"
        : "في هنا شوية كلام… شوية صور… وفي الآخر رسالة ❤️";

    setSongByMode(currentMode);

    document.body.classList.toggle("ramadan", currentMode === MODE_MAMDOUH);
    spawnHearts();
    renderMessages(currentMode);

    const media = getMediaLists();
    renderGallery("gallery", media.generalImages);
    renderEngagement(media.engImages, media.engVideos);

    renderTimeline();
    updateTogetherCounter();

    // ✅ رسالة 14/2 ظاهرة مباشرة
    const fb = $("finalBox");
    if (fb) {
      fb.style.display = "block";
      fb.textContent = FINAL_MESSAGE;
    }
    updateLockStatus();

    fetchTrustedNow().then((ok) => {
      if (!ok) {
        const rs = $("ramadanStatus");
        if (rs) rs.textContent = "🔒 مش قادر أتحقق من الوقت (النت)… الرسالة هتفضل مقفولة";
      } else {
        updateRamadanStatus();
      }
    });

    setInterval(updateTogetherCounter, 30000);
    setInterval(updateRamadanStatus, 30000);

    tryAutoPlay();
    return;
  }

  wrongCount++;
  openModal({
    title: "🙈",
    text: "كلمة السر غلط 😅 جربي تاني",
    actions: [{ label: "تمام", onClick: closeModal }],
  });
}

// ========= “انت عيدي” بعد 3 ضغطات =========
let ramadanPressCount = 0;

function maskText(text) {
  const n = Math.max(18, Math.floor(text.length * 0.35));
  const head = text.slice(0, n).trim();
  const tail = text.slice(n).trim();
  const blocks = tail.replace(/[^\n]/g, "█");
  return { head, blocks };
}

function showEidTeaser() {
  const box = $("ramadanBox");
  if (!box) return;

  const { head, blocks } = maskText(RAMADAN_MESSAGE);
  box.style.display = "block";
  box.innerHTML = `
    <div style="font-weight:900;margin-bottom:8px;color:rgba(244,246,255,.92)">جزء من الرسالة 🌙</div>
    <div>${head}</div>
    <div class="blur" style="margin-top:10px">${blocks}</div>
    <div class="small" style="margin-top:10px">الباقي يتفتح يوم العيد 😉</div>
  `;
}

function askEidSecretWord() {
  const inputId = "eidInput";
  openModal({
    title: "🎁 لو مستعجلة 😄",
    text: "اكتبي كلمة… هتفتحلك جزء من رسالة العيد 😉",
    extraHtml: `<input id="${inputId}" type="password" placeholder="اكتبيها هنا" autocomplete="off"/>`,
    actions: [
      {
        label: "تأكيد",
        onClick: () => {
          const v = normalizeArabicSpaces($(inputId)?.value ?? "");
          if (v === EID_SECRET_WORD) {
            closeModal();
            showEidTeaser();
          } else {
            openModal({
              title: "🙈",
              text: "مش هي دي 😅",
              actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
            });
          }
        },
      },
      { label: "إغلاق", secondary: true, onClick: closeModal },
    ],
  });
}

// ========= DOM Ready =========
document.addEventListener("DOMContentLoaded", () => {
  on("audioBtn", "click", async () => {
    const audio = $("bgm");
    const audioBtn = $("audioBtn");
    if (!audio || !audioBtn) return;

    try {
      if (!audioOn) {
        await audio.play();
        audioOn = true;
        audioBtn.textContent = "⏸️ إيقاف";
      } else {
        audio.pause();
        audioOn = false;
        audioBtn.textContent = "🔊 تشغيل";
      }
    } catch (e) {
      openModal({
        title: "الصوت",
        text: "المتصفح منع التشغيل… اضغطي تاني.",
        actions: [{ label: "تمام", onClick: closeModal }],
      });
    }
  });

  on("enterBtn", "click", enter);
  on("pw", "keydown", (e) => {
    if (e.key === "Enter") enter();
  });

  // زر رسالة العيد
  on("openRamadanBtn", "click", () => {
    if (isEidUnlocked()) {
      const b = $("ramadanBox");
      if (b) {
        b.style.display = "block";
        b.textContent = RAMADAN_MESSAGE;
      }
      return;
    }

    ramadanPressCount++;

    if (ramadanPressCount < 3) {
      openModal({
        title: "🌙",
        text: "لسه بدري… دي هتتفتح يوم العيد 😉",
        actions: [{ label: "تمام", onClick: closeModal }],
      });
      return;
    }

    askEidSecretWord();
  });

  on("modalBack", "click", (e) => {
    if (e.target && e.target.id === "modalBack") closeModal();
  });
});