class ProductsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[show create]

  def show
    @product = Product.find(params[:id])
  end

  def create
    barcode = params[:barcode]
    jancode_scraper = ScrapeJancodeService.new(barcode)
    jancode_scraper.call
    @product = jancode_scraper.create_product

    if @product.save
      redirect_to product_path(@product), notice: 'Barcode was scanned successfully.'
    else
      redirect_to root_path, alert: "Failed to scan barcode. #{@product.errors.full_messages.join(', ')}."
    end
  end

  # private

  # def product_params
  #   params.require(:product).permit(:name, :barcode, :company_name,
  #                                   :ingredients, :size, :photo, :reviews, :tags)
  # end
end
