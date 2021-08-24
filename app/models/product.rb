class Product < ApplicationRecord
  has_many :reviews
  has_one_attached :photo

  validates :name, presence: true
  validates :barcode, presence: true
end
