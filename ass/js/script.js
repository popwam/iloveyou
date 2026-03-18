// ========= CONFIG =========
const PERSON_NAME = "رنوشتي";

const MODE_DOOU = "doou";
const MODE_MAMDOUH = "mamdouh";
const MODE_EID = "eid";

const PASSWORD_MAP = {
  "بحبك يا دوو": MODE_DOOU,
  "بحبك يا ممدوح": MODE_MAMDOUH,
  "انت عمري": MODE_EID,
};

let currentMode = MODE_DOOU;

const TOGETHER_START = new Date(2026, 0, 23, 0, 0, 0);

const SONG_DOOU = "ass/song/rana.mp3";
const SONG_MAMDOUH = "ass/song/rana.m4a";
const SONG_EID = "ass/song/rana.mp3";

const MESSAGES_DOOU = [
  "يا رنوشتي… لو زعلتك يوم فده آخر حاجة كنت أتمنى أعملها، لأن زعلك بيوجع قلبي قبلك ❤️",
  "والله ما بقدر أشوفك زعلانة مني… بحس إن الدنيا كلها مخاصماني معاكي 🤍",
  "أنا عارف إني غلطت… بس اللي أعرفه أكتر إني بحبك ومش مستحمل البعد بينا ✨",
  "إنتي مش بس خطيبتي… إنتي راحتي، وزعلك بيخليني حاسس إني ضايعت الأمان بتاعي 🫶",
  "لو الكلام اللي حصل زعلك، سامحيني… أنا قلبي عمره ما يقصد يوجع قلبك 🌸",
  "أنا بحبك بجد يا رنا… وأي حاجة تزعل بينا أنا أول واحد يصلّحها 💍",
  "اللحظات الحلوة اللي بينا أكبر من أي زعل… وتعالي نرجع نضحك تاني 🤍",
  "إنتي أغلى عندي من أي كبرياء… ولو كلمة آسف هتريح قلبك فأنا بقولها من قلبي ❤️",
  "أنا مستني بس كلمة منك ترجعلي ابتسامتك… لأنها أغلى حاجة عندي ✨",
  "تعالي ننسى الزعل ده… ونرجع إحنا، أنا ورنوشتي اللي بحبها 🤍"
];

const MESSAGES_MAMDOUH = [
  "اللهم اجعل بيننا مودة ورحمة، ولا تجعل بين قلوبنا زعلًا أو بُعدًا 🤲",
  "ربنا يتمم لنا على خير ويجمع قلوبنا دائمًا على الحب والرضا 🌙",
  "اللهم ارزقنا السكينة مع بعض، واهدِ قلوبنا لما فيه الخير 💛",
  "اللهم احفظها لي، وقرّب بين قلوبنا مهما حصل 🤍",
  "ربنا يكتب لنا الخير حيث كان، ويجمعنا على الفرح بعد كل زعل 🤲",
  "اللهم اجعل بيتنا يومًا ما مليئًا بالحب والرحمة والطمأنينة 🕌",
  "يا رب اكتب لنا فرحة العيد مع بعض، وقرب كل المسافات بينا 🤍"
];

const MESSAGES_EID = [
  "كل سنة وإنتِ فرحتي اللي بتكمل أي عيد 🎉",
  "العيد بوجودك أحلى، والفرحة معاكي أكبر ❤️",
  "إنتِ مش بس ذكرى جميلة… إنتِ أجمل عيد جالي 🤍",
  "كل ضحكة منك في العيد بتساوي الدنيا كلها ✨",
  "نفسي كل أعيادي الجاية تكون وإنتِ فيها ومعايا 🫶",
  "العيد مش زينة بس… العيد إنتِ 🌙",
  "كل سنة وإنتِ أقرب حد لقلبي 💞"
];

const TIMELINE = [
  { date: "23/1/2026", text: "أول لقاء بينا 💫" },
  { date: "12/2/2026", text: "اتفقنا إني هركّبك معايا العربية… وكنت صادق ✨" },
  { date: "12/2/2026", text: "جيتلك نص الليل بهدية… دي كانت حجة بس الحقيقة كنت عاوز أشوفك ❤️" },
  { date: "13/2/2026", text: "أول مرة أقولك بحبك مباشرة… وردك خلاني أحس إني بحلم 🥺" },
  { date: "13/2/2026", text: "ركبتي معايا العربية… وأختك من بابا معانا 🚗" },
  { date: "13/2/2026", text: "أختك معايا المنصورة زي ما وعدتك ✅" },
  { date: "14/2/2026", text: "لبستك الدبلة في اليمين… كنت فرحان ومكسوف 💍❤️" },
  { date: "19/2/2026", text: "بداية أول رمضان مع بعض… وكان إحساس مختلف 🌙" },
  { date: "20/2/2026", text: "أول مرة أصلي في نفس المسجد معاكي… وكنت مرتبك شوية 🕌" },
  { date: "27/2/2026", text: "صلينا مع بعض… وكانت لحظة جميلة وهادية 🤲" },
  { date: "27/2/2026", text: "كنتي مرتبكة وإحنا بناكل… وأنا كنت نفسي آكل من إيدك 🥺" },
  { date: "8/3/2026", text: "أول مرة أسمعك بتعيطي… ومكنتش عارف أعمل إيه، بس بجد أنا آسف وبحبك ❤️" }
];

const IMAGES_FALLBACK = [
  "ass/img/1.png",
  "ass/img/2.png",
  "ass/img/3.jpeg",
  "ass/img/4.jpeg",
  "ass/img/5.jpeg",
  "ass/img/6.jpeg",
  "ass/img/7.jpeg"
];

const FINAL_MESSAGE = `
يا ${PERSON_NAME} ❤️
لو وصلتي لحد هنا… يبقى أكيد عارفة قد إيه إنتي غالية عندي.
مش مجرد غالية… إنتي أغلى حاجة حصلت في حياتي.

وجودك جنبي غيّر حاجات كتير جوايا،
خلّى الأيام العادية تبقى أجمل،
وخلّى قلبي يطمن إنه لقى مكانه الحقيقي.

إنتي مش بس حبيبتي…
إنتي صديقتي،
وأماني،
والشخص اللي بحس معاه إن الدنيا أبسط وأحن.

كل لحظة بينا، حتى الصغيرة منها،
بتفضل في قلبي وبتخليني أحمد ربنا إنك في حياتي.

كل سنة وإنتي حبيبتي،
وكل سنة وإنتي أقرب حد لقلبي،
وكل سنة وإنتي النعمة اللي بدعي ربنا تفضل معايا طول العمر.
`.trim();

const RAMADAN_MESSAGE = `
يا ${PERSON_NAME} 🌙🤍
رمضان كريم يا رنوشتي…

ربنا يجعل أيامك كلها نور وراحة،
ويملأ قلبك بالسكينة والفرح.

كل رمضان بيعدي وأنا بدعي إن ربنا يديمك في حياتي،
ويكتب لنا الخير سوا في كل خطوة.

وجودك في حياتي نعمة كبيرة،
وبدعيلك دايمًا بالسعادة وراحة البال.

رمضانك جميل،
وقلبك أجمل،
وربنا يديمك في حياتي يا أحلى هدية 🤍
`.trim();

const EID_MESSAGE = `
يا ${PERSON_NAME} 🎉❤️
كل عيد وإنتِ أقرب إنسانة لقلبي.

العيد بيبقى أجمل لما يكون فيه ضحكتك،
ولما أفكر إنك بقيتي جزء من كل فرحة بتمنّاها.

ربنا يديمك نعمة،
ويكتب لنا أعياد كتير جاية مع بعض،
في حب وراحة وفرحة ما تخلصش.

وكل سنة وإنتِ عيدي الحقيقي 🤍
`.trim();

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

// ========= MEDIA =========
function getMediaLists() {
  const m = window.MEDIA || null;

  if (m) {
    const generalImages = Array.isArray(m.general_images)
      ? m.general_images.map((x) => x.url).filter(Boolean)
      : [];

    const engImages = Array.isArray(m.images)
      ? m.images.map((x) => x.url).filter(Boolean)
      : [];

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

// ========= BACKGROUND =========
function spawnParticles() {
  const box = $("hearts");
  if (!box) return;

  box.innerHTML = "";

  if (document.body.classList.contains("theme-ramadan")) {
    for (let i = 0; i < 12; i++) {
      const m = document.createElement("div");
      m.className = "moon";
      m.style.left = (Math.random() * 100) + "vw";
      m.style.animationDuration = (7 + Math.random() * 10) + "s";
      m.style.animationDelay = (Math.random() * 4) + "s";
      m.style.opacity = (0.12 + Math.random() * 0.16).toFixed(2);
      box.appendChild(m);
    }

    for (let i = 0; i < 18; i++) {
      const s = document.createElement("div");
      s.className = "star";
      s.style.left = (Math.random() * 100) + "vw";
      s.style.animationDuration = (6 + Math.random() * 9) + "s";
      s.style.animationDelay = (Math.random() * 5) + "s";
      s.style.opacity = (0.10 + Math.random() * 0.22).toFixed(2);
      box.appendChild(s);
    }

    return;
  }

  if (document.body.classList.contains("theme-eid")) {
    for (let i = 0; i < 16; i++) {
      const s = document.createElement("div");
      s.className = "spark";
      s.style.left = (Math.random() * 100) + "vw";
      s.style.animationDuration = (6 + Math.random() * 8) + "s";
      s.style.animationDelay = (Math.random() * 4) + "s";
      box.appendChild(s);
    }
    return;
  }

  for (let i = 0; i < 16; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = (Math.random() * 100) + "vw";
    h.style.animationDuration = (6 + Math.random() * 9) + "s";
    h.style.animationDelay = (Math.random() * 5) + "s";
    h.style.opacity = (0.08 + Math.random() * 0.16).toFixed(2);
    box.appendChild(h);
  }
}

// ========= MODAL =========
function openModal({ title, text, extraHtml = "", actions = [] }) {
  $("mTitle").textContent = title || "";
  $("mText").innerHTML = text || "";
  $("mExtra").innerHTML = extraHtml || "";

  const actionsWrap = $("mActions");
  actionsWrap.innerHTML = "";

  actions.forEach((btn) => {
    const b = document.createElement("button");
    b.className = "btn" + (btn.secondary ? " secondary" : "");
    b.textContent = btn.label;
    b.onclick = () => btn.onClick();
    actionsWrap.appendChild(b);
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
    title: "📸 صورة",
    text: "",
    extraHtml: `
      <div class="lightImg">
        <img src="${src}" alt="memory"
          onerror="this.parentElement.innerHTML='<div style=&quot;padding:12px&quot; class=&quot;small&quot;>الصورة مش موجودة</div>'">
      </div>
    `,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openVideoLightbox(src) {
  openModal({
    title: "🎥 فيديو",
    text: "",
    extraHtml: `
      <div class="lightImg">
        <video controls autoplay playsinline style="width:100%;height:auto;display:block;background:rgba(0,0,0,.25)">
          <source src="${src}" type="video/mp4">
        </video>
      </div>
    `,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openImagesGalleryModal(title, images) {
  const html = `
    <div class="allGrid">
      ${images.map((src) => `
        <button class="allItem" type="button" onclick="window.__openImageFromGallery('${src.replace(/'/g, "\\'")}')">
          <img src="${src}" alt="memory">
        </button>
      `).join("")}
    </div>
  `;

  openModal({
    title,
    text: "كل الصور",
    extraHtml: html,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openVideosGalleryModal(title, videos) {
  const html = `
    <div class="allGrid">
      ${videos.map((src) => `
        <button class="allItem videoItem" type="button" onclick="window.__openVideoFromGallery('${src.replace(/'/g, "\\'")}')">
          <video muted playsinline preload="metadata">
            <source src="${src}" type="video/mp4">
          </video>
          <span class="playBadge">▶</span>
        </button>
      `).join("")}
    </div>
  `;

  openModal({
    title,
    text: "كل الفيديوهات",
    extraHtml: html,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

window.__openImageFromGallery = function (src) {
  openImageLightbox(src);
};

window.__openVideoFromGallery = function (src) {
  openVideoLightbox(src);
};

// ========= RENDER =========
function getMessagesByMode(mode) {
  if (mode === MODE_MAMDOUH) return MESSAGES_MAMDOUH;
  if (mode === MODE_EID) return MESSAGES_EID;
  return MESSAGES_DOOU;
}
function shuffleArray(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function renderMessages(mode) {
  const wrap = $("msgs");
  if (!wrap) return;

  wrap.innerHTML = "";

  let list = getMessagesByMode(mode);

  // في وضع ممدوح والعيد نخلي الرسائل متلغبطة/عشوائية شوية
  if (mode === MODE_MAMDOUH || mode === MODE_EID) {
    list = shuffleArray(list);
  }

  list.forEach((text, index) => {
    const item = document.createElement("article");
    item.className = "msgCard";
    item.innerHTML = `
      <div class="msgBody">${text}</div>
    `;
    wrap.appendChild(item);
  });
}
function renderTimeline() {
  const t = $("timeline");
  if (!t) return;

  t.innerHTML = "";

  TIMELINE.forEach((item, index) => {
    const d = document.createElement("div");
    d.className = "timelineItem";
    d.innerHTML = `
      <div class="timelineLine"></div>
      <div class="timelineDot">${index + 1}</div>
      <div class="timelineCard">
        <div class="timelineDate">${item.date}</div>
        <div class="timelineText">${item.text}</div>
      </div>
    `;
    t.appendChild(d);
  });
}

function renderPreviewGallery(id, images, title) {
  const g = $(id);
  if (!g) return;

  g.innerHTML = "";

  const preview = images.slice(0, 5);

  preview.forEach((src) => {
    const ph = document.createElement("button");
    ph.type = "button";
    ph.className = "ph";
    ph.innerHTML = `<img src="${src}" alt="memory" loading="lazy">`;
    ph.addEventListener("click", () => openImageLightbox(src));
    g.appendChild(ph);
  });

  if (images.length > 5) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "ph moreCard";
    more.innerHTML = `
      <div class="moreInner">
        <div class="moreCount">+${images.length - 5}</div>
        <div class="moreText">عرض كل الصور</div>
      </div>
    `;
    more.addEventListener("click", () => openImagesGalleryModal(title, images));
    g.appendChild(more);
  }
}

function renderPreviewVideos(id, videos, title) {
  const vWrap = $(id);
  if (!vWrap) return;

  vWrap.innerHTML = "";

  const preview = videos.slice(0, 5);

  preview.forEach((src) => {
    const box = document.createElement("button");
    box.type = "button";
    box.className = "vThumb";
    box.innerHTML = `
      <video muted playsinline preload="metadata">
        <source src="${src}" type="video/mp4">
      </video>
      <span class="playBadge">▶</span>
    `;

    const vid = box.querySelector("video");
    if (vid) {
      vid.addEventListener("loadeddata", () => {
        try { vid.currentTime = 0.2; } catch (_) {}
      });
    }

    box.addEventListener("click", () => openVideoLightbox(src));
    vWrap.appendChild(box);
  });

  if (videos.length > 5) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "vThumb moreCard";
    more.innerHTML = `
      <div class="moreInner">
        <div class="moreCount">+${videos.length - 5}</div>
        <div class="moreText">عرض كل الفيديوهات</div>
      </div>
    `;
    more.addEventListener("click", () => openVideosGalleryModal(title, videos));
    vWrap.appendChild(more);
  }
}

function renderEngagement(engImages, engVideos) {
  const photosCountEl = $("engPhotosCount");
  const videosCountEl = $("engVideosCount");

  if (photosCountEl) photosCountEl.textContent = engImages.length;
  if (videosCountEl) videosCountEl.textContent = engVideos.length;

  renderPreviewGallery("engGallery", engImages, "💍 كل صور الخطوبة");
  renderPreviewVideos("engVideos", engVideos, "🎥 كل فيديوهات الخطوبة");
}

// ========= AUDIO =========
let audioOn = false;

function getSongByMode(mode) {
  if (mode === MODE_MAMDOUH) return SONG_MAMDOUH;
  if (mode === MODE_EID) return SONG_EID;
  return SONG_DOOU;
}

function setSongByMode(mode) {
  const audio = $("bgm");
  if (!audio) return;

  const src = getSongByMode(mode);
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
  } catch (_) {
    audioOn = false;
    audioBtn.textContent = "🔊 تشغيل";
    return false;
  }
}

// ========= COUNTER =========
function diffYMDHMS(start, end) {
  let from = new Date(start);
  let years = 0;
  let months = 0;

  while (true) {
    const next = new Date(from);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= end) {
      years++;
      from = next;
    } else {
      break;
    }
  }

  while (true) {
    const next = new Date(from);
    next.setMonth(next.getMonth() + 1);
    if (next <= end) {
      months++;
      from = next;
    } else {
      break;
    }
  }

  let diffMs = Math.max(0, end.getTime() - from.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  diffMs -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  diffMs -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diffMs / (1000 * 60));
  diffMs -= minutes * 1000 * 60;

  const seconds = Math.floor(diffMs / 1000);

  return { years, months, days, hours, minutes, seconds };
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function updateTogetherCounter() {
  const el = $("togetherCounter");
  if (!el) return;

  const now = new Date();
  const d = diffYMDHMS(TOGETHER_START, now);

  el.textContent =
    `${d.years}Y ${d.months}M ${d.days}D ${pad2(d.hours)}:${pad2(d.minutes)}:${pad2(d.seconds)}`;
}

// ========= MODE =========
function applyModeTheme(mode) {
  document.body.classList.remove("theme-doou", "theme-ramadan", "theme-eid");
  document.body.classList.add(
    mode === MODE_MAMDOUH
      ? "theme-ramadan"
      : mode === MODE_EID
      ? "theme-eid"
      : "theme-doou"
  );
}

function applyModeSections(mode) {
  const engagementCard = $("engagementCard");
  const galleryCard = $("galleryCard");
  const ramadanBtn = $("openRamadanBtn");
  const eidBtn = $("openEidBtn");
  const finalBtn = $("openFinalBtn");

  // reset
  if (engagementCard) engagementCard.style.display = "";
  if (galleryCard) galleryCard.style.display = "";
  if (ramadanBtn) ramadanBtn.style.display = "";
  if (eidBtn) eidBtn.style.display = "";
  if (finalBtn) finalBtn.style.display = "";
  applyModeTheme(mode);
  applyHeroContent(mode);
  applyModeSections(mode);
  spawnParticles();
  if (mode === MODE_MAMDOUH) {
    // إخفاء ألبوم الخطوبة بالكامل
    if (engagementCard) engagementCard.style.display = "none";

    // لو عاوز كمان تخفي الصور العامة في الوضع الرمضاني فكّ التعليق عن السطر الجاي
    // if (galleryCard) galleryCard.style.display = "none";

    if (eidBtn) eidBtn.style.display = "none";
  }

  if (mode === MODE_EID) {
    if (ramadanBtn) ramadanBtn.style.display = "none";
  }
}
function applyHeroContent(mode) {
  const title = $("heroTitle");
  const sub = $("heroSub");
  const heroMode = $("heroModeBadge");

  if (!title || !sub || !heroMode) return;

  title.textContent = `يا ${PERSON_NAME} ✨`;

  if (mode === MODE_MAMDOUH) {
    heroMode.textContent = "🌙 Ramadan Mode";
    sub.textContent = "وضع رمضاني هادي… دعوات، كلام جميل، وذكريات مناسبة للشهر الكريم.";
    return;
  }

  if (mode === MODE_EID) {
    heroMode.textContent = "🎉 Eid Mode";
    sub.textContent = "وضع العيد… فرحة، رسالة عيد، وجو ألطف ومبهج أكتر.";
    return;
  }

  heroMode.textContent = "❤️ Doou Mode";
  sub.textContent = "كل الصور والرسائل والذكريات الجميلة موجودة هنا ليكي.";
}

// ========= LOGIN =========
function detectModeFromPassword(pw) {
  const v = normalizeArabicSpaces(pw);
  return PASSWORD_MAP[v] || null;
}

function enter() {
  const raw = $("pw")?.value ?? "";
  const v = normalizeArabicSpaces(raw);

  const mode = detectModeFromPassword(v);

  if (!mode) {
    openModal({
      title: "🙈",
      text: "كلمة السر غلط… جربي تاني 💛",
      actions: [{ label: "تمام", onClick: closeModal }],
    });
    return;
  }

  currentMode = mode;

  hide($("login"));
  show($("app"));

  applyModeTheme(mode);
  applyHeroContent(mode);
  applyModeSections(mode);
  spawnParticles();

  renderMessages(mode);
  renderTimeline();
  updateTogetherCounter();

  const media = getMediaLists();
  renderPreviewGallery("gallery", media.generalImages, "📸 كل الصور");
  renderEngagement(media.engImages, media.engVideos);

  setSongByMode(mode);
  tryAutoPlay();

  if (window.__counterInterval) clearInterval(window.__counterInterval);
  window.__counterInterval = setInterval(updateTogetherCounter, 1000);
}

// ========= MESSAGE OPENERS =========
function openLoveMessage() {
  openModal({
    title: "🎀 رسالة خاصة",
    text: "",
    extraHtml: `<div class="messageSheet">${FINAL_MESSAGE.replace(/\n/g, "<br>")}</div>`,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openRamadanMessage() {
  openModal({
    title: "🌙 رسالة رمضان",
    text: "",
    extraHtml: `<div class="messageSheet">${RAMADAN_MESSAGE.replace(/\n/g, "<br>")}</div>`,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

function openEidMessage() {
  openModal({
    title: "🎉 رسالة العيد",
    text: "",
    extraHtml: `<div class="messageSheet">${EID_MESSAGE.replace(/\n/g, "<br>")}</div>`,
    actions: [{ label: "إغلاق", secondary: true, onClick: closeModal }],
  });
}

// ========= DOM =========
document.addEventListener("DOMContentLoaded", () => {
  spawnParticles();

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
    } catch (_) {
      openModal({
        title: "الصوت",
        text: "المتصفح منع التشغيل التلقائي… اضغطي مرة كمان.",
        actions: [{ label: "تمام", onClick: closeModal }],
      });
    }
  });

  on("enterBtn", "click", enter);
  on("pw", "keydown", (e) => {
    if (e.key === "Enter") enter();
  });

  on("openFinalBtn", "click", openLoveMessage);
  on("openRamadanBtn", "click", openRamadanMessage);
  on("openEidBtn", "click", openEidMessage);

  on("modalBack", "click", (e) => {
    if (e.target && e.target.id === "modalBack") closeModal();
  });
});