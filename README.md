# AI DESTEKLİ DOKÜMAN ANALİZ SİSTEMİ

Bu proje, kullanıcıların yükledikleri dokümanlar üzerinde yapay zeka destekli özetleme ve soru-cevap işlemleri yapabilmesini sağlayan modern bir web uygulamasıdır.
Proje, BİL440 – YZ Destekli Yazılım Geliştirme dersi kapsamında geliştirilmiştir.

# KULLANILAN TEKNOLOJİLER

Ana Çatı (Framework):
Next.js – React tabanlı, SSR ve dosya tabanlı routing desteği

Programlama Dili:
TypeScript – Tip güvenliği ve daha az hata

Arayüz (UI):
React
ShadCN UI
Tailwind CSS
Lucide React (ikonlar)

Veritabanı:
PostgreSQL
Prisma ORM

Yapay Zeka Entegrasyonu:
Genkit (Google)
Gemini AI Modelleri

Form & Doğrulama:
React Hook Form
Zod

Hosting:
Firebase App Hosting

# YAPAY ZEKA ÖZELLİKLERİ

Kısa & Detaylı Özetleme
Kullanıcı, yüklediği doküman için kısa veya detaylı özet oluşturabilir.
Bu işlem Genkit ve Gemini modelleri kullanılarak yapılır.

İlgili dosya:
src/ai/flows/document-summarization.ts

Akıllı Asistan (Soru-Cevap)
Kullanıcı, dokümana özel sorular sorabilir.
Yapay zeka sadece doküman içeriğine göre cevap üretir.

İlgili dosya:
src/ai/flows/semantic-question-answering.ts

AI Hata Bildirimi
Kullanıcı, yanlış veya eksik AI cevaplarını raporlayabilir.

İlgili dosya:
src/ai/flows/ai-error-reporting.ts

# VERİ SAKLAMA

Dokümanlar, özetler ve akıllı asistan soru-cevap geçmişi
PostgreSQL + Prisma kullanılarak veritabanında saklanır.

# GÜVENLİK VE ETİK

Kullanıcı verileri yalnızca proje kapsamında kullanılır.
AI çıktıları eleştirel olarak değerlendirilir.
Yanlış AI cevapları raporlanabilir.
Kodlar açık kaynak lisans uyumluluğu gözetilerek yazılmıştır.

# PROJE YAPISI

src/
ai/flows – AI işlemleri
app – Sayfalar ve server actions
components – UI bileşenleri
prisma – Veritabanı şeması

# TEST VE HATA AYIKLAMA

AI tarafından üretilmiş edge-case senaryoları kullanılmıştır.
Bilinçli olarak raporlanan yanlış AI çıktıları mevcuttur.
Kullanıcı geri bildirimleri sistemde saklanır.

# PROJE AMACI

Bu proje yalnızca çalışan bir yazılım üretmeyi değil:
Yapay zekayı bilinçli kullanmayı,
Yanıltıcı çıktıları tespit etmeyi,
Gerekirse AI önerilerini reddetmeyi
amaçlamaktadır.