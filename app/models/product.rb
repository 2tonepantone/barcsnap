class Product < ApplicationRecord
  has_one_attached :photo
  has_many :reviews

  validates :name, presence: true
  validates :barcode, presence: true
  
  acts_as_taggable_on :tags
  acts_as_favoritable
end
