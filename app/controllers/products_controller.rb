class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[show create]

  def show
    @product = Product.find(params[:id]) if params[:id].to_i.positive?
    @review = Review.new

    # If product_id exists, generate @product_compare
    if !params[:product_id].nil?
      @product_compare = Product.find(params[:product_id])
    end

    # If sort_by key exists, generate @products
    return unless params.key? :sort_by

    if @product.nil? && params[:id] == '0'
      @products = get_all_product_sorted
    else
      @products = get_related_product_sorted(@product)
    end
  end

  def create
    @product = Product.find(params[:id])
    # @review = @product.reviews.new(reviews_params)
    @review = Review.new(reviews_params)
    raise
    @review.product = @product
    if @review.save
      raise
      redirect_to product_path(@product)
    else
      render 'products/show'
    end


    @barcode = params[:barcode]

    @barcode = convert_to_jancode unless jancode_format?

    if in_database?
      @product = Product.find_by(barcode: @barcode)
      redirect_to product_path(@product), notice: 'Barcode was scanned successfully.'
    else
      jancode_scraper = ScrapeJancodeService.new(@barcode)
      jancode_scraper.call
      @product = jancode_scraper.create_product

      if @product.save
        jancode_scraper.upload_image
        redirect_to product_path(@product), notice: 'Barcode was scanned successfully.'
      else
        redirect_to root_path, alert: "Failed to scan barcode. #{@product.errors.full_messages.join(', ')}."
      end
    end
  end

  private

  def jancode_format?
    @barcode.length == 13
  end

  def convert_to_jancode
    "0" * (13 - @barcode.length) + @barcode
  end

  def in_database?
    Product.exists?(barcode: @barcode)
  end

  def get_all_product_sorted
    case params[:sort_by]
    when "most_related"
      @products = Product.all
    when "most_favorited"
      @products = Product.all.sort_by { |p| p.favoritors.count }.reverse
    when "top_rating"
      @products = Product.all.sort_by do |p|
        reviews = p.reviews
        rating = reviews.count.positive? ? (reviews.map(&:rating).sum / reviews.count).round(2) : 0
        rating
      end.reverse
    when "newest"
      @products = Product.order(created_at: :desc)
    else
      params[:sort_by] = "oldest"
      @products = Product.order(:created_at)
    end
  end

  def get_related_product_sorted(product)
    case params[:sort_by]
    when "most_related"
      @products = product.find_related_on_tags
    when "most_favorited"
      @products = product.find_related_on_tags.sort_by { |p| p.favoritors.count }.reverse
    when "top_rating"
      @products = product.find_related_on_tags.sort_by do |p|
        reviews = p.reviews
        rating = reviews.count.positive? ? (reviews.map(&:rating).sum / reviews.count).round(2) : 0
        rating
      end.reverse
    when "newest"
      @products = product.find_related_on_tags.sort_by(&:created_at).reverse
    else
      params[:sort_by] = "oldest"
      @products = product.find_related_on_tags.sort_by(&:created_at)
    end
  end
  # def product_params
  #   params.require(:product).permit(:name, :barcode, :company_name,
  #                                   :ingredients, :size, :photo, :reviews, :tags)
  # end

  def reviews_params
    params.require(:review).permit(:rating, :comment)
  end
end
