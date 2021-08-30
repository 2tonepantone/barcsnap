class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    categories
    results = ActsAsTaggableOn::Tag.most_used(10)
    first_category_products = Product.tagged_with(results[0].name)


    @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    # @most_liked_products = Product.all.sort_by { |p| p.favoritors.count }.reverse[0..5]
    @first_rating_products = Product.tagged_with(results[0].name).sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @second_rating_products = Product.tagged_with(results[1].name).sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @third_rating_products = Product.tagged_with(results[2].name).sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @fourth_rating_products = Product.tagged_with(results[3].name).sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    # raise
    @top_rating_snacks = Product.tagged_with("スナック菓子").sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @top_rating_shampoo = Product.tagged_with("ヘアケア・スタイリング").sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    # @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }
    # snacks = categorySort(@top_rating_products, "スナック菓子")
    # hair_care_styling = categorySort(@top_rating_products, "ヘアケア・スタイリング")
    # shampoo = categorySort(@top_rating_products, "ヘアケア・スタイリング")
    # baby_powder = categorySort(@top_rating_products, "ベビーパウダー")
    # sweets_and_sweets = categorySort(@top_rating_products, "スイーツ・お菓子")
    # water_soft_drink = categorySort(@top_rating_products, "水・ソフトドリンク")
    # computer_peripherals = categorySort(@top_rating_products, "パソコン・周辺機器")
    # soup = categorySort(@top_rating_products, "スープ")
    # oa_cleaner = categorySort(@top_rating_products, "oaクリーナー")
    # sports_drink =categorySort(@top_rating_products,"スポーツドリンク")

    # count = []
    # categories.each do |category|
    #   count << categorySort(@top_rating_products, category).count
    # end

    # raise


  end

  private
  def categorySort(lists, category)
    answer = []
    lists.each do |list|
      if list.tag_list.last == category
        answer << list
      end
    end
    return answer
  end

  def categories
    array = []
    Product.all.each do |product|
      category = product.tag_list.last
      unless array.include?(category)
        array << category
      end
    end
    return array
  end
end
