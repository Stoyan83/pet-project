class AddProductsCountToProjects < ActiveRecord::Migration[7.0]
  def self.up
    add_column :projects, :products_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :projects, :products_count
  end
end
