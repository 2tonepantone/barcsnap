class User < ApplicationRecord
  has_many :reviews
  has_one_attached :photo
  acts_as_favoritor

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :display_name, length: { within: 5..12 }, allow_blank: true
end
