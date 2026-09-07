# AiBotTrade — เว็บไซต์โปรเจกต์

เว็บ static หน้าเดียว (`index.html`) ไม่มี build step — แก้ไฟล์แล้ว `git push` Cloudflare Pages deploy อัตโนมัติ

```
aibottradeai-site/
  index.html      ← เนื้อหาทั้งหมดอยู่ไฟล์นี้ (แก้ที่นี่)
  _headers        ← security headers ของ Cloudflare Pages
  _redirects      ← www → apex
  robots.txt / sitemap.xml
```

---

## ✅ ที่ Claude ทำให้แล้ว
- โครงเว็บ + เนื้อหา (`index.html`) — dark theme, responsive, ธีมทอง/ถ่าน
- `_headers` / `_redirects` / `robots.txt` / `sitemap.xml`
- `git init` + commit แรก (พร้อม push)

## ⏳ ต้องเจ้านายทำเอง (5 ขั้น — ทำครั้งเดียว)

### 1. จดโดเมน `aibottradeai.com`
- ไปที่ **dash.cloudflare.com → Domain Registration → Register Domains**
- พิมพ์ `aibottradeai.com` → ราคาประมาณ **$14/ปี** (~490 บาท) กด Purchase
- *(ถ้า Cloudflare ไม่ให้จด .app ด้วยเหตุผลใด ให้จดที่ **porkbun.com** แทน ~$14 แล้วทำข้อ 2b)*

### 2. โดเมนพร้อมใช้
- **ถ้าจดที่ Cloudflare**: DNS อยู่ใน Cloudflare ให้อัตโนมัติ ข้ามไปข้อ 3 ได้เลย
- **2b. ถ้าจดที่ Porkbun**: ที่ Cloudflare กด **Add a site** → `aibottradeai.com` (แผน Free) → Cloudflare จะให้ nameserver 2 ตัว → เอาไปใส่ใน Porkbun (Domain → Authoritative Nameservers) → รอ ~1–24 ชม. ให้ active

### 3. สร้าง GitHub repo แล้ว push โค้ดนี้
- สร้าง repo ใหม่ที่ **github.com/new** ชื่อ `aibottradeai-site` (private หรือ public ก็ได้) — **ไม่ต้องติ๊ก** add README/gitignore
- copy คำสั่ง 2 บรรทัดที่ GitHub ให้ (`git remote add origin ...` + `git push -u origin main`) มาบอก Claude ให้รันให้ **หรือ** รันเองในโฟลเดอร์ `D:\Claude Code\aibottradeai-site`

### 4. เชื่อม Cloudflare Pages
- Cloudflare dash → **Workers & Pages → Create → Pages → Connect to Git**
- เลือก repo `aibottradeai-site`
- ตั้งค่า build:
  - **Framework preset**: `None`
  - **Build command**: *(เว้นว่าง)*
  - **Build output directory**: `/`
- กด **Save and Deploy** → ได้ URL ชั่วคราว `aibottradeai-site.pages.dev` เช็กว่าเว็บขึ้นถูก

### 5. ผูก custom domain + subdomain แดชบอร์ด
- ในหน้า Pages project → **Custom domains → Set up a custom domain** → ใส่ `aibottradeai.com` แล้ว `www.aibottradeai.com` (Cloudflare เพิ่ม DNS ให้เอง)
- **`app.aibottradeai.com` (แดชบอร์ดสด)**: ไปที่ `cloudflared` config เดิม (`tools/` ในโปรเจกต์บอท) เพิ่ม ingress rule:
  ```yaml
  - hostname: app.aibottradeai.com
    service: http://localhost:8769   # team_server.py (หน้า /status รวม A+B+7-11)
  ```
  แล้วเพิ่ม DNS record ที่ Cloudflare: `CNAME  app  <tunnel-id>.cfargotunnel.com` (proxied)
  — บอก Claude ให้ทำส่วน config ให้ก็ได้ เจ้านายแค่ restart tunnel

---

## แก้เนื้อหาต่อ
บอก Claude ได้เลย เช่น "เพิ่มหน้า /results", "เปลี่ยนหัวข้อ hero", "ใส่กราฟ equity" — Claude แก้ `index.html` (หรือเพิ่มไฟล์) แล้ว commit + push → live ใน ~30 วินาที

## ต้นทุนรวม
~490 บาท/ปี (ค่าโดเมนอย่างเดียว) · โฮสต์ + SSL + bandwidth = ฟรี
