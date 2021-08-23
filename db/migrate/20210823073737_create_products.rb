class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :barcode
      t.string :company_name
      t.string :ingredients
      t.string :size

      t.timestamps
    end
  end
end
