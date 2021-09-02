class Product < ApplicationRecord
  ALLERGENS = %w[アーモンド あわび いか いくら オレンジ カシューナッツ キウイフルーツ
                 牛肉 くるみ ごま さけ さば 大豆 鶏肉 バナナ 豚肉 まつたけ もも やまいも りんご
                 ゼラチン えび かに 小麦 そば 卵 乳 落花生 ピーナッツ]
  has_one_attached :photo
  has_many :reviews

  validates :name, presence: true
  validates :barcode, presence: true

  acts_as_taggable_on :tags
  ActsAsTaggableOn.force_lowercase = true
  acts_as_favoritable

  include PgSearch::Model
    pg_search_scope :search_by_name,
      against: [ :name ],
      using: {
        tsearch: { prefix: true } # <-- now `superman batm` will return something!
      }

  def allergens
    contains = ALLERGENS.select { |allergen| ingredients.include?(allergen) }.join(', ') if ingredients
    return "No ingredients provided." if contains.nil?
    return "No allergens found." if contains.empty?

    contains
  end

  def avg_rating
    reviews.average(:rating)&.to_f
  end
end
