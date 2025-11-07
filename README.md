# 🕒 Vardiya Yönetim Sistemi

Bu proje, personellerin vardiyalarını yönetmek için geliştirilmiş bir **Ruby on Rails (Backend)** ve **React + Vite (Frontend)** tabanlı uygulamadır.  
Proje, basit bir kullanıcı arayüzü üzerinden personel ekleme, vardiya oluşturma işlemlerini destekler.

---

## 🚀 Özellikler

- 👤 **Personel Yönetimi:** Yeni personel ekleme.
- 📅 **Vardiya Takibi:** Her personele özel vardiya planlama.
- 🧩 **API Entegrasyonu:** Ruby on Rails tabanlı RESTful API ile iletişim.
- 🧪 **Testler:** Cypress ile uçtan uca (E2E) testler.
- 💾 **Fake Veri Üretimi:** Geliştirme ortamında örnek veriler oluşturulabilir.
- 🎥 **Demo Video:** Cypress testleri sırasında otomatik video kaydı.

---

## 🛠️ Kurulum

### 1. Backend (Ruby on Rails)

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
2. Frontend (React + Vite)
bash
Kodu kopyala
cd frontend
npm install
npm run dev
Uygulama varsayılan olarak http://localhost:5173 adresinde çalışır.

🧪 Cypress Test Çalıştırma
Cypress testleri frontend/cypress/e2e dizinindedir.
Testleri çalıştırmak için:

bash
Kodu kopyala
cd frontend
npx cypress run
👉 Testler tamamlandığında:

Başarısız testlerin ekran görüntüleri cypress/screenshots/

Tüm testlerin videoları cypress/videos/
dizininde bulunur.

🧑‍💻 Geliştirici
Begüm Handan Demir
```
