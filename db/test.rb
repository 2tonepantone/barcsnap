# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'
require 'nokogiri'
puts "🔫 Destroy everything ..."
Product.destroy_all

puts "🧑 Seed hardcoded users ..."
barcode_sample = [4901330574352, 4954835290708, 4582469493006, 4902508070546, 4902777088785, 4902106010067, 4976548100075]
# https://www.jancode.xyz/4901330574352/
# https://www.jancode.xyz/4954835290708/


# barcode_sample = [4901330574352]
barcode_sample.each_with_index do |barcode, index|
  url = "https://www.jancode.xyz/#{barcode}/"
  html_file = URI.open(url).read
  html_doc = Nokogiri::HTML(html_file)
  links = []
  product_info = {}

  html_doc.search('.keni-section h2').each do |element|
    product_info["name"] = element.text.strip
  end
  # p product_info["name"]
  html_doc.search('.table-block td span').each do |element|
    product_info["barcode"] = element.text.strip
  end

  html_doc.xpath('//*[contains(text(),"会社名")]/parent::tr/td').each do |element|
    product_info["company_name"] = element.text.strip
  end

  html_doc.xpath('//*[contains(text(),"原材料名")]/parent::tr/td').each do |element|
    product_info["ingredients"] = element.text.strip
  end

  html_doc.xpath('//*[contains(text(),"内容量")]/parent::tr/td').each do |element|
    product_info["size"] = element.text.strip
  end

  html_doc.xpath('//*[contains(text(),"商品ジャンル")]/parent::tr/td').each do |element|
    product_info["category"] = element.text.strip
  end

  html_doc.search('.table-block tr:first-child img').each do |element|
    product_info["link"] = element.attribute('src').value
    # puts element.attribute('href').value
  end
  # p product_info
  product = Product.new name: product_info["name"],
                    barcode: product_info["barcode"],
                    company_name: product_info["company_name"],
                    ingredients: product_info["ingredients"],
                    size: product_info["size"]
  product.save!
  puts "#{index + 1}/#{barcode_sample.length} product scraped"
end
puts "🌲 Seed complete ... #{Product.count} Products"

# puts "🌲 Seed complete ... #{User.count} Users / #{Products.count} Products"


  # if 原材料名


