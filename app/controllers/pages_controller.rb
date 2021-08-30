class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :ui_kits ]

  def home
    # categories
    # results = ActsAsTaggableOn::Tag.most_used(10)
    # first_category_products = Product.tagged_with(results[0].name)
    @top_rating_products = Product.all.sort_by { |p| p.avg_rating || 0 }.reverse[0..5]
    @most_liked_products = Product.all.sort_by { |p| p.favoritors.count }.reverse[0..5]
    # snacks = categorySort(@top_rating_products, "スナック菓子")
  end

  private
  # def categorySort(lists, category)
  #   answer = []
  #   lists.each do |list|
  #     if list.tag_list.last == category
  #       answer << list
  #     end
  #   end
  #   return answer
  # end

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
