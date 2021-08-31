class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :rating, inclusion: 1..5
  after_initialize :init

  def init
    # Will set the default value only if it's nil
    self.source ||= 'unknown'
  end
end
