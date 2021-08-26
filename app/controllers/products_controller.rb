class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[show create]

  def show
    @product = Product.find(params[:id])
  end

  def create
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

  # def product_params
  #   params.require(:product).permit(:name, :barcode, :company_name,
  #                                   :ingredients, :size, :photo, :reviews, :tags)
  # end
end
