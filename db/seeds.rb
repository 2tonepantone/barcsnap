require 'open-uri'
require 'nokogiri'

REVIEW_SOURCE = %w[barcsnap.com amazon.jp rakuten.co.jp s.mognavi.jp km.tsite.jp]

puts "🔫 Destroy Products ..."
Product.destroy_all

puts "👴 Seed users ..."
10.times do |i|
  user = User.new(email: "user#{i}@email.com", password: '123456', password_confirmation: '123456', display_name: "#{Faker::Internet.username(specifier: 5..10)}#{i}")
  if user.save!
    file = URI.open("https://thispersondoesnotexist.com/")
    user.photo.attach(io: file, filename: "#{user.email.split('@')[0]}.jpg", content_type: 'image/jpg' )
  end
end

puts "🛒 Seed products from scraping result (+ create reviews)..."
barcode_sample = ["4901330574352", "4954835290708", "4582469493006", "4902508070546", "4902777088785", "4902106010067", "4976548100075", "4901085192009", "4943765054269", "4582409189266", "4953103895515", "096619088089", "45019517"]
# https://www.jancode.xyz/4901330574352/

barcode_sample.each do |barcode|
  puts "▶ Scraping data from #{barcode}..."
  jancode_scraper = ScrapeJancodeService.new(barcode)
  product_info = jancode_scraper.call
  
  product = jancode_scraper.create_product(product_info)
  if product.valid?
    if product.save!
      puts "▶ ▶ Product saved!"
      p product
      if product_info['image_link'] && product_info['image_link'].length.positive?
        file = URI.open(product_info['image_link'])
        product.photo.attach(io: file, filename: "#{barcode}.jpg", content_type: 'image/jpg' )
      end
      rand(3..6).times do
        user = User.all.sample
        review = Review.new(rating: rand(1..5), user: user, product: product,
        comment: Faker::Restaurant.review, source: REVIEW_SOURCE.sample)
        review.save!
      end
    end
  end
end

puts "🌲 Seed from #{barcode_sample.count} barcodes complete ..."
puts "🌲 #{User.count} Users / #{Product.count} Products / #{Review.count} Reviews"
