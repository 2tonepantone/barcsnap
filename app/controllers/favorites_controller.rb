class FavoritesController < ApplicationController
  def create
    product = Product.find(params[:id])
    current_user.favorite(product)
  end
end
