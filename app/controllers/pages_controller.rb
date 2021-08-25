class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    @top_rating_products = Review.order(rating: :desc).map(&:product).uniq[0..3]
    @most_liked_products = Product.all.sort_by { |p| p.favoritors.count }.reverse[0..3]
  end
end
