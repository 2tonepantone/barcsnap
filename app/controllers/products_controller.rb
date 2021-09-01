class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[show create]

  def show
    @product = Product.find(params[:id]) if params[:id].to_i.positive?
    @reviews = @product.reviews.order(created_at: :desc) if @product
    @review = Review.new

    @array_allergies = array_allergies
    @array_dislikes = array_dislikes


    # If product_id exists, generate @product_compare
    if !params[:product_id].nil?
      @product_compare = Product.find(params[:product_id])
    end

    @product_favorited = false
    if current_user && @product
      @product_favorited = current_user.favorited?(@product)
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
    @barcode = params[:barcode]
    @barcode = convert_to_jancode unless jancode_format?

    if in_database?
      @product = Product.find_by(barcode: @barcode)
      if comparing_scanned?
        compare_scanned
      else
        redirect_to product_path(@product)
      end
    else
      create_scraped_product
    end
  end

  private

  def comparing_scanned?
    params.key?(:compare) && params[:compare] == 'true'
  end

  def compare_scanned
    @compare_product = @product
    @first_product = Product.find(params[:first_product_id])
    redirect_to product_path(@first_product) + "?product_id=#{@compare_product.id}"
  end

  def jancode_format?
    @barcode.length == 13
  end

  def convert_to_jancode
    "0" * (13 - @barcode.length) + @barcode
  end

  def in_database?
    Product.exists?(barcode: @barcode)
  end

  def create_scraped_product
    jancode_scraper = ScrapeJancodeService.new(@barcode)
    jancode_scraper.call
    @product = jancode_scraper.create_product

    if @product.save
      jancode_scraper.upload_image
      if comparing_scanned?
        compare_scanned
      else
        redirect_to product_path(@product)
      end
    else
      redirect_back(fallback_location: root_path,
                    alert: "Product info unavailable. Please try a different barcode!")
    end
  end

  def get_all_product_sorted
    case params[:sort_by]
    when "most_related"
      @products = Product.all
    when "most_favorite"
      @products = Product.all.sort_by { |p| p.favoritors.count }.reverse
    when "top_rating"
      @products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse
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
    when "most_favorite"
      @products = product.find_related_on_tags.sort_by { |p| p.favoritors.count }.reverse
    when "top_rating"
      @products = product.find_related_on_tags.sort_by { |p| p.avg_rating || 0 }.reverse
    when "newest"
      @products = product.find_related_on_tags.sort_by(&:created_at).reverse
    else
      params[:sort_by] = "oldest"
      @products = product.find_related_on_tags.sort_by(&:created_at)
    end
  end

  def reviews_params
    params.require(:review).permit(:rating, :comment)
  end

  def array_allergies
    string = current_user.allergies
    array = string.split(",")
    final = array.map do |ele|
        ele.strip()
    end
    return final
  end
  def array_dislikes
    string = current_user.dislikes
    array = string.split(",")
    final = array.map do |ele|
        ele.strip()
    end
    return final
  end
end
