class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])
    if !params[:product_id].nil?
      @product_compare = Product.find(params[:product_id])
    end
  end
end
