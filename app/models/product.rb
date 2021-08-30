class Product < ApplicationRecord
  has_one_attached :photo
  has_many :reviews

  validates :name, presence: true
  validates :barcode, presence: true

  acts_as_taggable_on :tags
  ActsAsTaggableOn.force_lowercase = true
  acts_as_favoritable

  def avg_rating
    reviews.average(:rating)&.to_f
  end
end
