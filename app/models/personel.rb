class Personel < ApplicationRecord
  has_many :vardiyas, dependent: :destroy
end
