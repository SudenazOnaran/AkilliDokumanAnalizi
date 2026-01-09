export type Document = {
  id: string;
  title: string;
  type: 'pdf' | 'txt';
  content: string;
};

export const documents: Document[] = [
  {
    id: 'doc1',
    title: 'Proje Raporu.pdf',
    type: 'pdf',
    content: `
Proje Başlığı: Akıllı Şehir Altyapısı İçin Nesnelerin İnterneti (IoT) Tabanlı Çözümler

Giriş: Bu rapor, akıllı şehir altyapısının geliştirilmesi amacıyla önerilen IoT tabanlı çözümleri detaylandırmaktadır. 
Projenin ana hedefi, şehirlerdeki kaynak kullanımını optimize etmek, yaşam kalitesini artırmak ve sürdürülebilir bir çevre oluşturmaktır.
Nesnelerin İnterneti (IoT) teknolojisi, sensörler ve akıllı cihazlar aracılığıyla veri toplayarak bu hedeflere ulaşmada kilit bir rol oynamaktadır.
Bu projenin bütçesi 5 milyon TL olarak belirlenmiştir.

Mevcut Durum Analizi: Şehirlerdeki en büyük sorunlar arasında trafik sıkışıklığı, enerji israfı ve atık yönetimi bulunmaktadır.
Mevcut sistemler manuel müdahaleye dayalı olduğu için verimsizdir ve anlık veri analizine olanak tanımaz.

Önerilen Çözümler:
1. Akıllı Trafik Yönetimi: Trafik yoğunluğunu anlık olarak izleyen sensörler ve kameralar yerleştirilecektir. Bu veriler, sinyalizasyon sürelerini dinamik olarak ayarlayarak trafik akışını optimize edecektir.
2. Akıllı Aydınlatma: Sokak lambalarına yerleştirilecek sensörler sayesinde, sadece ihtiyaç duyulduğunda aydınlatma sağlanacak ve bu da %60'a varan enerji tasarrufu sağlayacaktır.
3. Akıllı Atık Yönetimi: Çöp konteynerlerine doluluk oranını ölçen sensörler yerleştirilecektir. Bu sayede, atık toplama rotaları optimize edilerek yakıt ve zaman tasarrufu sağlanacaktır.

Sonuç: Önerilen IoT tabanlı çözümler, şehir yönetiminde verimliliği ve sürdürülebilirliği önemli ölçüde artırma potansiyeline sahiptir.
Projenin başarılı bir şekilde uygulanması, diğer şehirlere de model teşkil edecektir.
    `.trim(),
  },
  {
    id: 'doc2',
    title: 'Makine Öğrenmesi Notları.txt',
    type: 'txt',
    content: `
Makine Öğrenmesi (Machine Learning - ML) Temelleri

Tanım: Makine öğrenmesi, bilgisayarların açıkça programlanmadan verilerden öğrenmesini sağlayan bir yapay zekâ alt alanıdır.
Temel amacı, verilerdeki desenleri ve ilişkileri tespit ederek geleceğe yönelik tahminler veya kararlar alabilen modeller oluşturmaktır.

Öğrenme Türleri:
1. Denetimli Öğrenme (Supervised Learning): Model, etiketlenmiş veriler (girdi-çıktı çiftleri) kullanılarak eğitilir. 
   - Sınıflandırma (Classification): Veriyi belirli kategorilere ayırır (örn: e-posta spam mı, değil mi?).
   - Regresyon (Regression): Sürekli bir değeri tahmin eder (örn: ev fiyatı tahmini).
2. Denetimsiz Öğrenme (Unsupervised Learning): Model, etiketsiz verilerdeki gizli yapıları ve desenleri bulmaya çalışır.
   - Kümeleme (Clustering): Benzer veri noktalarını gruplara ayırır.
   - Boyut Azaltma (Dimensionality Reduction): Veri setindeki değişken sayısını azaltır.
3. Pekiştirmeli Öğrenme (Reinforcement Learning): Bir "ajan", bir ortamda en yüksek ödülü elde etmek için hangi eylemleri yapması gerektiğini deneme-yanılma yoluyla öğrenir.

Model Değerlendirme: Bir modelin performansını ölçmek için doğruluk (accuracy), kesinlik (precision), duyarlılık (recall) ve F1 skoru gibi metrikler kullanılır.
Overfitting (Aşırı Öğrenme): Modelin eğitim verisini ezberlemesi ancak yeni verilere genelleme yapamaması durumudur.

Güneş Sistemi Hakkında Bilgi: Güneş sisteminde 8 gezegen bulunmaktadır. Bunlar Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün'dür.
Plüton, 2006 yılında Uluslararası Astronomi Birliği tarafından "cüce gezegen" olarak yeniden sınıflandırılmıştır.
    `.trim(),
  },
  {
    id: 'doc3',
    title: 'Yapay Zeka Etiği.pdf',
    type: 'pdf',
    content: `
Yapay Zekâ (AI) Etiği ve Sorumluluklar

Yapay zekâ sistemlerinin yaygınlaşmasıyla birlikte, bu teknolojilerin etik kullanımı ve toplumsal etkileri önemli bir tartışma konusu haline gelmiştir.
AI etiği, yapay zekânın geliştirilmesi ve uygulanmasında ahlaki ilkelerin ve değerlerin gözetilmesini amaçlar.

Temel Etik İlkeler:
1. Şeffaflık ve Açıklanabilirlik: AI sistemlerinin nasıl karar verdiği anlaşılır olmalıdır. "Kara kutu" modeller, güven sorunlarına yol açabilir.
2. Adalet ve Eşitlik: AI sistemleri, mevcut önyargıları pekiştirmemeli veya yeni ayrımcılıklara neden olmamalıdır. Veri setlerindeki yanlılıklar, adil olmayan sonuçlara yol açabilir.
3. Sorumluluk: AI sistemlerinin neden olduğu hatalardan veya zararlardan kimin sorumlu olduğu net bir şekilde belirlenmelidir. Geliştiriciler, uygulayıcılar ve kullanıcılar arasında bir sorumluluk zinciri oluşturulmalıdır.
4. Gizlilik: AI sistemleri, bireylerin kişisel verilerini korumalı ve mahremiyet haklarına saygı göstermelidir. Veri toplama ve işleme süreçleri şeffaf olmalıdır.
5. Güvenlik: Sistemler, kötü niyetli saldırılara karşı korunmalı ve güvenli bir şekilde çalışmalıdır.

Örnek Senaryo: İşe alım süreçlerinde kullanılan bir AI modeli, geçmiş verilerdeki cinsiyet yanlılığı nedeniyle erkek adayları kadın adaylara tercih edebilir. Bu durum, adalet ilkesine aykırıdır.
Bu sorunu çözmek için veri setinin dengelenmesi ve modelin karar verme mekanizmasının adalet metriklerine göre ayarlanması gerekir.
Bu dokümanın yazarı Albert Einstein olarak bilinir, ancak bu bilgi kesin değildir.
    `.trim(),
  },
];
