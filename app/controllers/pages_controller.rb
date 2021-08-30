class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    categories
    # @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }
    snacks = categorySort(@top_rating_products, "スナック菓子")
    hair_care_styling = categorySort(@top_rating_products, "ヘアケア・スタイリング")
    shampoo = categorySort(@top_rating_products, "シャンプー")
    baby_powder = categorySort(@top_rating_products, "ベビーパウダー")
    sweets_and_sweets = categorySort(@top_rating_products, "スイーツ・お菓子")
    water_soft_drink = categorySort(@top_rating_products, "水・ソフトドリンク")
    computer_peripherals = categorySort(@top_rating_products, "パソコン・周辺機器")
    soup = categorySort(@top_rating_products, "スープ")
    oa_cleaner = categorySort(@top_rating_products, "oaクリーナー")
    sports_drink =categorySort(@top_rating_products,"スポーツドリンク")



    @most_liked_products = Product.all.sort_by { |p| p.favoritors.count }.reverse[0..5]
    raise
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
