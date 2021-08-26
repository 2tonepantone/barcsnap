class FavoritesController < ApplicationController
  def create
    product = Product.find(params[:product_id])
    if current_user.favorited?(product) == false
      current_user.favorite(product)
    else
      current_user.unfavorite(product)
    end
  end
end
