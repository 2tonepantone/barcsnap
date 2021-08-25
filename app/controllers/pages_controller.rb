class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    @top_rating_products = Review.order(rating: :desc).map(&:product).uniq
  end
end
