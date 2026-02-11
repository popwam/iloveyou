  // ========= CONFIG =========
  const PERSON_NAME = "رنوشتي";          // ✅
  const PASSWORD = "مشمش";             // ✅
  const LOVE_WORDS = ["بحبك","احبك"];   // ✅ “أنا كمان بحبك” لا تظهر إلا لهم

  // 14 Feb 2026 00:00 UTC
  const UNLOCK_UTC = Date.UTC(2026, 1, 14, 0, 0, 0);

  // together from 23/1/2026
  const TOGETHER_START = new Date(2026, 0, 23, 0, 0, 0);

  const MESSAGES = [
    "أنا عامل الصفحة دي مخصوص… عشانك ❤️",
    "كل مرة بتفتحيها… افتكري إنك غالية عندي ✨",
    "مش مهم الدنيا… المهم إنك موجودة 🤍",
    "أول رسالة بينا… فاكرة؟ ✉️"
  ];

  const TIMELINE = [
    { date: "23/1", text: "أول لقاء بينا 💫" },
    { date: "30/1", text: "اتكلمنا وشفت أهلك كلهم 😄" },
    { date: "3/2",  text: "أول رسالة بينا… فاكرة؟ ✉️" },
    { date: "4/2",  text: "أول مكالمة… مكنتش مصدق إني سمعت صوتك 🎧" }
  ];

  const IMAGES = ["ass/img/1.png","ass/img/2.png","ass/img/3.jpeg","ass/img/4.jpeg","ass/img/5.jpeg","ass/img/6.jpeg","ass/img/7.jpeg"];

  const FINAL_MESSAGE = `
يا ${PERSON_NAME} ❤️
لو وصلتي لحد هنا… يبقى إنتي فعلاً أغلى حاجة.
كل سنة وإنتي حبيبتي… ووجودك في حياتي نعمة.
(دي رسالة 14/2 ✨)
  `.trim();

  // ========= HELPERS =========
  const $ = (id)=>document.getElementById(id);
  const show = (el)=>el.classList.remove("hidden");
  const hide = (el)=>el.classList.add("hidden");

  function spawnHearts(){
    const box = $("hearts");
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

  document.body.classList.add("modal-open");   // ✅ الجديد
  $("modalBack").style.display="flex";
}

function closeModal(){
  document.body.classList.remove("modal-open"); // ✅ الجديد
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

  // Audio
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

  // Days + Hours counter
  function updateTogetherCounter(){
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - TOGETHER_START.getTime());
    const totalMin = Math.floor(diffMs / 60000);
    const days = Math.floor(totalMin / (60*24));
    const hours = Math.floor((totalMin - days*60*24) / 60);
    const mins = totalMin % 60;
    $("togetherCounter").textContent = `${days} يوم • ${hours} ساعة • ${mins} دقيقة`;
  }

  // Lock 14/2 (UTC)
  function isUnlockedUTC(){ return Date.now() >= UNLOCK_UTC; }
  function updateLockStatus(){
    const s=$("lockStatus");
    if(isUnlockedUTC()){
      s.textContent="✅ الرسالة متاحة دلوقتي";
      return;
    }
    const diff = UNLOCK_UTC - Date.now();
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
    "كلمة السر غلط 🙈",
    "لا لا… ركزي كده 😅",
    "مش دي… بس لسه بحاول أكون هادي 😶",
    "قربت أزعل… 😤",
    "خلاص… اتكسرت 💔"
  ];

  function setBrokenMode(){
    isBroken = true;
    document.body.classList.add("broken");
  }

  function enter(){
    const v = $("pw").value.trim();

    // ✅ “أنا كمان بحبك…” فقط لو كتبت بحبك/احبك
    if(LOVE_WORDS.includes(v) && v !== PASSWORD){
      wrongCount++;
      openModal({
        title:"🙈",
        text:"أنا كمان بحبك… بس كلمة السر غلط 😌",
        actions:[{label:"أوكي", onClick:closeModal}]
      });
      if(wrongCount >= 5) setBrokenMode();
      return;
    }

    if(v === PASSWORD){
      hide($("login"));
      show($("app"));
      $("heroTitle").textContent = `يا ${PERSON_NAME} ✨`;
      spawnHearts();
      renderMessages();
      renderGallery();
      renderTimeline();
      updateTogetherCounter();
      updateLockStatus();
      setInterval(updateTogetherCounter, 30000);
      setInterval(updateLockStatus, 30000);

      // keep broken if it happened قبل الدخول
      if(isBroken) document.body.classList.add("broken");

      tryAutoPlay().then((ok)=>{
        if(!ok){
          openModal({title:"🎵", text:"لو الموسيقى مش شغالة اضغطي زر (تشغيل) فوق.", actions:[{label:"تمام", onClick:closeModal}]});
        }
      });
      return;
    }

    wrongCount++;
    const msg = wrongReplies[Math.min(wrongCount-1, wrongReplies.length-1)];
    openModal({ title:"🙈", text: msg, actions:[{label:"أوكي", onClick:closeModal}] });

    if(wrongCount >= 5){
      setBrokenMode();
      // ملحوظة بسيطة
      openModal({
        title:"💔",
        text:"خلاص… اتكسرت. افتحي تاني لو بتعرفي كلمة السر 😔",
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
      // لو كان broken هيظهر وهو مكسور
      if(isBroken) document.body.classList.add("broken");
      $("finalBox").style.display="block";
      $("finalBox").textContent = FINAL_MESSAGE;
      return;
    }

    // locked
    if(finalPressCount > 2){
      askLoveWordForEarly();
      return;
    }
    openModal({title:"لسه بدري ❤️", text:"الرسالة هتفتح يوم 14/2", actions:[{label:"تمام", onClick:closeModal}]});
  });

  $("modalBack").addEventListener("click", (e)=>{ if(e.target.id==="modalBack") closeModal(); });
