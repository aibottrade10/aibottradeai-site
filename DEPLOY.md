# AiBotTrade — ขั้นตอน deploy (สมัคร Cloudflare แล้ว)

## สถานะ
- ✅ โค้ดเว็บพร้อม (v1–v4 + favicon + 404) · git commit แล้ว
- ⏳ ยังไม่ได้เลือกดีไซน์ตัวจริง → Claude จะ copy ตัวที่เจ้านายเลือกไปเป็น `index.html`
- ⏳ ยังไม่ได้จดโดเมน · ยังไม่ได้สร้าง Pages project

---

## ขั้นที่ 1 — 💳 จดโดเมน `aibottradeai.com` (ขั้นจ่ายเงิน ~$14 / ~490 บาท)

1. เข้า **dash.cloudflare.com** → เมนูซ้าย **Domain Registration → Register Domains**
2. ช่องค้นหา พิมพ์ `aibottradeai.com` → กด Search
3. `aibottradeai.com` ควรขึ้น **Available** ราคา ~$14.00/yr → กด **Purchase**
4. กรอกข้อมูล registrant (ชื่อ/ที่อยู่/อีเมล) + ใส่บัตร → ยืนยัน
5. เสร็จแล้วโดเมนจะโผล่ใน **Websites** ของ Cloudflare อัตโนมัติ (DNS จัดการในนี้เลย ไม่ต้อง add site เอง)

> ถ้า Cloudflare ไม่ให้จด `.app` (เจอน้อยมาก) → จดที่ **porkbun.com** แทน (~$14) แล้วบอก Claude จะให้ nameserver Cloudflare ไปตั้ง

**➡️ บอก Claude เมื่อจดเสร็จ**

---

## ขั้นที่ 2 — เอาโค้ดขึ้น (เลือก 1 ใน 2 ทาง)

### ทาง A — GitHub (แนะนำ: push แล้ว deploy เอง)
1. **github.com/new** → repo name `aibottradeai-site` → **ไม่ต้องติ๊ก** add README/gitignore/license → Create
2. copy บล็อกคำสั่งที่ GitHub แสดง ("…or push an existing repository") — มี 2–3 บรรทัด `git remote add origin …` + `git push -u origin main`
3. **วางให้ Claude** → Claude push ให้

### ทาง B — Direct Upload (ไม่ต้องมี GitHub)
- บอก Claude → Claude zip โฟลเดอร์ให้ → เจ้านายลากขึ้น Cloudflare Pages เอง (แต่ครั้งต่อไปที่แก้ ต้อง upload ใหม่ทุกครั้ง)

---

## ขั้นที่ 3 — Cloudflare Pages
1. Cloudflare dash → **Workers & Pages → Create → Pages**
2. **ทาง A**: Connect to Git → เลือก `aibottradeai-site` · **ทาง B**: Upload assets → ลาก zip
3. ตั้งค่า build:
   - Project name: `aibottradeai`
   - Production branch: `main`
   - Framework preset: **None**
   - Build command: **(เว้นว่าง)**
   - Build output directory: **`/`**
4. **Save and Deploy** → ได้ URL `aibottradeai.pages.dev` · เปิดเช็คว่าเว็บขึ้นถูก

---

## ขั้นที่ 4 — ผูกโดเมน  ✅ เสร็จแล้ว (2026-09-07)
- Pages project `aibottradeai-site` → Custom domains
- `aibottradeai.com` = **Active + SSL**, `www.aibottradeai.com` = **Active**

---

## ขั้นที่ 5 — `app.aibottradeai.com` (แดชบอร์ดสด)  ✅ เสร็จแล้ว (2026-09-07)
โดเมน aibottradeai.com อยู่คนละ Cloudflare account กับ tunnel หลัก จึงสร้าง **tunnel ตัวที่ 2**
(`aibottradeai-app`) ใน account ใหม่ ชี้ไป `localhost:8769` — รายละเอียด/วิธีกู้อยู่ใน
`cloudflared-app-aibottradeai.yaml` · watchdog: task `AITrading_CloudflaredTunnelApp` (ทุก 5 นาที)

---

## เสร็จแล้วทั้งหมด
- `aibottradeai.com` / `www` → เว็บหลัก (แก้ผ่าน Claude + `git push` → Cloudflare Pages auto-deploy ~30 วิ)
- `app.aibottradeai.com` → แดชบอร์ดสด (team dashboard + `/status` = รวม A+B+7-11)
- GitHub: `aibottrade10/aibottradeai-site` (public) · โฟลเดอร์เครื่อง: `D:\Claude Code\goldpilot-site\`
- ต้นทุน: ~365 บาท/ปี (ค่าโดเมน) · โฮสต์ + tunnel = 0 บาท
