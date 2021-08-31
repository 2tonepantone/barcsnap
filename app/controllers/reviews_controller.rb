class ReviewsController < ApplicationController
  def create

    @product = Product.find(params[:product_id])
    # @review = @product.reviews.new(reviews_params)
    @review = Review.new(reviews_params)
    @review.user_id = current_user.id
    @review.product = @product
    if @review.save
      redirect_to product_path(@product)
    else
      # redirect_to product_path(@product)
      redirect_to product_path(@product), alert: "Cannot insert review. #{@review.errors.full_messages.join(', ')}."
    end
  end
    private
    def reviews_params
      params.require(:review).permit(:rating, :comment)
    end
end
