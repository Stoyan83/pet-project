# frozen_string_literal: true

class AddRoleColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :role, :integer, default: 0
  end
end
