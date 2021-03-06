require 'open-uri'

class ScrapeJancodeService
  def initialize(barcode)
    @barcode = "%013d" % barcode.to_i
  end

  def call
    url = "https://www.jancode.xyz/#{@barcode}/"
    html_file = URI.open(url).read
    html_doc = Nokogiri::HTML(html_file)
    product_info = {}

    html_doc.search('.keni-section h2').each do |element|
      # Return an empty hash if product name is empty (This barcode doesn't exist in jancode.xyz website).
      return product_info if element.text.strip.length.zero?

      product_info["name"] = element.text.strip
    end

    html_doc.search('.table-block td span').each do |element|
      product_info["barcode"] = element.text.strip
    end

    html_doc.xpath('//*[contains(text(),"会社名")]/parent::tr/td').each do |element|
      product_info["company_name"] = element.text.strip
    end

    html_doc.xpath('//*[contains(text(),"原材料")]/parent::tr/td').each do |element|
      product_info["ingredients"] = element.text.strip
    end

    html_doc.xpath('//*[contains(text(),"内容量")]/parent::tr/td').each do |element|
      product_info["size"] = element.text.strip
    end

    product_info["categories"] = []
    html_doc.xpath('//*[contains(text(),"商品ジャンル")]/parent::tr/td/a').each do |element|
      # Skip if category is "other"
      next if element.text.strip == "その他"

      product_info["categories"] << element.text.strip
    end

    html_doc.search('.table-block tr:first-child img').each do |element|
      image_link = element.attribute('src').value
      product_info["image_link"] = image_link.split("?_ex=300x300")[0] if image_link_valid?(image_link)
    end

    @product_info = product_info
    return product_info
  end

  def create_product
    return Product.new if @product_info.nil? || @product_info.count.zero?

    product = Product.new(name: @product_info["name"], barcode: @product_info["barcode"], company_name: @product_info["company_name"], ingredients: @product_info["ingredients"], size: @product_info["size"])
    @product_info["categories"]&.each do |category|
      product.tag_list.add(category)
    end

    @product = product
    return product
  end

  def upload_image
    return false if @product_info['image_link'].nil?

    if @product_info['image_link']&.length.positive?
      file = URI.open(@product_info['image_link'])
      # return attach result?
      @product.photo.attach(io: file, filename: "#{@product.barcode}.jpg", content_type: 'image/jpg')
    end
    # return attach result?
    false
  end

  private

  def image_link_valid?(image_link)
    empty_image_link = "https://thumbnail.image.rakuten.co.jp/ran/img/default/now_printing.jpg?_ex=300x300"
    return (image_link && image_link.length.positive? && image_link != empty_image_link && image_link.match?(%r{https?://.*}))
  end
end
