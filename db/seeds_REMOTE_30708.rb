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
# User.destroy_all
# Products.destroy_all

puts "🧑 Seed hardcoded users ..."
barcode_sample = [4901330574352, 4954835290708, 4582469493006, 4902508070546, 4902777088785, 4902106010067, 4976548100075]
# https://www.jancode.xyz/4901330574352/
# https://www.jancode.xyz/4954835290708/


barcode_sample = [4901330574352]
barcode_sample.each do |barcode|
  url = "https://www.jancode.xyz/#{barcode}/"
  html_file = URI.open(url).read
  html_doc = Nokogiri::HTML(html_file)
  links = []
  product_info = {}
  test = []

  html_doc.search('.keni-section h2').each do |element|
    product_info["name"] = element.text.strip
  end
  # p product_info["name"]
  html_doc.search('.table-block td span').each do |element|
    product_info["barcode"] = element.text.strip
  end

  html_doc.search('.table-block tr:nth-child(8) td').each do |element|
    product_info["ingredients"] = element.text.strip
    # puts element.attribute('href').value
  end

  html_doc.search('.table-block tr:nth-child(10) td').each do |element|
    product_info["size"] = element.text.strip
    # puts element.attribute('href').value
  end

  html_doc.search('.table-block a').each do |element|
    test << element.text.strip
    # puts element.attribute('href').value
  end

  product_info["company_name"] = test[3]
  product_info["category"] = "#{test[4]} #{test[5]} #{test[6]}"


  html_doc.search('.table-block tr:first-child img').each do |element|
    product_info["link"] = element.attribute('src').value
    # puts element.attribute('href').value
  end
  p product_info
end
puts "done"

# puts "🌲 Seed complete ... #{User.count} Users / #{Products.count} Products"
