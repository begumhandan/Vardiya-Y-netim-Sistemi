require 'faker'

# Ayarlamalar — istediğin kadar değiştir
NUM_PERSONNELS = 10       # kaç personel oluşturulsun
MIN_SHIFTS = 1            # her personel için minimum vardiya sayısı
MAX_SHIFTS = 5            # her personel için maksimum vardiya sayısı

puts "Seeding started..."

# Temizle (isteğe bağlı)
Personel.destroy_all
Vardiya.destroy_all

puts "Old records removed."

# Kısa yardımcı: rastgele tarih aralığı (son 30 gün içinde)
def random_shift_times
  # Başlangıç: bugün -30 gün ile bugün + 5 gün arası rastgele gün
  base_day = Faker::Time.between(from: 30.days.ago, to: 5.days.from_now)
  # Başlangıç saati: base_day saatinde
  start_time = base_day.change(min: [0, (base_day.min / 15).floor * 15].max)
  # Vardiya süresi 4-10 saat arası
  duration_hours = rand(4..10)
  end_time = start_time + duration_hours.hours
  [start_time, end_time]
end

NUM_PERSONNELS.times do |i|
  ad = Faker::Name.first_name
  soyad = Faker::Name.last_name

  personel = Personel.create!(
    ad: ad,
    soyad: soyad
  )

  shifts_count = rand(MIN_SHIFTS..MAX_SHIFTS)
  shifts_count.times do
    st, et = random_shift_times
    Vardiya.create!(
      ad: ["Gündüz", "Gece", "Olağan", "Yedek"].sample,
      baslangic_saati: st,
      bitis_saati: et,
      personel: personel
    )
  end

  puts "Created Personel #{personel.id} #{personel.ad} #{personel.soyad} with #{shifts_count} shifts"
end

puts "Seeding finished. Created #{Personel.count} personnel and #{Vardiya.count} shifts."
