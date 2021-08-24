class Product < ApplicationRecord
  has_many :reviews

  validates :name, presence: true
  validates :barcode, presence: true
end
