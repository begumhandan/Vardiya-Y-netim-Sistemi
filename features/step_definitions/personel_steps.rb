require 'time'

Given('the database has no personnel') do
  Personel.delete_all
end

Given('I create a personnel with first name {string} and last name {string}') do |ad, soyad|
  @personel = Personel.create!(ad: ad, soyad: soyad)
end

Given('I assign a shift to this personnel from {string} to {string}') do |baslangic, bitis|
  raise 'Personnel not found' unless @personel
  @vardiya = Vardiya.create!(
    ad: 'Regular',
    baslangic_saati: Time.parse(baslangic),
    bitis_saati: Time.parse(bitis),
    personel: @personel
  )
end

Then('the database should contain {int} shifts for personnel named {string} {string}') do |expected_count, ad, soyad|
  personel = Personel.find_by(ad: ad, soyad: soyad)
  raise "Personnel #{ad} #{soyad} not found" unless personel
  actual = personel.vardiyas.count
  raise "Expected #{expected_count} shifts, found #{actual}" unless actual == expected_count
end
