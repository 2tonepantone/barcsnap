class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @most_liked_products = Product.all.sort_by { |p| p.favoritors.count }.reverse[0..5]
  end
end
