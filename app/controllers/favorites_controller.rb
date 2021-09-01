class FavoritesController < ApplicationController
  def create
    return if current_user.nil?

    return if params.key?(:product_id) == false

    return if Product.exists?(params[:product_id]) == false

    @product = Product.find(params[:product_id])
    if current_user.favorited?(@product) == false
      current_user.favorite(@product)
    else
      current_user.unfavorite(@product)
    end

    respond_to do |format|
      format.html { redirect_to @product }
      format.js # Follow the classic Rails flow and look for a create.json view
    end
  end
end
