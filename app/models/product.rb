class Product < ApplicationRecord
  has_one_attached :photo
  has_many :reviews
  acts_as_taggable_on :tags
end
