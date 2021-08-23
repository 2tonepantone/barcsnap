class User < ApplicationRecord
  has_many :reviews
  has_one_attached :photo

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :display_name, length: { within: 5..12 }
end
