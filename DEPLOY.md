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

## ขั้นที่ 4 — ผูกโดเมน
1. หน้า Pages project `aibottradeai` → **Custom domains → Set up a custom domain**
2. ใส่ `aibottradeai.com` → Continue (Cloudflare เพิ่ม DNS record ให้เอง) → รอ ~1–5 นาที Active
3. ทำซ้ำอีกครั้งกับ `www.aibottradeai.com`

---

## ขั้นที่ 5 — `app.aibottradeai.com` (แดชบอร์ดสด ผ่าน tunnel เดิม)
- Claude แก้ `cloudflared` config + สร้าง DNS record ให้ (ดู `cloudflared-app-aibottradeai.yaml` ในโฟลเดอร์นี้)
- เจ้านายแค่ **restart tunnel** (`Restart-ScheduledTask -TaskName "AITrading_CloudflaredTunnel"` หรือรอรอบ watchdog 5 นาที)

---

## เสร็จแล้ว
- `aibottradeai.com` → เว็บหลัก (แก้ผ่าน Claude + git push → live ~30 วิ ถ้าใช้ทาง A)
- `app.aibottradeai.com` → แดชบอร์ดสด
- ต้นทุน: ~490 บาท/ปี (ค่าโดเมน) · โฮสต์ 0 บาท
