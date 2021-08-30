class Product < ApplicationRecord
  has_one_attached :photo
  has_many :reviews

  validates :name, presence: true
  validates :barcode, presence: true

  acts_as_taggable_on :tags
  ActsAsTaggableOn.force_lowercase = true
  acts_as_favoritable

  def avg_rating_str
    avg = "-"
    reviews = self.reviews
    avg = (reviews.map(&:rating).sum / reviews.count).round(2) if reviews.count.positive?
    return avg.to_s
  end
end
