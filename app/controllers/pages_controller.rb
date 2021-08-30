class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    categories
    # @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }
    categorySort(@top_rating_products, "スナック菓子")
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
