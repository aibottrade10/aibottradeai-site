(function(){
  "use strict";
  var A_API = "https://app.aibottradeai.com";      // System A + 7-11 + R&D (team_server :8769)
  var B_API = "https://aiteams.aibottradeai.com";   // System B (serve_dashboard_teamsb :8770)

  var NAV = [
    { grp:"ภาพรวม", items:[
      ["/","ภาพรวม A+B+7-11","M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10"],
    ]},
    { grp:"ผลการเทรด", items:[
      ["/system-a","ระบบ A","M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"],
      ["/system-b","ระบบ B","M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"],
      ["/seven-eleven","7-11","M6 9l6-6 6 6M6 9v9a2 2 0 002 2h8a2 2 0 002-2V9M10 20v-5h4v5"],
    ]},
    { grp:"AI & แล็บ", items:[
      ["/meeting","ห้องประชุม ทีมบี","M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"],
      ["/ai-brain","AI Brain","M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2"],
      ["/rd-lab","R&D Lab","M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"],
      ["/signals","สัญญาณ","M4 12h4l3-8 4 16 3-8h2"],
    ]},
    { grp:"เอกสาร", items:[
      ["/architecture","สถาปัตยกรรม","M12 3v18M5 8l7-5 7 5M5 8v9l7 4 7-4V8"],
      ["/about","สรุปโปรเจกต์","M4 5h16M4 11h16M4 17h10"],
    ]},
  ];

  function norm(p){ p = (p||"/").replace(/\.html$/,""); if(p==="") p="/"; return p; }
  var here = norm(location.pathname);

  function sidebar(){
    var groups = NAV.map(function(g){
      var links = g.items.map(function(it){
        var on = norm(it[0]) === here ? " on" : "";
        return '<a href="'+it[0]+'" class="'+on.trim()+'">'+
          '<svg viewBox="0 0 24 24"><path d="'+it[2]+'"/></svg>'+it[1]+'</a>';
      }).join("");
      return '<div class="grp">'+g.grp+'</div><nav>'+links+'</nav>';
    }).join("");
    return '<aside>'+
      '<div class="brand"><span class="mk"><svg viewBox="0 0 24 24"><path d="M3 17l5-6 4 4 5-8 4 5"/></svg></span>'+
        '<span><b>AiBotTrade</b><span>trading system</span></span></div>'+
      '<div class="livebar" id="ab-livebar"><i></i><span id="ab-livetxt">กำลังเชื่อมต่อ…</span></div>'+
      groups+
      '<div class="sb-foot"><small>โปรเจกต์วิจัย/พัฒนา · บัญชีเดโม่<br>ไม่ใช่คำแนะนำการลงทุน</small>'+
        '<a class="ext" href="https://app.aibottradeai.com" target="_blank" rel="noopener">แดชบอร์ดสด ↗</a></div>'+
    '</aside>';
  }

  // ---- public helpers ----
  var AB = {
    A_API:A_API, B_API:B_API,
    fmtUSD:function(n){ if(n==null||isNaN(n)) return "—";
      return (n<0?"-":"+")+"$"+Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); },
    fmtInt:function(n){ return n==null?"—":Number(n).toLocaleString("en-US"); },
    pct:function(n,d){ return n==null?"—":Number(n).toFixed(d==null?1:d)+"%"; },
    cls:function(n){ return n>0?"g":(n<0?"r":""); },
    esc:function(s){ return String(s==null?"":s).replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); },
    get:function(base,path){
      var ctl=new AbortController(), t=setTimeout(function(){ctl.abort();},9000);
      return fetch(base+path,{signal:ctl.signal,cache:"no-store"})
        .then(function(r){ clearTimeout(t); if(!r.ok) throw 0; return r.json(); })
        .catch(function(){ clearTimeout(t); return null; });
    },
    getA:function(p){ return AB.get(A_API,p); },
    getB:function(p){ return AB.get(B_API,p); },
    live:function(ok){
      var b=document.getElementById("ab-livebar"), tx=document.getElementById("ab-livetxt");
      if(!b) return;
      if(ok){ b.className="livebar"; tx.textContent="LIVE · อัปเดตทุก 60 วิ"; }
      else  { b.className="livebar off"; tx.textContent="เชื่อมต่อไม่ได้บางส่วน"; }
    },
    every:function(fn){ fn(); setInterval(fn, 60000); }
  };
  window.AB = AB;

  function boot(){
    var side = document.getElementById("ab-side");
    if(side) side.outerHTML = sidebar();
    if(window.AB_INIT) window.AB_INIT();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
