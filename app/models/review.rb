class Review < ApplicationRecord
  belongs_to :user
  belongs_to :product

  validates :rating, :inclusion => 1..5
  after_initialize :init

  def init
    self.source  ||= "barcsnap.com"           #will set the default value only if it's nil
  end
end
